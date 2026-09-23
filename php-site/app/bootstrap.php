<?php
declare(strict_types=1);

if (PHP_VERSION_ID < 80100) {
    http_response_code(500);
    exit('DigitalSquad requires PHP 8.1 or newer.');
}

define('APP_ROOT', dirname(__DIR__));

$configFile = APP_ROOT . '/config/config.php';
if (!is_file($configFile)) {
    http_response_code(500);
    exit('Missing config/config.php. Copy config/config.example.php and fill it in.');
}
$GLOBALS['ds_config'] = require $configFile;

date_default_timezone_set(config('app.timezone', 'UTC'));
mb_internal_encoding('UTF-8');

ini_set('display_errors', is_production() ? '0' : '1');
ini_set('log_errors', '1');
error_reporting(E_ALL);

require __DIR__ . '/helpers.php';
require __DIR__ . '/db.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/articles.php';
require __DIR__ . '/sanitize.php';
require __DIR__ . '/uploads.php';
require __DIR__ . '/mailer.php';

function config(string $key, mixed $default = null): mixed
{
    $value = $GLOBALS['ds_config'];
    foreach (explode('.', $key) as $part) {
        if (!is_array($value) || !array_key_exists($part, $value)) {
            return $default;
        }
        $value = $value[$part];
    }
    return $value;
}

function is_production(): bool
{
    return config('app.env') === 'production';
}
