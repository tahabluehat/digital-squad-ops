<?php
/** @var string $content @var array $meta */
$locale = current_locale(); $dir = $locale === 'ar' ? 'rtl' : 'ltr';
$meta = ($meta ?? []) + ['title' => 'DigitalSquad', 'description' => '', 'type' => 'website'];
$current = request_path(); $home = locale_url();
$nav = [[$home . '#services', t('nav.services')], [$home . '#work', t('nav.work')], [$home . '#approach', t('nav.approach')], [locale_url('blog'), t('nav.blog')]];
$langs = ['en'=>['🇬🇧','English'],'fr'=>['🇫🇷','Français'],'ar'=>['🇲🇦','العربية']];
$relative = preg_replace('#^/(?:en|fr|ar)(?=/|$)#', '', $current) ?: '';
?><!doctype html>
<html lang="<?= e($locale) ?>" dir="<?= $dir ?>">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?= e($meta['title']) ?></title>
  <?php if ($meta['description']): ?><meta name="description" content="<?= e($meta['description']) ?>"><?php endif ?>
  <?php if (!empty($meta['robots'])): ?><meta name="robots" content="<?= e($meta['robots']) ?>"><?php endif ?>
  <?php if (!empty($meta['canonical'])): ?><link rel="canonical" href="<?= e($meta['canonical']) ?>"><meta property="og:url" content="<?= e($meta['canonical']) ?>"><?php endif ?>
  <?php foreach ($langs as $code => $_): ?><link rel="alternate" hreflang="<?= $code ?>" href="<?= e(locale_absolute_url(ltrim($relative, '/'), $code)) ?>"><?php endforeach ?><link rel="alternate" hreflang="x-default" href="<?= e(locale_absolute_url(ltrim($relative, '/'), 'en')) ?>">
  <meta property="og:site_name" content="DigitalSquad"><meta property="og:type" content="<?= e($meta['type']) ?>"><meta property="og:title" content="<?= e($meta['title']) ?>">
  <?php if ($meta['description']): ?><meta property="og:description" content="<?= e($meta['description']) ?>"><?php endif ?>
  <?php if (!empty($meta['image'])): ?><meta property="og:image" content="<?= e($meta['image']) ?>"><meta name="twitter:image" content="<?= e($meta['image']) ?>"><?php endif ?>
  <?php if (!empty($meta['published'])): ?><meta property="article:published_time" content="<?= e($meta['published']) ?>"><?php endif ?>
  <meta property="og:locale" content="<?= $locale === 'fr' ? 'fr_FR' : ($locale === 'ar' ? 'ar_MA' : 'en_US') ?>">
  <?php foreach (array_diff(array_keys($langs), [$locale]) as $alt): ?><meta property="og:locale:alternate" content="<?= $alt === 'fr' ? 'fr_FR' : ($alt === 'ar' ? 'ar_MA' : 'en_US') ?>"><?php endforeach ?>
<?php
  $ldGraph = [
    ['@type' => 'Organization', '@id' => base_url() . '#organization', 'name' => 'DigitalSquad', 'url' => base_url(), 'logo' => base_url('images/squad.png'), 'email' => 'contact@digitalsquad.ma', 'telephone' => '+212625291897', 'address' => ['@type' => 'PostalAddress', 'addressLocality' => 'Casablanca', 'addressCountry' => 'MA'], 'sameAs' => ['https://www.linkedin.com/company/digital-squad-ma/', 'https://www.youtube.com/channel/UCguqMv7qfdhjTm9JZCwspYg']],
    ['@type' => 'WebSite', '@id' => base_url() . '#website', 'url' => base_url(), 'name' => 'DigitalSquad', 'inLanguage' => $locale, 'publisher' => ['@id' => base_url() . '#organization']],
  ];
  if (($meta['type'] ?? '') === 'article') {
    $ldGraph[] = array_filter([
      '@type' => 'BlogPosting', 'headline' => $meta['title'], 'description' => $meta['description'], 'inLanguage' => $locale,
      'mainEntityOfPage' => $meta['canonical'] ?? base_url(), 'datePublished' => $meta['published'] ?? null, 'image' => $meta['image'] ?? null,
      'author' => ['@id' => base_url() . '#organization'], 'publisher' => ['@id' => base_url() . '#organization'],
    ], static fn ($v) => $v !== null && $v !== '');
  }
  ?><script type="application/ld+json"><?= json_encode(['@context' => 'https://schema.org', '@graph' => $ldGraph], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) ?></script>

  <meta name="twitter:card" content="summary_large_image"><link rel="icon" href="/favicon.ico"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@600;700&family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap"><link rel="stylesheet" href="/assets/site.css?v=3"><script src="/assets/site.js?v=3" defer></script>
