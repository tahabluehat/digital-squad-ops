<?php
declare(strict_types=1);

$rawPath = request_path();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$isAdmin = str_starts_with($rawPath, '/admin');

if (!$isAdmin && preg_match('#^/(en|fr|ar)(/.*)?$#', $rawPath, $localeMatch)) {
    set_locale($localeMatch[1]);
    $path = $localeMatch[2] ?? '/';
} elseif (!$isAdmin && in_array($rawPath, ['/', '/blog', '/contact', '/services', '/about'], true)) {
    redirect('/en' . ($rawPath === '/' ? '' : $rawPath), 302);
} else {
    set_locale('en');
    $path = $rawPath;
}

// Enforce HTTPS in production.
if (is_production() && db_available() && !is_https() && PHP_SAPI !== 'cli') {
    redirect('https://' . ($_SERVER['HTTP_HOST'] ?? parse_url(base_url(), PHP_URL_HOST)) . ($_SERVER['REQUEST_URI'] ?? '/'), 301);
}

send_security_headers($isAdmin);

try {
    /* ---------------- Public ---------------- */
    if ($path === '/') {
        if ($method === 'POST') {
            [$errors, $values] = handle_contact();
            if (!$errors) {
                redirect(locale_url() . '?sent=1#contact');
            }
            render_home($errors, $values, 422);
        }
        render_home();
    }

    if ($path === '/blog') {
        $page = filter_var($_GET['page'] ?? 1, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);
        if ($page === false) {
            not_found();
        }
        $total = published_count();
        $pages = max(1, (int) ceil($total / ARTICLES_PER_PAGE));
        if ($page > $pages) {
            not_found();
        }
        $canonical = locale_absolute_url($page > 1 ? 'blog?page=' . $page : 'blog');
        render('blog-list', [
            'articles' => published_articles(ARTICLES_PER_PAGE, ($page - 1) * ARTICLES_PER_PAGE),
            'page' => $page, 'pages' => $pages, 'total' => $total,
            'meta' => [
                'title' => t('blog.title') . ' | DigitalSquad' . ($page > 1 ? " ($page)" : ''),
                'description' => t('blog.body'),
                'canonical' => $canonical,
            ],
        ]);
    }

    if (preg_match('#^/blog/([a-z0-9]+(?:-[a-z0-9]+)*)$#', $path, $m)) {
        $article = published_article_by_slug($m[1]);
        if (!$article) {
            not_found();
        }
        render('article', ['article' => $article, 'preview' => false, 'meta' => article_meta($article)]);
    }

    if (preg_match('#^/media/([a-f0-9]{32}\.(?:jpg|png|webp))$#', $path, $m)) {
        serve_media($m[1]);
    }

    if ($path === '/sitemap.xml') {
        header('Content-Type: application/xml; charset=utf-8');
        $rows = !db_available() ? [] : db()->query("SELECT slug, updated_at FROM blog_articles WHERE status = 'published' ORDER BY published_at DESC")->fetchAll();
        echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n" . '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
        foreach (['en', 'fr', 'ar'] as $siteLocale) {
            echo '<url><loc>' . e(locale_absolute_url('', $siteLocale)) . '</loc></url>' . "\n";
            echo '<url><loc>' . e(locale_absolute_url('blog', $siteLocale)) . '</loc></url>' . "\n";
        }
        foreach ($rows as $r) {
            foreach (['en', 'fr', 'ar'] as $siteLocale) {
                echo '<url><loc>' . e(locale_absolute_url('blog/' . $r['slug'], $siteLocale)) . '</loc><lastmod>' . e(iso_date($r['updated_at'])) . '</lastmod></url>' . "\n";
            }
        }
        echo '</urlset>';
        exit;
    }

    if ($path === '/robots.txt') {
        header('Content-Type: text/plain; charset=utf-8');
        echo "User-agent: *\nDisallow: /admin\nAllow: /\n\nSitemap: " . base_url('sitemap.xml') . "\n";
        exit;
    }

    // Old pages from the previous site.
    $legacy = ['/contact' => locale_url() . '#contact', '/services' => locale_url() . '#services', '/about' => locale_url() . '#approach'];
    if (isset($legacy[$path])) {
        redirect($legacy[$path], 301);
    }

    /* ---------------- Admin ---------------- */
    if ($isAdmin && db_available()) {
        require APP_ROOT . '/app/admin.php';
    }

    not_found();
} catch (PDOException $ex) {
    error_log('[db] ' . $ex->getMessage());
    render('error', ['meta' => ['title' => 'Temporarily unavailable | DigitalSquad', 'robots' => 'noindex']], 'layout', 503);
}

function render_home(array $errors = [], array $values = [], int $status = 200): never
{
    render('home', [
        'latest' => published_articles(3),
        'errors' => $errors,
        'values' => $values + ['interest' => in_array($_GET['interest'] ?? '', CONTACT_INTERESTS, true) ? $_GET['interest'] : ''],
        'sent'   => isset($_GET['sent']) && !$errors,
        'meta'   => [
            'title' => t('meta.title'),
            'description' => t('meta.description'),
            'canonical' => locale_absolute_url(),
        ],
    ], 'layout', $status);
}

function article_meta(array $a, bool $preview = false): array
{
    $meta = [
        'title' => ($a['seo_title'] ?: $a['title']) . ' | DigitalSquad',
        'description' => $a['seo_description'] ?: $a['excerpt'],
        'canonical' => locale_absolute_url('blog/' . $a['slug']),
        'type' => 'article',
        'image' => $a['cover_image'] ? base_url('media/' . $a['cover_image']) : null,
        'published' => iso_date($a['published_at'] ?? null),
    ];
    if ($preview) {
        $meta['robots'] = 'noindex, nofollow';
        unset($meta['canonical']);
    }
    return $meta;
}
