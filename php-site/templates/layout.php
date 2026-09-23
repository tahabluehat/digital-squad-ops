<?php
/** @var string $content @var array $meta */
$meta = ($meta ?? []) + ['title' => 'DigitalSquad', 'description' => '', 'type' => 'website'];
$current = request_path();
$nav = [['/#services', 'Services'], ['/#work', 'Work'], ['/#approach', 'Approach'], ['/blog', 'Blog']];
?><!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?= e($meta['title']) ?></title>
  <?php if ($meta['description']): ?><meta name="description" content="<?= e($meta['description']) ?>"><?php endif ?>
  <?php if (!empty($meta['robots'])): ?><meta name="robots" content="<?= e($meta['robots']) ?>"><?php endif ?>
  <?php if (!empty($meta['canonical'])): ?>
  <link rel="canonical" href="<?= e($meta['canonical']) ?>">
  <meta property="og:url" content="<?= e($meta['canonical']) ?>">
  <?php endif ?>
  <meta property="og:site_name" content="DigitalSquad">
  <meta property="og:type" content="<?= e($meta['type']) ?>">
  <meta property="og:title" content="<?= e($meta['title']) ?>">
  <?php if ($meta['description']): ?><meta property="og:description" content="<?= e($meta['description']) ?>"><?php endif ?>
  <?php if (!empty($meta['image'])): ?>
  <meta property="og:image" content="<?= e($meta['image']) ?>">
  <meta name="twitter:image" content="<?= e($meta['image']) ?>">
  <?php endif ?>
  <?php if (!empty($meta['published'])): ?><meta property="article:published_time" content="<?= e($meta['published']) ?>"><?php endif ?>
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="/favicon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@600;700&display=swap">
  <link rel="stylesheet" href="/assets/site.css?v=1">
  <script src="/assets/site.js?v=1" defer></script>
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
  <div class="container header-inner">
    <a href="/" class="brand" aria-label="DigitalSquad home">
      <img src="/images/squad.png" alt="" width="40" height="40">
      <span>DigitalSquad</span>
    </a>
    <nav aria-label="Main" class="nav-desktop">
      <?php foreach ($nav as [$href, $label]): ?>
        <a href="<?= e($href) ?>"<?= $href === '/blog' && str_starts_with($current, '/blog') ? ' aria-current="page"' : '' ?>><?= e($label) ?></a>
      <?php endforeach ?>
    </nav>
    <a href="/#contact" class="btn btn-primary nav-cta">Discuss your project</a>
    <button type="button" class="menu-toggle" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu">
      <?= icon('menu') ?>
    </button>
  </div>
  <nav id="mobile-menu" class="nav-mobile" aria-label="Mobile" hidden>
    <div class="container">
      <?php foreach ($nav as [$href, $label]): ?>
        <a href="<?= e($href) ?>"><?= e($label) ?></a>
      <?php endforeach ?>
      <a href="/#contact" class="btn btn-primary">Discuss your project</a>
    </div>
  </nav>
</header>

<main id="main"><?= $content ?></main>

<footer class="site-footer on-navy">
  <div class="container footer-grid">
    <div>
      <div class="brand"><img src="/images/squad.png" alt="" width="32" height="32"><span>DigitalSquad</span></div>
      <p class="muted-inverse small">Software engineering and consulting for teams building, improving, and scaling products.</p>
    </div>
    <div>
      <h2 class="footer-title">Explore</h2>
      <ul class="footer-links">
        <li><a href="/#services">Services</a></li>
        <li><a href="/#work">Work</a></li>
        <li><a href="/#approach">Approach</a></li>
        <li><a href="/blog">Blog</a></li>
      </ul>
    </div>
    <div>
      <h2 class="footer-title">Company</h2>
      <ul class="footer-links">
        <li><a href="mailto:recrutement@digitalsquad.ma">Careers &amp; internships</a></li>
        <li><a href="https://www.linkedin.com/company/digital-squad-ma/" rel="noreferrer">LinkedIn</a></li>
        <li><a href="https://www.youtube.com/channel/UCguqMv7qfdhjTm9JZCwspYg" rel="noreferrer">YouTube</a></li>
      </ul>
    </div>
    <div>
      <h2 class="footer-title">Contact</h2>
      <ul class="footer-contact">
        <li><?= icon('map-pin', 'icon icon-brand') ?><span>Casablanca, Morocco</span></li>
        <li><?= icon('mail', 'icon icon-brand') ?><a href="mailto:contact@digitalsquad.ma">contact@digitalsquad.ma</a></li>
        <li><?= icon('phone', 'icon icon-brand') ?><a href="tel:+212625291897">+212 625 29 18 97</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom"><div class="container"><p class="small muted-inverse">&copy; <?= date('Y') ?> DigitalSquad. All rights reserved.</p></div></div>
</footer>
</body>
</html>
