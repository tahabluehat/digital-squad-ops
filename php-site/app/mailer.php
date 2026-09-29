<?php
declare(strict_types=1);

/**
 * Minimal authenticated SMTP client (implicit TLS on 465 or STARTTLS on 587).
 * Throws RuntimeException on failure. Nothing is stored.
 */
/** Mail settings from private config, then server environment variables; null when SMTP is unavailable. */
function mail_settings(): ?array
{
    $m = config('mail');
    if (!is_array($m) || empty($m['host']) || str_contains((string) ($m['password'] ?? ''), 'PLACEHOLDER')) {
        $host = getenv('SMTP_HOST') ?: '';
        if ($host === '') {
            return null;
        }
        $m = [
            'host' => $host,
            'port' => (int) (getenv('SMTP_PORT') ?: 465),
            'username' => getenv('SMTP_USER') ?: '',
            'password' => getenv('SMTP_PASSWORD') ?: '',
            'from_email' => getenv('SMTP_FROM_EMAIL') ?: 'contact@digitalsquad.ma',
        ];
    }
    $port = (int) ($m['port'] ?? 465);
    return $m + [
        'port' => $port,
        'encryption' => $port === 587 ? 'tls' : 'ssl',
        'from_email' => 'contact@digitalsquad.ma',
        'from_name' => 'DigitalSquad Website',
        'to_email' => 'contact@digitalsquad.ma',
    ];
}

/** Send through SMTP when configured, otherwise (or if SMTP fails) through the hosting's built-in PHP mail(). */
function send_contact_mail(string $replyToEmail, string $replyToName, string $subject, string $text, string $html): void
{
    $m = mail_settings();
    if ($m !== null) {
        try {
            smtp_send($m, $replyToEmail, $replyToName, $subject, $text, $html);
            return;
        } catch (Throwable $ex) {
            error_log('[contact] SMTP failed, trying mail(): ' . $ex->getMessage());
        }
    }
    $from = (string) ($m['from_email'] ?? 'contact@digitalsquad.ma');
    $to = (string) ($m['to_email'] ?? 'contact@digitalsquad.ma');
    $enc = fn (string $s) => '=?UTF-8?B?' . base64_encode($s) . '?=';
    $boundary = 'b' . bin2hex(random_bytes(12));
    $headers = implode("\r\n", [
        'From: ' . $enc('DigitalSquad Website') . ' <' . $from . '>',
        'Reply-To: ' . $enc($replyToName) . ' <' . $replyToEmail . '>',
        'MIME-Version: 1.0',
        'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
    ]);
    $body = "--$boundary\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($text))
        . "--$boundary\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($html))
        . "--$boundary--\r\n";
    if (!mail($to, $enc($subject), $body, $headers, '-f' . $from)) {
        throw new RuntimeException('mail() failed');
    }
}

