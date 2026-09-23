<?php
declare(strict_types=1);

const ADMIN_SESSION_NAME_SECURE = '__Host-ds_admin';
const ADMIN_SESSION_NAME_DEV    = 'ds_admin';

function admin_session_name(): string
{
    return is_production() ? ADMIN_SESSION_NAME_SECURE : ADMIN_SESSION_NAME_DEV;
}

/** Start the admin session with strict, hardened settings. */
function admin_session_start(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }
    ini_set('session.use_strict_mode', '1');
    ini_set('session.use_only_cookies', '1');
    ini_set('session.use_trans_sid', '0');
    ini_set('session.cookie_httponly', '1');
    ini_set('session.sid_length', '48');
    ini_set('session.sid_bits_per_character', '6');
    ini_set('session.gc_maxlifetime', (string) config('session.absolute_timeout', 28800));
    session_save_path(APP_ROOT . '/storage/sessions');
    session_name(admin_session_name());
    session_set_cookie_params([
        'lifetime' => 0,
        'path'     => '/',
        'secure'   => is_production(),
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
    session_start();
}

function admin_session_destroy(): void
{
    if (session_status() !== PHP_SESSION_ACTIVE) {
        return;
    }
    $_SESSION = [];
    $p = session_get_cookie_params();
    setcookie(session_name(), '', [
        'expires' => time() - 42000, 'path' => $p['path'], 'secure' => $p['secure'],
        'httponly' => true, 'samesite' => 'Strict',
    ]);
    session_destroy();
}

/** Returns the logged-in admin row, or null. Enforces idle/absolute expiry and password-reset invalidation. */
function current_admin(): ?array
{
    static $admin = false;
    if ($admin !== false) {
        return $admin;
    }
    $admin = null;
    // Only open a session if the browser already presents an admin cookie.
    if (session_status() !== PHP_SESSION_ACTIVE && empty($_COOKIE[admin_session_name()])) {
        return null;
    }
    admin_session_start();
    $s = $_SESSION;
    if (empty($s['admin_id'])) {
        return null;
    }
    $now = time();
    if ($now - (int) ($s['last_activity'] ?? 0) > (int) config('session.idle_timeout', 1800)
        || $now - (int) ($s['created_at'] ?? 0) > (int) config('session.absolute_timeout', 28800)) {
        admin_session_destroy();
        return null;
    }
    $stmt = db()->prepare('SELECT id, username, session_version FROM blog_admins WHERE id = ?');
    $stmt->execute([(int) $s['admin_id']]);
    $row = $stmt->fetch();
    if (!$row || (int) $row['session_version'] !== (int) ($s['session_version'] ?? -1)) {
        admin_session_destroy();
        return null;
    }
    $_SESSION['last_activity'] = $now;
    $admin = $row;
    return $admin;
}

function require_admin(): array
{
    $admin = current_admin();
    if ($admin === null) {
        if (is_post()) {
            http_response_code(401);
            exit('Your session has expired. Please sign in again.');
        }
        redirect('/admin/login');
    }
    return $admin;
}

function csrf_token(): string
{
    admin_session_start();
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf'];
}

function csrf_field(): string
{
    return '<input type="hidden" name="_csrf" value="' . e(csrf_token()) . '">';
}

function require_csrf(): void
{
    admin_session_start();
    $sent = $_POST['_csrf'] ?? '';
    if (!is_string($sent) || empty($_SESSION['csrf']) || !hash_equals($_SESSION['csrf'], $sent)) {
        http_response_code(419);
        exit('This form has expired. Go back, reload the page and try again. Your text is still in the editor if you use the back button.');
    }
}

function flash(string $message, string $type = 'success'): void
{
    admin_session_start();
    $_SESSION['flash'] = ['message' => $message, 'type' => $type];
}

function take_flash(): ?array
{
    if (session_status() !== PHP_SESSION_ACTIVE) {
        return null;
    }
    $f = $_SESSION['flash'] ?? null;
    unset($_SESSION['flash']);
    return $f;
}

/* ---------- Login rate limiting (persistent, in MySQL) ---------- */

function login_is_throttled(string $username): bool
{
    $window = (int) config('login.window_seconds', 900);
    $since  = gmdate('Y-m-d H:i:s', time() - $window);
    $stmt = db()->prepare('SELECT
        SUM(ip_hash = ?) AS by_ip, SUM(username_hash = ?) AS by_user
        FROM blog_login_attempts WHERE attempted_at >= ?');
    $stmt->execute([hash('sha256', client_ip()), hash('sha256', strtolower($username)), $since]);
    $r = $stmt->fetch() ?: [];
    return (int) ($r['by_ip'] ?? 0) >= (int) config('login.max_attempts_per_ip', 5)
        || (int) ($r['by_user'] ?? 0) >= (int) config('login.max_attempts_per_username', 10);
}

function login_record_failure(string $username): void
{
    db()->prepare('INSERT INTO blog_login_attempts (ip_hash, username_hash, attempted_at) VALUES (?, ?, ?)')
        ->execute([hash('sha256', client_ip()), hash('sha256', strtolower($username)), db_now()]);
    // Housekeeping: drop records older than a day.
    db()->prepare('DELETE FROM blog_login_attempts WHERE attempted_at < ?')->execute([gmdate('Y-m-d H:i:s', time() - 86400)]);
}

/** Attempt login. Returns null on success or a generic error message. */
function attempt_login(string $username, string $password): ?string
{
    $generic = 'Sign-in failed. Check your details and try again.';
    if ($username === '' || $password === '' || strlen($username) > 100 || strlen($password) > 200) {
        return $generic;
    }
    if (login_is_throttled($username)) {
        return 'Too many sign-in attempts. Please wait 15 minutes and try again.';
    }
    $stmt = db()->prepare('SELECT id, password_hash, session_version FROM blog_admins WHERE username = ?');
    $stmt->execute([$username]);
    $row = $stmt->fetch();
    // Verify against a dummy hash when the user is unknown, to keep timing similar.
    $hash = $row['password_hash'] ?? '$2y$12$abcdefghijklmnopqrstuuJ3J2J7ZqMhZGmGZq0cE0Hc9m4xvK4WK';
    $ok = password_verify($password, $hash) && $row;
    if (!$ok) {
        login_record_failure($username);
        return $generic;
    }
    if (password_needs_rehash($row['password_hash'], PASSWORD_DEFAULT)) {
        db()->prepare('UPDATE blog_admins SET password_hash = ? WHERE id = ?')
            ->execute([password_hash($password, PASSWORD_DEFAULT), $row['id']]);
    }
    db()->prepare('DELETE FROM blog_login_attempts WHERE ip_hash = ?')->execute([hash('sha256', client_ip())]);
    db()->prepare('UPDATE blog_admins SET last_login_at = ? WHERE id = ?')->execute([db_now(), $row['id']]);

    admin_session_start();
    session_regenerate_id(true);
    $_SESSION = [
        'admin_id'        => (int) $row['id'],
        'session_version' => (int) $row['session_version'],
        'created_at'      => time(),
        'last_activity'   => time(),
        'csrf'            => bin2hex(random_bytes(32)),
    ];
    return null;
}
