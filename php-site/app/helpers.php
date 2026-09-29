<?php
declare(strict_types=1);

/** Escape text for HTML output. */
function e(?string $value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function base_url(string $path = ''): string
{
    return rtrim((string) config('app.base_url'), '/') . '/' . ltrim($path, '/');
}

function request_path(): string
{
    $path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
    $path = '/' . trim(rawurldecode($path), '/');
    return $path;
}

function current_locale(): string
{
    $value = $GLOBALS['ds_locale'] ?? 'en';
    return in_array($value, ['en', 'fr', 'ar'], true) ? $value : 'en';
}

function set_locale(string $locale): void
{
    $GLOBALS['ds_locale'] = in_array($locale, ['en', 'fr', 'ar'], true) ? $locale : 'en';
    $file = APP_ROOT . '/lang/' . $GLOBALS['ds_locale'] . '.php';
    $GLOBALS['ds_translations'] = is_file($file) ? require $file : [];
}

function t(string $key): string
{
    return (string) (($GLOBALS['ds_translations'][$key] ?? null) ?: $key);
}

function locale_url(string $path = '', ?string $locale = null): string
{
    $locale = $locale ?? current_locale();
    $path = trim($path, '/');
    return '/' . $locale . ($path !== '' ? '/' . $path : '');
}

function locale_absolute_url(string $path = '', ?string $locale = null): string
{
    return rtrim((string) config('app.base_url'), '/') . locale_url($path, $locale);
}

function is_post(): bool
{
    return ($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST';
}

function redirect(string $to, int $status = 303): never
{
    header('Location: ' . $to, true, $status);
    exit;
}

function post_str(string $key): string
{
    $v = $_POST[$key] ?? '';
    return is_string($v) ? trim($v) : '';
}

function client_ip(): string
{
    return (string) ($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0');
}

/**
 * Render a template inside a layout. Templates receive $vars as local variables.
 */
function render(string $template, array $vars = [], string $layout = 'layout', int $status = 200): never
{
    http_response_code($status);
    header('Content-Type: text/html; charset=utf-8');
    extract($vars, EXTR_SKIP);
    ob_start();
    require APP_ROOT . '/templates/' . $template . '.php';
    $content = ob_get_clean();
    require APP_ROOT . '/templates/' . $layout . '.php';
    exit;
}

function not_found(): never
{
    render('404', ['meta' => ['title' => t('notfound') . ' | DigitalSquad', 'robots' => 'noindex']], 'layout', 404);
}

function send_security_headers(bool $private = false): void
{
    header('X-Content-Type-Options: nosniff');
    header('Referrer-Policy: strict-origin-when-cross-origin');
    header('X-Frame-Options: DENY');
    header('Permissions-Policy: camera=(), microphone=(), geolocation=()');
    header("Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; frame-src https://www.youtube-nocookie.com; form-action 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'");
    if (is_production()) {
        header('Strict-Transport-Security: max-age=31536000; includeSubDomains');
    }
    if ($private) {
        header('X-Robots-Tag: noindex, nofollow');
        header('Cache-Control: no-store, private');
    }
}

function is_https(): bool
{
    return (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || (int) ($_SERVER['SERVER_PORT'] ?? 0) === 443
        || strtolower((string) ($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '')) === 'https';
}

function slugify(string $text): string
{
    $text = trim($text);
    if (function_exists('transliterator_transliterate')) {
        $text = (string) transliterator_transliterate('Any-Latin; Latin-ASCII', $text);
    } else {
        $converted = @iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $text);
        $text = $converted === false ? $text : $converted;
    }
    $text = strtolower($text);
    $text = preg_replace('/[^a-z0-9]+/', '-', $text) ?? '';
    $text = trim($text, '-');
    return substr($text, 0, 190);
}

function format_date(?string $utc): string
{
    if (!$utc) {
        return '';
    }
    $d = new DateTimeImmutable($utc, new DateTimeZone('UTC'));
    $date = $d->setTimezone(new DateTimeZone(date_default_timezone_get()));
    if (current_locale() === 'ar') {
        $months = [1=>'يناير',2=>'فبراير',3=>'مارس',4=>'أبريل',5=>'مايو',6=>'يونيو',7=>'يوليو',8=>'غشت',9=>'شتنبر',10=>'أكتوبر',11=>'نونبر',12=>'دجنبر'];
        return $date->format('j') . ' ' . $months[(int) $date->format('n')] . ' ' . $date->format('Y');
    }
    if (current_locale() === 'fr') {
        $months = [1=>'janvier',2=>'février',3=>'mars',4=>'avril',5=>'mai',6=>'juin',7=>'juillet',8=>'août',9=>'septembre',10=>'octobre',11=>'novembre',12=>'décembre'];
        return $date->format('j') . ' ' . $months[(int) $date->format('n')] . ' ' . $date->format('Y');
    }
    return $date->format('j F Y');
}

function iso_date(?string $utc): string
{
    return $utc ? (new DateTimeImmutable($utc, new DateTimeZone('UTC')))->format(DATE_ATOM) : '';
}

/** Stateless, signed token for the public contact form (no public session needed). */
function form_token(): string
{
    $ts = (string) time();
    return $ts . '.' . hash_hmac('sha256', 'contact|' . $ts, (string) config('app.key'));
}

function form_token_valid(string $token): bool
{
    $parts = explode('.', $token, 2);
    if (count($parts) !== 2 || !ctype_digit($parts[0])) {
        return false;
    }
    $age = time() - (int) $parts[0];
    if ($age < 2 || $age > 7200) {
        return false;
    }
    return hash_equals(hash_hmac('sha256', 'contact|' . $parts[0], (string) config('app.key')), $parts[1]);
}

/** Inline SVG icons (Lucide, ISC licence). */
function icon(string $name, string $class = 'icon'): string
{
    $paths = [
        'arrow-right' => '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
        'arrow-left'  => '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
        'check'       => '<path d="M20 6 9 17l-5-5"/>',
        'play'        => '<polygon points="6 3 20 12 6 21 6 3"/>',
        'users'       => '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
        'map-pin'     => '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
        'mail'        => '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
        'phone'       => '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>',
        'menu'        => '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
        'x'           => '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
        'youtube'     => '<path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>',
        'linkedin'    => '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
    ];
    return '<svg class="' . e($class) . '" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' . ($paths[$name] ?? '') . '</svg>';
}
