<?php
declare(strict_types=1);

/** Admin routes. Every route except /admin/login requires an authenticated admin. */

if ($path === '/admin' || $path === '/admin/') {
    redirect('/admin/blog');
}

if ($path === '/admin/login') {
    if (current_admin()) {
        redirect('/admin/blog');
    }
    $error = null;
    $username = '';
    if ($method === 'POST') {
        require_csrf();
        $username = post_str('username');
        $error = attempt_login($username, (string) ($_POST['password'] ?? ''));
        if ($error === null) {
            redirect('/admin/blog');
        }
    }
    csrf_token();
    render('admin/login', ['error' => $error, 'username' => $username, 'meta' => ['title' => 'Sign in | DigitalSquad admin']], 'admin/layout', $error ? 401 : 200);
}

$admin = require_admin();

if ($path === '/admin/logout' && $method === 'POST') {
    require_csrf();
    admin_session_destroy();
    redirect('/admin/login?signed_out=1');
}

if ($path === '/admin/blog') {
    render('admin/list', ['articles' => all_articles_for_admin(), 'flash' => take_flash(), 'meta' => ['title' => 'Articles | DigitalSquad admin']], 'admin/layout');
}

if ($path === '/admin/blog/preview' && $method === 'POST') {
    require_csrf();
    $id = (int) ($_POST['id'] ?? 0);
    $existing = $id ? article_by_id($id) : null;
    [$d] = article_input($id ?: null);
    $a = $d + [
        'cover_image' => $existing['cover_image'] ?? null,
        'published_at' => $existing['published_at'] ?? db_now(),
        'status' => $existing['status'] ?? 'draft',
    ];
    render('article', ['article' => $a, 'preview' => true, 'meta' => article_meta($a, true)]);
}

$isNew = $path === '/admin/blog/new';
if ($isNew || preg_match('#^/admin/blog/(\d+)/edit$#', $path, $m)) {
    $article = $isNew ? null : article_by_id((int) $m[1]);
    if (!$isNew && !$article) {
        not_found();
    }
    $errors = [];
    $values = $article ?? ['title' => '', 'slug' => '', 'excerpt' => '', 'content_html' => '', 'cover_image' => null, 'cover_alt' => '', 'seo_title' => '', 'seo_description' => '', 'status' => 'draft'];

    if ($method === 'POST') {
        require_csrf();
        $action = post_str('action');
        $id = $article ? (int) $article['id'] : null;

        if ($action === 'unpublish' && $article) {
            db()->prepare("UPDATE blog_articles SET status = 'draft', updated_at = ? WHERE id = ?")->execute([db_now(), $id]);
            flash('Article unpublished. It is now a draft and no longer visible on the site.');
            redirect("/admin/blog/$id/edit");
        }

        [$d, $errors] = article_input($id);
        $d['cover_image'] = $article['cover_image'] ?? null;
        $removeCover = isset($_POST['remove_cover']);
        if ($removeCover) {
            $d['cover_image'] = null;
        }
        $newCover = null;
        if (!$errors) {
            [$newCover, $uploadError] = store_cover_upload('cover');
            if ($uploadError) {
                $errors['cover'] = $uploadError;
            } elseif ($newCover) {
                $d['cover_image'] = $newCover;
            }
        }

        $goLive = in_array($action, ['publish', 'update'], true) && ($action === 'publish' || ($article['status'] ?? '') === 'published');
        if (!$errors && $goLive) {
            $errors = publish_errors($d);
        }
        if (!in_array($action, ['save_draft', 'publish', 'update'], true)
            || ($action === 'save_draft' && ($article['status'] ?? '') === 'published')) {
            $errors['form'] = 'This article is live. Use "Update published article" or "Unpublish".';
        }

        if ($errors) {
            if ($newCover) {
                delete_upload($newCover);
            }
            $values = array_merge($values, $d, ['cover_image' => $article['cover_image'] ?? null]);
            $values['status'] = $article['status'] ?? 'draft';
            if (isset($errors['cover']) || !empty($_FILES['cover']['name'])) {
                $errors['cover'] = $errors['cover'] ?? 'Please select the image again.';
            }
            render('admin/edit', ['article' => $article, 'values' => $values, 'errors' => $errors, 'flash' => null, 'meta' => ['title' => 'Edit article | DigitalSquad admin']], 'admin/layout', 422);
        }

        $now = db_now();
        $status = $goLive ? 'published' : 'draft';
        $publishedAt = $goLive ? ($article['published_at'] ?? null) ?: $now : ($article['published_at'] ?? null);
        if ($action === 'publish' && ($article['status'] ?? '') !== 'published') {
            $publishedAt = $now;
        }

        $fields = [$d['title'], $d['slug'], $d['excerpt'], $d['content_html'], $d['cover_image'], $d['cover_alt'],
            $d['seo_title'], $d['seo_description'], $status, $publishedAt, $now];
        if ($article) {
            db()->prepare('UPDATE blog_articles SET title=?, slug=?, excerpt=?, content_html=?, cover_image=?, cover_alt=?,
                seo_title=?, seo_description=?, status=?, published_at=?, updated_at=? WHERE id=?')
                ->execute([...$fields, $id]);
            if ($article['cover_image'] && $article['cover_image'] !== $d['cover_image']) {
                delete_upload($article['cover_image']);
            }
        } else {
            db()->prepare('INSERT INTO blog_articles (title, slug, excerpt, content_html, cover_image, cover_alt,
                seo_title, seo_description, status, published_at, updated_at, created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)')
                ->execute([...$fields, $now]);
            $id = (int) db()->lastInsertId();
        }

        flash(match (true) {
            $action === 'publish' => 'Article published. It is now live on the site.',
            $action === 'update'  => 'Published article updated. Changes are live.',
            default               => 'Draft saved. It is not visible on the site.',
        });
        redirect("/admin/blog/$id/edit?saved=1");
    }

    render('admin/edit', ['article' => $article, 'values' => $values, 'errors' => $errors, 'flash' => take_flash(), 'meta' => ['title' => ($isNew ? 'New article' : 'Edit article') . ' | DigitalSquad admin']], 'admin/layout');
}

if (preg_match('#^/admin/blog/(\d+)/delete$#', $path, $m)) {
    $article = article_by_id((int) $m[1]);
    if (!$article) {
        not_found();
    }
    if ($method === 'POST') {
        require_csrf();
        db()->prepare('DELETE FROM blog_articles WHERE id = ?')->execute([(int) $article['id']]);
        delete_upload($article['cover_image']);
        flash('Article deleted.');
        redirect('/admin/blog');
    }
    render('admin/delete', ['article' => $article, 'meta' => ['title' => 'Delete article | DigitalSquad admin']], 'admin/layout');
}

not_found();
