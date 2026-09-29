<section class="section">
  <div class="container empty-state">
    <p class="eyebrow">404</p>
    <h1 class="heading"><?= e(t('notfound')) ?></h1>
    <p class="muted"><?= e(t('notfound.body')) ?></p>
    <div class="btn-row"><a class="btn btn-primary" href="<?= e(locale_url()) ?>"><?= e(t('home')) ?></a><a class="btn btn-secondary" href="<?= e(locale_url('blog')) ?>"><?= e(t('nav.blog')) ?></a></div>
  </div>
</section>
