<?php
declare(strict_types=1);

const UPLOAD_MAX_BYTES = 5 * 1024 * 1024;
const UPLOAD_TYPES = [
    'image/jpeg' => ['ext' => 'jpg',  'imagetype' => IMAGETYPE_JPEG],
    'image/png'  => ['ext' => 'png',  'imagetype' => IMAGETYPE_PNG],
    'image/webp' => ['ext' => 'webp', 'imagetype' => IMAGETYPE_WEBP],
];

function upload_dir(): string
{
    return APP_ROOT . '/storage/uploads';
}

/**
 * Validate and store an uploaded cover image.
 * Returns [filename|null, error|null]. Filename is random; the original name is ignored.
 */
function store_cover_upload(string $field): array
{
    $f = $_FILES[$field] ?? null;
    if (!$f || !is_array($f) || ($f['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) {
        return [null, null];
    }
    if (is_array($f['error'])) {
        return [null, 'Upload one image only.'];
    }
    if ($f['error'] === UPLOAD_ERR_INI_SIZE || $f['error'] === UPLOAD_ERR_FORM_SIZE) {
        return [null, 'The image must be 5 MB or smaller.'];
    }
    if ($f['error'] !== UPLOAD_ERR_OK || !is_uploaded_file($f['tmp_name'])) {
        return [null, 'The image could not be uploaded. Please try again.'];
    }
    if ($f['size'] <= 0 || $f['size'] > UPLOAD_MAX_BYTES) {
        return [null, 'The image must be 5 MB or smaller.'];
    }
    // Check the real file content, never the browser-supplied type or name.
    $mime = (new finfo(FILEINFO_MIME_TYPE))->file($f['tmp_name']);
    if (!isset(UPLOAD_TYPES[$mime])) {
        return [null, 'Only JPEG, PNG and WebP images are allowed.'];
    }
    $info = @getimagesize($f['tmp_name']);
    if ($info === false || $info[2] !== UPLOAD_TYPES[$mime]['imagetype'] || $info[0] < 1 || $info[1] < 1 || $info[0] > 8000 || $info[1] > 8000) {
        return [null, 'This file is not a valid image.'];
    }
    $name = bin2hex(random_bytes(16)) . '.' . UPLOAD_TYPES[$mime]['ext'];
    $dest = upload_dir() . '/' . $name;
    if (!move_uploaded_file($f['tmp_name'], $dest)) {
        return [null, 'The image could not be saved on the server.'];
    }
    @chmod($dest, 0640);
    return [$name, null];
}

function valid_upload_name(string $name): bool
{
    return (bool) preg_match('/^[a-f0-9]{32}\.(jpg|png|webp)$/', $name);
}

function delete_upload(?string $name): void
{
    if ($name && valid_upload_name($name)) {
        $path = upload_dir() . '/' . $name;
        if (is_file($path)) {
            @unlink($path);
        }
    }
}

function media_url(?string $name): string
{
    return $name ? '/media/' . $name : '';
}

/** Stream an uploaded image. Drafts' images are only served to a signed-in admin. */
function serve_media(string $name): never
{
    if (!valid_upload_name($name)) {
        not_found();
    }
    $path = upload_dir() . '/' . $name;
    if (!is_file($path)) {
        not_found();
    }
    $stmt = db()->prepare("SELECT COUNT(*) FROM blog_articles WHERE cover_image = ? AND status = 'published'");
    $stmt->execute([$name]);
    $public = (int) $stmt->fetchColumn() > 0;
    if (!$public && current_admin() === null) {
        not_found();
    }
    $ext = pathinfo($name, PATHINFO_EXTENSION);
    $types = ['jpg' => 'image/jpeg', 'png' => 'image/png', 'webp' => 'image/webp'];
    header('Content-Type: ' . $types[$ext]);
    header('Content-Length: ' . filesize($path));
    header('X-Content-Type-Options: nosniff');
    header("Content-Security-Policy: default-src 'none'");
    header($public ? 'Cache-Control: public, max-age=2592000' : 'Cache-Control: no-store, private');
    readfile($path);
    exit;
}
