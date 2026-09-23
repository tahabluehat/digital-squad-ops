<?php
declare(strict_types=1);
// Usage: php bin/create-admin.php
// Creates THE single administrator with a random username and a 32-character random password.
// Credentials are printed once to this terminal only. They are never logged or stored in plain text.
if (PHP_SAPI !== 'cli') { http_response_code(404); exit; }
require dirname(__DIR__) . '/app/bootstrap.php';

if ((int) db()->query('SELECT COUNT(*) FROM blog_admins')->fetchColumn() > 0) {
    fwrite(STDERR, "An administrator already exists. Use: php bin/reset-admin-password.php\n");
    exit(1);
}

$username = 'ds-' . bin2hex(random_bytes(5));
$password = random_password();
$now = db_now();
db()->prepare('INSERT INTO blog_admins (username, password_hash, session_version, created_at, updated_at) VALUES (?, ?, 1, ?, ?)')
    ->execute([$username, password_hash($password, PASSWORD_DEFAULT), $now, $now]);

echo "\nAdministrator created. Store these in a password manager now; they will not be shown again.\n\n";
echo "  Sign-in page: " . base_url('admin/login') . "\n";
echo "  Username:     $username\n";
echo "  Password:     $password\n\n";

/** 32 characters from random_bytes(24), base64url-encoded (A-Z a-z 0-9 - _). */
function random_password(): string
{
    return rtrim(strtr(base64_encode(random_bytes(24)), '+/', '-_'), '=');
}