</head><body>
<a class="skip-link" href="#main"><?= e(t('skip')) ?></a>
<header class="site-header"><div class="container header-inner"><a href="<?= e($home) ?>" class="brand"><img src="/images/squad.png" alt="" width="40" height="40"><span>DigitalSquad</span></a>
<nav class="nav-desktop" aria-label="Main"><?php foreach ($nav as [$href,$label]): ?><a href="<?= e($href) ?>"><?= e($label) ?></a><?php endforeach ?></nav>
<div class="nav-actions"><?= language_picker($langs, $locale, $relative) ?><a href="<?= e($home) ?>#contact" class="btn btn-primary nav-cta"><?= e(t('nav.cta')) ?></a></div><button type="button" class="menu-toggle" aria-expanded="false" aria-controls="mobile-menu" aria-label="<?= e(t('menu.open')) ?>" data-open-label="<?= e(t('menu.open')) ?>" data-close-label="<?= e(t('menu.close')) ?>"><?= icon('menu') ?></button></div>
<nav id="mobile-menu" class="nav-mobile" hidden><div class="container"><?php foreach ($nav as [$href,$label]): ?><a href="<?= e($href) ?>"><?= e($label) ?></a><?php endforeach ?><?= language_picker($langs, $locale, $relative) ?><a href="<?= e($home) ?>#contact" class="btn btn-primary"><?= e(t('nav.cta')) ?></a></div></nav></header>
<main id="main"><?= $content ?></main>
<footer class="site-footer on-navy"><div class="container footer-grid"><div><div class="brand"><img src="/images/squad.png" alt="" width="32" height="32"><span>DigitalSquad</span></div><p class="muted-inverse small"><?= e(t('footer.blurb')) ?></p></div><div><h2 class="footer-title"><?= e(t('footer.explore')) ?></h2><ul class="footer-links"><?php foreach ($nav as [$href,$label]): ?><li><a href="<?= e($href) ?>"><?= e($label) ?></a></li><?php endforeach ?></ul></div><div><h2 class="footer-title"><?= e(t('footer.company')) ?></h2><ul class="footer-links"><li><a href="mailto:recrutement@digitalsquad.ma"><?= e(t('footer.careers')) ?></a></li><li><a href="https://www.linkedin.com/company/digital-squad-ma/">LinkedIn</a></li><li><a href="https://www.youtube.com/channel/UCguqMv7qfdhjTm9JZCwspYg">YouTube</a></li></ul></div><div><h2 class="footer-title"><?= e(t('footer.contact')) ?></h2><ul class="footer-contact"><li><?= icon('map-pin','icon icon-brand') ?><span>Casablanca, Morocco</span></li><li><?= icon('mail','icon icon-brand') ?><a href="mailto:contact@digitalsquad.ma">contact@digitalsquad.ma</a></li><li><?= icon('phone','icon icon-brand') ?><a href="tel:+212625291897">+212 625 29 18 97</a></li></ul></div></div><div class="footer-bottom"><div class="container"><p class="small muted-inverse">&copy; <?= date('Y') ?> DigitalSquad. <?= e(t('footer.rights')) ?></p></div></div></footer></body></html>
<?php function language_picker(array $langs, string $locale, string $relative): string { ob_start(); ?><details class="language-picker"><summary><span aria-hidden="true"><?= $langs[$locale][0] ?></span><?= e($langs[$locale][1]) ?></summary><div class="language-options"><?php foreach ($langs as $code=>[$flag,$label]): ?><a href="<?= e(locale_url(ltrim($relative,'/'),$code)) ?>" lang="<?= $code ?>" dir="<?= $code==='ar'?'rtl':'ltr' ?>"><span aria-hidden="true"><?= $flag ?></span><?= e($label) ?></a><?php endforeach ?></div></details><?php return ob_get_clean(); } ?>
