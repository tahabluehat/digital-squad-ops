<?php
// Usage: php bin/check-requirements.php   — reports missing PHP features on this host.
if (PHP_SAPI !== 'cli') { http_response_code(404); exit; }
$ok = true;
printf("PHP %s %s\n", PHP_VERSION, PHP_VERSION_ID >= 80100 ? 'OK' : 'TOO OLD (need 8.1+)');
$ok = $ok && PHP_VERSION_ID >= 80100;
foreach (['pdo_mysql', 'mbstring', 'fileinfo', 'openssl', 'session', 'dom', 'ctype', 'json'] as $ext) {
    $has = extension_loaded($ext);
    $ok = $ok && $has;
    printf("  %-10s %s\n", $ext, $has ? 'OK' : 'MISSING (required)');
}
foreach (['iconv' => 'better accent handling in URLs', 'intl' => 'best accent handling in URLs'] as $ext => $why) {
    printf("  %-10s %s\n", $ext, extension_loaded($ext) ? 'OK' : "missing (optional: $why)");
}
printf("  webp       %s\n", defined('IMAGETYPE_WEBP') ? 'OK' : 'MISSING');
$root = dirname(__DIR__);
foreach (['storage/uploads', 'storage/sessions', 'storage/cache/htmlpurifier'] as $dir) {
    $w = is_writable("$root/$dir");
    $ok = $ok && $w;
    printf("  %-28s %s\n", $dir, $w ? 'writable' : 'NOT WRITABLE');
}
printf("  config/config.php            %s\n", is_file("$root/config/config.php") ? 'present' : 'MISSING');
$bytes = function (string $v): int { $n = (int) $v; $u = strtolower(substr(trim($v), -1)); return $n * ($u === 'g' ? 1 << 30 : ($u === 'm' ? 1 << 20 : ($u === 'k' ? 1024 : 1))); };
$up = $bytes((string) ini_get('upload_max_filesize')) >= 5 << 20 && $bytes((string) ini_get('post_max_size')) >= 6 << 20;
$ok = $ok && $up;
printf("  upload_max_filesize=%s post_max_size=%s %s\n", ini_get('upload_max_filesize'), ini_get('post_max_size'), $up ? 'OK' : 'TOO LOW (set upload_max_filesize=6M, post_max_size=8M)');
echo $ok ? "\nAll required checks passed.\n" : "\nFix the items above before going live.\n";
exit($ok ? 0 : 1);
