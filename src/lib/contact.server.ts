// Sends the contact-form enquiry through the DigitalSquad cPanel SMTP mailbox.
export type ContactEmailInput = {
  name: string;
  email: string;
  message: string;
  company?: string;
  interest?: string;
};

function escapeHtml(s: string) {
  return s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!),
  );
}

function emailHtml(o: ContactEmailInput) {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 0;color:#6B7280;font-size:13px;width:150px;">${escapeHtml(label)}</td>` +
    `<td style="padding:6px 0;color:#1A1A2D;font-size:14px;font-weight:600;">${escapeHtml(value)}</td></tr>`;

  return `<!doctype html>
<html><body style="margin:0;background:#F5F5F7;font-family:Inter,Arial,sans-serif;color:#1A1A2D;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 0;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">
        <tr><td style="background:#1A1A2D;padding:24px 32px;color:#ffffff;">
          <div style="font-size:20px;font-weight:700;">Digital<span style="color:#F14836;">Squad</span></div>
          <div style="font-size:12px;opacity:.8;">New message from the website</div>
        </td></tr>
        <tr><td style="padding:28px 32px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${row("Name", o.name)}
            ${row("Email", o.email)}
            ${o.company ? row("Company", o.company) : ""}
            ${o.interest ? row("Area of interest", o.interest) : ""}
          </table>
          <hr style="border:none;border-top:1px solid #E5E5EA;margin:20px 0;" />
          <div style="font-size:13px;color:#6B7280;margin-bottom:8px;">Message</div>
          <div style="font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(o.message)}</div>
        </td></tr>
        <tr><td style="background:#1A1A2D;padding:14px 32px;text-align:center;color:#BABAC0;font-size:11px;">
          © ${new Date().getFullYear()} DigitalSquad
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

export async function sendContactEmail(input: ContactEmailInput) {
  const host = process.env["SMTP_HOST"];
  const user = process.env["SMTP_USER"];
  const password = process.env["SMTP_PASSWORD"];

  if (!host || !user || !password) {
    throw new Error("SMTP is not configured.");
  }

  const port = Number(process.env["SMTP_PORT"] ?? 465);
  const fromEmail = process.env["SMTP_FROM_EMAIL"] ?? user;
  const to = process.env["CONTACT_TO_EMAIL"] ?? fromEmail;

  // The mailbox is hosted on serveur100.heberjahiz.com; its TLS certificate is
  // issued for that hostname, so connect with it to keep certificate validation on.
  const tlsHost =
    process.env["SMTP_TLS_HOST"] ??
    (host === "mail.digitalsquad.ma" ? "serveur100.heberjahiz.com" : host);

  const { sendMailSmtp } = await import("./smtp.server");

  const text =
    `New message from the DigitalSquad website\n\n` +
    `Name: ${input.name}\nEmail: ${input.email}\n` +
    (input.company ? `Company: ${input.company}\n` : "") +
    (input.interest ? `Area of interest: ${input.interest}\n` : "") +
    `\n${input.message}\n`;

  await sendMailSmtp(
    { host: tlsHost, port, user, password },
    {
      from: `DigitalSquad Website <${fromEmail}>`,
      to,
      replyTo: `${input.name} <${input.email}>`,
      subject: `New enquiry from ${input.name}${input.interest ? ` — ${input.interest}` : ""}`,
      text,
      html: emailHtml(input),
    },
  );
}