function smtp_send(array $m, string $replyToEmail, string $replyToName, string $subject, string $text, string $html): void
{
    $host = (string) $m['host'];
    $port = (int) $m['port'];
    $ssl  = ($m['encryption'] ?? 'ssl') === 'ssl';
    $ctx = stream_context_create(['ssl' => ['verify_peer' => true, 'verify_peer_name' => true, 'peer_name' => $host]]);
    $fp = @stream_socket_client(($ssl ? 'ssl://' : 'tcp://') . $host . ':' . $port, $errno, $errstr, 15, STREAM_CLIENT_CONNECT, $ctx);
    if (!$fp) {
        throw new RuntimeException("SMTP connect failed: $errstr");
    }
    stream_set_timeout($fp, 15);

    $read = function () use ($fp): string {
        $data = '';
        while (($line = fgets($fp, 515)) !== false) {
            $data .= $line;
            if (isset($line[3]) && $line[3] === ' ') {
                break;
            }
        }
        return $data;
    };
    $cmd = function (?string $c, array $ok) use ($fp, $read): string {
        if ($c !== null) {
            fwrite($fp, $c . "\r\n");
        }
        $r = $read();
        if (!in_array((int) substr($r, 0, 3), $ok, true)) {
            throw new RuntimeException('SMTP error: ' . trim($r));
        }
        return $r;
    };

    $cmd(null, [220]);
    $ehlo = 'EHLO ' . (parse_url((string) config('app.base_url'), PHP_URL_HOST) ?: 'localhost');
    $cmd($ehlo, [250]);
    if (!$ssl) {
        $cmd('STARTTLS', [220]);
        if (!stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT | STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT)) {
            throw new RuntimeException('STARTTLS failed');
        }
        $cmd($ehlo, [250]);
    }
    $cmd('AUTH LOGIN', [334]);
    $cmd(base64_encode((string) $m['username']), [334]);
    $cmd(base64_encode((string) $m['password']), [235]);
    $cmd('MAIL FROM:<' . $m['from_email'] . '>', [250]);
    $cmd('RCPT TO:<' . $m['to_email'] . '>', [250, 251]);
    $cmd('DATA', [354]);

    $enc = fn (string $s) => '=?UTF-8?B?' . base64_encode($s) . '?=';
    $boundary = 'b' . bin2hex(random_bytes(12));
    $headers = [
        'Date: ' . date(DATE_RFC2822),
        'From: ' . $enc((string) $m['from_name']) . ' <' . $m['from_email'] . '>',
        'To: <' . $m['to_email'] . '>',
        'Reply-To: ' . $enc($replyToName) . ' <' . $replyToEmail . '>',
        'Subject: ' . $enc($subject),
        'Message-ID: <' . bin2hex(random_bytes(12)) . '@' . substr(strrchr((string) $m['from_email'], '@') ?: '@localhost', 1) . '>',
        'MIME-Version: 1.0',
        'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
    ];
    $body = "--$boundary\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($text))
        . "--$boundary\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($html))
        . "--$boundary--\r\n";
    $cmd(implode("\r\n", $headers) . "\r\n\r\n" . $body . "\r\n.", [250]);
    fwrite($fp, "QUIT\r\n");
    fclose($fp);
}

/** Validate and send the contact form. Returns [errors, values]. Empty errors = sent. */
function handle_contact(): array
{
    $v = [
        'name'     => post_str('name'),
        'email'    => post_str('email'),
        'company'  => post_str('company'),
        'interest' => post_str('interest'),
        'message'  => post_str('message'),
    ];
    $e = [];
    if (post_str('website') !== '' || !form_token_valid(post_str('_token'))) {
        $e['form'] = 'Your message could not be sent. Please reload the page and try again.';
        return [$e, $v];
    }
    if ($v['name'] === '' || mb_strlen($v['name']) > 120) {
        $e['name'] = 'Please enter your name.';
    }
    if (!filter_var($v['email'], FILTER_VALIDATE_EMAIL) || preg_match('/[\r\n]/', $v['email'])) {
        $e['email'] = 'Please enter a valid email address.';
    }
    if (mb_strlen($v['company']) > 160) {
        $e['company'] = 'Please shorten the company name.';
    }
    if (!in_array($v['interest'], ['', ...CONTACT_INTERESTS], true)) {
        $v['interest'] = '';
    }
    if (mb_strlen($v['message']) < 10 || mb_strlen($v['message']) > 5000) {
        $e['message'] = 'Please tell us a little about your project or team need.';
    }
    if ($e) {
        return [$e, $v];
    }
    $rows = ['Name' => $v['name'], 'Email' => $v['email'], 'Company' => $v['company'], 'Area of interest' => $v['interest']];
    $text = '';
    $htmlRows = '';
    foreach ($rows as $label => $value) {
        if ($value === '') {
            continue;
        }
        $text .= "$label: $value\n";
        $htmlRows .= '<tr><td style="padding:6px 16px 6px 0;color:#656575">' . e($label) . '</td><td style="padding:6px 0;font-weight:600">' . e($value) . '</td></tr>';
    }
    $text .= "\n" . $v['message'] . "\n";
    $html = '<div style="font-family:Arial,sans-serif;color:#1A1A2D"><h2 style="margin:0 0 16px">New message from the website</h2><table>'
        . $htmlRows . '</table><p style="white-space:pre-wrap;line-height:1.6">' . e($v['message']) . '</p></div>';
    try {
        smtp_send($v['email'], $v['name'], 'Website enquiry from ' . $v['name'], $text, $html);
    } catch (Throwable $ex) {
        error_log('[contact] ' . $ex->getMessage());
        $e['form'] = 'We could not send your message. Please try again or email contact@digitalsquad.ma.';
    }
    return [$e, $v];
}

const CONTACT_INTERESTS = ['Build your product', 'Extend your team', 'Improve your platform', 'Something else'];
