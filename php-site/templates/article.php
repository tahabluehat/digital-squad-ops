<?php /** @var array $article @var bool $preview */ $a = $article; ?>
<?php if ($preview): ?>
  <div class="preview-bar" role="status">
    <div class="container">Private preview. <?= ($a['status'] ?? 'draft') === 'published' ? 'Unsaved changes are not live yet.' : 'This article is not published.' ?> Close this tab to return to the editor.</div>
  </div>
<?php endif ?>
<article class="article">
  <header class="article-header container-narrow">
    <a class="text-link back-link" href="/blog"><?= icon('arrow-left') ?> All articles</a>
    <h1 class="heading article-title"><?= e($a['title']) ?></h1>
    <?php if (!empty($a['published_at'])): ?>
      <time class="post-date" datetime="<?= e(iso_date($a['published_at'])) ?>"><?= e(format_date($a['published_at'])) ?></time>
    <?php endif ?>
    <?php if ($a['excerpt']): ?><p class="lead"><?= e($a['excerpt']) ?></p><?php endif ?>
  </header>
  <?php if (!empty($a['cover_image'])): ?>
    <figure class="article-cover container-wide">
      <img src="<?= e(media_url($a['cover_image'])) ?>" alt="<?= e($a['cover_alt']) ?>" width="1200" height="675">
    </figure>
  <?php endif ?>
  <div class="prose container-narrow">
    <?= $a['content_html'] /* sanitised with HTML Purifier on save and on preview */ ?>
  </div>
  <footer class="container-narrow article-footer">
    <p class="muted">Want to discuss a similar challenge?</p>
    <a class="btn btn-primary" href="/#contact">Discuss your project</a>
  </footer>
</article>
<?php if (!$preview && !empty($a['published_at'])): ?>
<script type="application/ld+json"><?= json_encode([
    '@context' => 'https://schema.org', '@type' => 'Article',
    'headline' => $a['title'], 'description' => $a['excerpt'],
    'datePublished' => iso_date($a['published_at']), 'dateModified' => iso_date($a['updated_at'] ?? $a['published_at']),
    'mainEntityOfPage' => base_url('blog/' . $a['slug']),
    'publisher' => ['@type' => 'Organization', 'name' => 'DigitalSquad'],
] + ($a['cover_image'] ? ['image' => base_url('media/' . $a['cover_image'])] : []), JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP) ?></script>
<?php endif ?>
