// Minimal SMTP (SMTPS, implicit TLS) client that works on the edge runtime.
type SmtpOptions = {
  host: string;
  port: number;
  user: string;
  password: string;
};

type Mail = {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
};

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function encodeBase64(value: string) {
  const bytes = encoder.encode(value);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}

function encodeHeader(value: string) {
  // eslint-disable-next-line no-control-regex
  return /^[\x00-\x7F]*$/.test(value) ? value : `=?UTF-8?B?${encodeBase64(value)}?=`;
}

function toQuotedPrintable(value: string) {
  const bytes = encoder.encode(value.replace(/\r?\n/g, "\r\n"));
  let out = "";
  let lineLength = 0;
  const push = (chunk: string) => {
    if (lineLength + chunk.length > 73) {
      out += "=\r\n";
      lineLength = 0;
    }
    out += chunk;
    lineLength += chunk.length;
  };
  for (let i = 0; i < bytes.length; i += 1) {
    const b = bytes[i]!;
    if (b === 13 && bytes[i + 1] === 10) {
      out += "\r\n";
      lineLength = 0;
      i += 1;
      continue;
    }
    if (b === 61 || b < 32 || b > 126) {
      push(`=${b.toString(16).toUpperCase().padStart(2, "0")}`);
    } else {
      push(String.fromCharCode(b));
    }
  }
  return out;
}

async function openSocket(host: string, port: number) {
  const { connect } = await import("cloudflare:sockets");
  const socket = connect({ hostname: host, port }, { secureTransport: "on", allowHalfOpen: false });
  const writer = socket.writable.getWriter();
  const reader = socket.readable.getReader();
  return { socket, writer, reader };
}

export async function sendMailSmtp(options: SmtpOptions, mail: Mail) {
  const { socket, writer, reader } = await openSocket(options.host, options.port);

  let buffer = "";

  async function read(): Promise<string> {
    for (;;) {
      const match = buffer.match(/^(?:\d{3}-[^\n]*\n)*\d{3} [^\n]*\n/);
      if (match) {
        const response = match[0];
        buffer = buffer.slice(response.length);
        return response;
      }
      const { value, done } = await reader.read();
      if (done) throw new Error("SMTP connection closed unexpectedly");
      buffer += decoder.decode(value, { stream: true });
    }
  }

  async function expect(codes: number[], label: string) {
    const response = await read();
    const code = Number(response.slice(0, 3));
    if (!codes.includes(code)) {
      throw new Error(`SMTP ${label} failed: ${response.trim()}`);
    }
    return response;
  }

  async function command(line: string, codes: number[], label: string) {
    await writer.write(encoder.encode(`${line}\r\n`));
    return expect(codes, label);
  }

  try {
    await expect([220], "greeting");
    await command("EHLO digitalsquad.ma", [250], "EHLO");
    await command("AUTH LOGIN", [334], "AUTH");
    await command(encodeBase64(options.user), [334], "username");
    await command(encodeBase64(options.password), [235], "password");

    const envelopeFrom = mail.from.match(/<([^>]+)>/)?.[1] ?? mail.from;
    await command(`MAIL FROM:<${envelopeFrom}>`, [250], "MAIL FROM");
    await command(`RCPT TO:<${mail.to}>`, [250, 251], "RCPT TO");
    await command("DATA", [354], "DATA");

    const boundary = `ds-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
    const headers = [
      `From: ${mail.from.replace(/^([^<]+)</, (_m, n) => `${encodeHeader(String(n).trim())} <`)}`,
      `To: ${mail.to}`,
      mail.replyTo ? `Reply-To: ${mail.replyTo}` : null,
      `Subject: ${encodeHeader(mail.subject)}`,
      `Date: ${new Date().toUTCString()}`,
      "MIME-Version: 1.0",
      `Content-Type: multipart/alternative; boundary="${boundary}"`,
    ].filter(Boolean);

    const body = [
      `--${boundary}`,
      'Content-Type: text/plain; charset="utf-8"',
      "Content-Transfer-Encoding: quoted-printable",
      "",
      toQuotedPrintable(mail.text),
      `--${boundary}`,
      'Content-Type: text/html; charset="utf-8"',
      "Content-Transfer-Encoding: quoted-printable",
      "",
      toQuotedPrintable(mail.html),
      `--${boundary}--`,
      "",
    ].join("\r\n");

    const message = `${headers.join("\r\n")}\r\n\r\n${body}`;
    const escaped = message.replace(/\r?\n/g, "\r\n").replace(/\r\n\./g, "\r\n..");
    await writer.write(encoder.encode(`${escaped}\r\n.\r\n`));
    await expect([250], "message");

    await writer.write(encoder.encode("QUIT\r\n"));
  } finally {
    try {
      await writer.close();
    } catch {
      /* ignore */
    }
    try {
      await socket.close();
    } catch {
      /* ignore */
    }
  }
}
