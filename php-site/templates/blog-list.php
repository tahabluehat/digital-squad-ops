<?php /** @var array $articles @var int $page @var int $pages @var int $total */ ?>
<section class="page-intro">
  <div class="container">
    <p class="eyebrow">Blog</p>
    <h1 class="display"><?= e(t('blog.title')) ?></h1>
    <p class="lead measure"><?= e(t('blog.body')) ?></p>
  </div>
</section>

<section class="section section-tight">
  <div class="container">
    <?php if (!$articles): ?>
      <div class="empty-state">
        <h2 class="subheading"><?= e(t('blog.none')) ?></h2>
        <p class="muted"><?= e(t('blog.empty')) ?></p>
        <a class="btn btn-secondary" href="<?= e(locale_url()) ?>#contact"><?= e(t('nav.cta')) ?></a>
      </div>
    <?php else: ?>
      <div class="post-grid">
        <?php foreach ($articles as $a) { require APP_ROOT . '/templates/partials/article-card.php'; } ?>
      </div>
      <?php if ($pages > 1): ?>
        <nav class="pagination" aria-label="Pagination">
          <?php if ($page > 1): ?>
            <a class="btn btn-secondary" href="<?= $page === 2 ? locale_url('blog') : locale_url('blog') . '?page=' . ($page - 1) ?>" rel="prev"><?= icon('arrow-left') ?> <?= e(t('blog.newer')) ?></a>
          <?php endif ?>
          <ol>
            <?php for ($i = 1; $i <= $pages; $i++): ?>
              <li><a href="<?= $i === 1 ? locale_url('blog') : locale_url('blog') . '?page=' . $i ?>"<?= $i === $page ? ' aria-current="page"' : '' ?>><?= $i ?></a></li>
            <?php endfor ?>
          </ol>
          <?php if ($page < $pages): ?>
            <a class="btn btn-secondary" href="<?= e(locale_url('blog')) ?>?page=<?= $page + 1 ?>" rel="next"><?= e(t('blog.older')) ?> <?= icon('arrow-right') ?></a>
          <?php endif ?>
        </nav>
      <?php endif ?>
    <?php endif ?>
  </div>
</section>
