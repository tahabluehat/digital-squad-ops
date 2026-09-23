<?php /** @var array $a */ ?>
<article class="post-card">
  <?php if ($a['cover_image']): ?>
    <img class="post-card-cover" src="<?= e(media_url($a['cover_image'])) ?>" alt="<?= e($a['cover_alt']) ?>" loading="lazy" width="640" height="360">
  <?php endif ?>
  <div class="post-card-body">
    <time class="post-date" datetime="<?= e(iso_date($a['published_at'])) ?>"><?= e(format_date($a['published_at'])) ?></time>
    <h3 class="post-card-title"><a href="<?= e(article_url($a)) ?>"><?= e($a['title']) ?></a></h3>
    <?php if ($a['excerpt']): ?><p class="muted"><?= e($a['excerpt']) ?></p><?php endif ?>
    <span class="text-link" aria-hidden="true">Read article <?= icon('arrow-right') ?></span>
  </div>
</article>
