<?php
declare(strict_types=1);
// Usage: php bin/reset-admin-password.php
// Generates a new 32-character password for the administrator and signs out every existing session.
if (PHP_SAPI !== 'cli') { http_response_code(404); exit; }
require dirname(__DIR__) . '/app/bootstrap.php';

$admin = db()->query('SELECT id, username FROM blog_admins ORDER BY id LIMIT 1')->fetch();
if (!$admin) {
    fwrite(STDERR, "No administrator exists yet. Use: php bin/create-admin.php\n");
    exit(1);
}
$password = rtrim(strtr(base64_encode(random_bytes(24)), '+/', '-_'), '=');
db()->prepare('UPDATE blog_admins SET password_hash = ?, session_version = session_version + 1, updated_at = ? WHERE id = ?')
    ->execute([password_hash($password, PASSWORD_DEFAULT), db_now(), $admin['id']]);

// Also remove stored session files so nothing lingers on disk.
foreach (glob(APP_ROOT . '/storage/sessions/sess_*') ?: [] as $f) {
    @unlink($f);
}

echo "\nPassword reset. All existing admin sessions are now signed out.\n\n";
echo "  Username: {$admin['username']}\n";
echo "  Password: $password\n\n";
