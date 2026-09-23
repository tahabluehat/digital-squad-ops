<div class="container login-wrap">
  <div class="form-panel">
    <h1 class="subheading">Delete this article?</h1>
    <p><strong><?= e($article['title']) ?></strong></p>
    <p class="muted">This permanently removes the article<?= $article['status'] === 'published' ? ' from the website' : '' ?> and its cover image. This cannot be undone.</p>
    <form method="post" action="/admin/blog/<?= (int) $article['id'] ?>/delete" class="btn-row" data-once>
      <?= csrf_field() ?>
      <button class="btn btn-danger" type="submit">Delete permanently</button>
      <a class="btn btn-secondary" href="/admin/blog/<?= (int) $article['id'] ?>/edit">Cancel</a>
    </form>
  </div>
</div>
