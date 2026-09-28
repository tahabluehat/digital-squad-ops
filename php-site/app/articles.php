<?php
declare(strict_types=1);

const ARTICLES_PER_PAGE = 9;

function published_count(): int
{
    if (!db_available()) { return 0; }
    return (int) db()->query("SELECT COUNT(*) FROM blog_articles WHERE status = 'published'")->fetchColumn();
}

function published_articles(int $limit, int $offset = 0): array
{
    if (!db_available()) { return []; }
    $stmt = db()->prepare("SELECT id, title, slug, excerpt, cover_image, cover_alt, published_at
        FROM blog_articles WHERE status = 'published'
        ORDER BY published_at DESC, id DESC LIMIT ? OFFSET ?");
    $stmt->bindValue(1, $limit, PDO::PARAM_INT);
    $stmt->bindValue(2, $offset, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->fetchAll();
}

function published_article_by_slug(string $slug): ?array
{
    if (!db_available()) { return null; }
    $stmt = db()->prepare("SELECT * FROM blog_articles WHERE slug = ? AND status = 'published' LIMIT 1");
    $stmt->execute([$slug]);
    return $stmt->fetch() ?: null;
}

function article_by_id(int $id): ?array
{
    $stmt = db()->prepare('SELECT * FROM blog_articles WHERE id = ?');
    $stmt->execute([$id]);
    return $stmt->fetch() ?: null;
}

function all_articles_for_admin(): array
{
    return db()->query('SELECT id, title, slug, status, published_at, updated_at FROM blog_articles ORDER BY updated_at DESC')->fetchAll();
}

function slug_taken(string $slug, ?int $exceptId): bool
{
    $stmt = db()->prepare('SELECT COUNT(*) FROM blog_articles WHERE slug = ? AND id <> ?');
    $stmt->execute([$slug, $exceptId ?? 0]);
    return (int) $stmt->fetchColumn() > 0;
}

function article_url(array $a): string
{
    return '/blog/' . rawurlencode($a['slug']);
}

/**
 * Read and validate the editor form. Returns [data, errors].
 * Content is sanitized here, on the server.
 */
function article_input(?int $id): array
{
    $d = [
        'title'           => post_str('title'),
        'slug'            => strtolower(post_str('slug')),
        'excerpt'         => post_str('excerpt'),
        'content_html'    => sanitize_article_html((string) ($_POST['content_html'] ?? '')),
        'cover_alt'       => post_str('cover_alt'),
        'seo_title'       => post_str('seo_title'),
        'seo_description' => post_str('seo_description'),
    ];
    if ($d['slug'] === '' && $d['title'] !== '') {
        $d['slug'] = slugify($d['title']);
    }
    $e = [];
    if ($d['title'] === '') {
        $e['title'] = 'Enter a title.';
    } elseif (mb_strlen($d['title']) > 200) {
        $e['title'] = 'Keep the title under 200 characters.';
    }
    if ($d['slug'] === '' || !preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $d['slug']) || strlen($d['slug']) > 190) {
        $e['slug'] = 'Use lowercase letters, numbers and single hyphens only.';
    } elseif (slug_taken($d['slug'], $id)) {
        $e['slug'] = 'Another article already uses this URL.';
    }
    if (mb_strlen($d['excerpt']) > 320) {
        $e['excerpt'] = 'Keep the excerpt under 320 characters.';
    }
    if (mb_strlen($d['cover_alt']) > 200) {
        $e['cover_alt'] = 'Keep the alternative text under 200 characters.';
    }
    if (mb_strlen($d['seo_title']) > 70) {
        $e['seo_title'] = 'Keep the SEO title under 70 characters.';
    }
    if (mb_strlen($d['seo_description']) > 170) {
        $e['seo_description'] = 'Keep the SEO description under 170 characters.';
    }
    return [$d, $e];
}

/** Stricter checks required before an article goes live. */
function publish_errors(array $d): array
{
    $e = [];
    if ($d['excerpt'] === '') {
        $e['excerpt'] = 'Add a short excerpt before publishing.';
    }
    if (trim(strip_tags($d['content_html'])) === '') {
        $e['content_html'] = 'Add article content before publishing.';
    }
    if (!empty($d['cover_image']) && $d['cover_alt'] === '') {
        $e['cover_alt'] = 'Describe the cover image before publishing.';
    }
    return $e;
}
