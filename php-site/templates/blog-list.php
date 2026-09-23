<?php /** @var array $articles @var int $page @var int $pages @var int $total */ ?>
<section class="page-intro">
  <div class="container">
    <p class="eyebrow">Blog</p>
    <h1 class="display">Notes from the team</h1>
    <p class="lead measure">Practical articles on software engineering, delivery, and building better products.</p>
  </div>
</section>

<section class="section section-tight">
  <div class="container">
    <?php if (!$articles): ?>
      <div class="empty-state">
        <h2 class="subheading">No articles yet</h2>
        <p class="muted">We haven't published anything here yet. In the meantime, you can tell us about your project.</p>
        <a class="btn btn-secondary" href="/#contact">Discuss your project</a>
      </div>
    <?php else: ?>
      <div class="post-grid">
        <?php foreach ($articles as $a) { require APP_ROOT . '/templates/partials/article-card.php'; } ?>
      </div>
      <?php if ($pages > 1): ?>
        <nav class="pagination" aria-label="Pagination">
          <?php if ($page > 1): ?>
            <a class="btn btn-secondary" href="<?= $page === 2 ? '/blog' : '/blog?page=' . ($page - 1) ?>" rel="prev"><?= icon('arrow-left') ?> Newer</a>
          <?php endif ?>
          <ol>
            <?php for ($i = 1; $i <= $pages; $i++): ?>
              <li><a href="<?= $i === 1 ? '/blog' : '/blog?page=' . $i ?>"<?= $i === $page ? ' aria-current="page"' : '' ?>><?= $i ?></a></li>
            <?php endfor ?>
          </ol>
          <?php if ($page < $pages): ?>
            <a class="btn btn-secondary" href="/blog?page=<?= $page + 1 ?>" rel="next">Older <?= icon('arrow-right') ?></a>
          <?php endif ?>
        </nav>
      <?php endif ?>
    <?php endif ?>
  </div>
</section>
