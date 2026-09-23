<?php
/**
 * DigitalSquad configuration TEMPLATE.
 *
 * Copy this file to config/config.php on the server and fill in real values.
 * config/config.php is excluded from Git and must live OUTSIDE public_html.
 * Never put real credentials in this example file.
 */
return [
    'app' => [
        // 'production' enforces HTTPS, Secure cookies and HSTS.
        'env'      => 'production',
        // Public site URL, no trailing slash. Used for canonical URLs and the sitemap.
        'base_url' => 'https://www.example.com',
        // Long random secret (e.g. output of: php -r "echo bin2hex(random_bytes(32));")
        'key'      => 'CHANGE_ME_TO_A_64_CHARACTER_RANDOM_HEX_STRING',
        'timezone' => 'Africa/Casablanca',
    ],

    'db' => [
        'host'     => 'localhost',
        'port'     => 3306,
        'name'     => 'digitsqu_laravel',
        'user'     => 'DB_USER_PLACEHOLDER',
        'password' => 'DB_PASSWORD_PLACEHOLDER',
        'charset'  => 'utf8mb4',
    ],

    'session' => [
        'idle_timeout'     => 1800,   // seconds of inactivity before logout (30 min)
        'absolute_timeout' => 28800,  // maximum session length (8 h)
    ],

    'login' => [
        'max_attempts_per_ip'       => 5,   // failed attempts...
        'max_attempts_per_username' => 10,
        'window_seconds'            => 900, // ...within 15 minutes
    ],

    'mail' => [
        'host'       => 'mail.example.com',
        'port'       => 465,          // 465 = implicit TLS, 587 = STARTTLS
        'encryption' => 'ssl',        // 'ssl' or 'tls'
        'username'   => 'SMTP_USER_PLACEHOLDER',
        'password'   => 'SMTP_PASSWORD_PLACEHOLDER',
        'from_email' => 'contact@example.com',
        'from_name'  => 'DigitalSquad website',
        'to_email'   => 'contact@example.com',
    ],
];
