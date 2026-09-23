<?php $admin = current_admin(); ?><!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title><?= e($meta['title'] ?? 'Admin') ?></title>
  <link rel="icon" href="/favicon.ico">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@600;700&display=swap">
  <link rel="stylesheet" href="/assets/site.css?v=1">
  <link rel="stylesheet" href="/assets/admin.css?v=1">
  <script src="/assets/admin.js?v=1" defer></script>
</head>
<body class="admin">
<a class="skip-link" href="#main">Skip to content</a>
<header class="admin-header">
  <div class="container header-inner">
    <a href="<?= $admin ? '/admin/blog' : '/' ?>" class="brand"><img src="/images/squad.png" alt="" width="32" height="32"><span>DigitalSquad</span><span class="admin-badge">Admin</span></a>
    <?php if ($admin): ?>
      <div class="admin-actions">
        <a class="text-link" href="/blog" target="_blank" rel="noopener">View blog</a>
        <form method="post" action="/admin/logout"><?= csrf_field() ?><button class="btn btn-secondary btn-sm" type="submit">Sign out</button></form>
      </div>
    <?php endif ?>
  </div>
</header>
<main id="main" class="admin-main"><?= $content ?></main>
</body>
</html>
