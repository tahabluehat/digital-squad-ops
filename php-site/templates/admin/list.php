<div class="container">
  <div class="admin-toolbar">
    <h1 class="heading-sm">Articles</h1>
    <a class="btn btn-primary" href="/admin/blog/new">New article</a>
  </div>
  <?php if ($flash): ?><div class="alert alert-<?= e($flash['type']) ?>" role="status"><?= e($flash['message']) ?></div><?php endif ?>
  <?php if (!$articles): ?>
    <div class="empty-state"><h2 class="subheading">No articles yet</h2><p class="muted">Create your first article. It stays a private draft until you publish it.</p></div>
  <?php else: ?>
    <div class="table-wrap">
      <table class="admin-table">
        <thead><tr><th scope="col">Title</th><th scope="col">Status</th><th scope="col">Date</th><th scope="col"><span class="sr-only">Actions</span></th></tr></thead>
        <tbody>
        <?php foreach ($articles as $a): ?>
          <tr>
            <td data-label="Title"><a href="/admin/blog/<?= (int) $a['id'] ?>/edit"><?= e($a['title']) ?></a><div class="small muted">/blog/<?= e($a['slug']) ?></div></td>
            <td data-label="Status"><span class="status status-<?= e($a['status']) ?>"><?= $a['status'] === 'published' ? 'Published' : 'Draft' ?></span></td>
            <td data-label="Date"><?= $a['status'] === 'published' ? 'Published ' . e(format_date($a['published_at'])) : 'Edited ' . e(format_date($a['updated_at'])) ?></td>
            <td class="row-actions">
              <a href="/admin/blog/<?= (int) $a['id'] ?>/edit">Edit</a>
              <?php if ($a['status'] === 'published'): ?><a href="/blog/<?= e($a['slug']) ?>" target="_blank" rel="noopener">View</a><?php endif ?>
              <a class="danger" href="/admin/blog/<?= (int) $a['id'] ?>/delete">Delete</a>
            </td>
          </tr>
        <?php endforeach ?>
        </tbody>
      </table>
    </div>
  <?php endif ?>
</div>
