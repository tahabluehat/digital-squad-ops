<?php
/** @var ?array $article @var array $values @var array $errors @var ?array $flash */
$isPublished = ($values['status'] ?? 'draft') === 'published';
$id = $article['id'] ?? null;
$err = fn (string $k) => isset($errors[$k]) ? '<p class="field-error" id="' . $k . '-error">' . e($errors[$k]) . '</p>' : '';
$aria = fn (string $k) => isset($errors[$k]) ? ' aria-invalid="true" aria-describedby="' . $k . '-error"' : '';
?>
<div class="container">
  <div class="admin-toolbar">
    <div>
      <a class="text-link small" href="/admin/blog">&larr; All articles</a>
      <h1 class="heading-sm"><?= $id ? 'Edit article' : 'New article' ?></h1>
    </div>
    <span class="status status-<?= $isPublished ? 'published' : 'draft' ?>" id="state-label">
      <?= $isPublished ? 'Published — live on the site' : ($id ? 'Draft — not visible on the site' : 'New draft — not saved yet') ?>
    </span>
  </div>

  <?php if ($flash): ?><div class="alert alert-<?= e($flash['type']) ?>" role="status" data-saved><?= e($flash['message']) ?></div><?php endif ?>
  <?php if ($errors): ?>
    <div class="alert alert-error" role="alert"><?= e($errors['form'] ?? 'Nothing was saved. Fix the highlighted fields — your text is still here.') ?></div>
  <?php endif ?>
  <div class="alert alert-warning" id="restore-bar" hidden>
    You have unsaved changes from an earlier attempt on this device.
    <button type="button" class="btn btn-secondary btn-sm" id="restore-yes">Restore them</button>
    <button type="button" class="btn-link" id="restore-no">Discard</button>
  </div>

  <form method="post" enctype="multipart/form-data" action="<?= $id ? "/admin/blog/$id/edit" : '/admin/blog/new' ?>"
        class="form editor-form" id="editor-form" data-draft-key="ds-article-<?= $id ?: 'new' ?>">
    <?= csrf_field() ?>
    <input type="hidden" name="id" value="<?= (int) $id ?>">
    <input type="hidden" name="MAX_FILE_SIZE" value="5242880">

    <div class="editor-layout">
      <div class="editor-main">
        <div class="field">
          <label for="title">Title</label>
          <input id="title" name="title" required maxlength="200" value="<?= e($values['title']) ?>"<?= $aria('title') ?>>
          <?= $err('title') ?>
        </div>
        <div class="field">
          <label for="slug">URL slug</label>
          <div class="slug-input"><span>/blog/</span><input id="slug" name="slug" maxlength="190" pattern="[a-z0-9]+(-[a-z0-9]+)*" value="<?= e($values['slug']) ?>" data-auto="<?= $values['slug'] === '' ? '1' : '0' ?>"<?= $aria('slug') ?>></div>
          <p class="hint">Generated from the title. You can edit it<?= $isPublished ? '; changing it breaks existing links' : '' ?>.</p>
          <?= $err('slug') ?>
        </div>
        <div class="field">
          <label for="excerpt">Short excerpt</label>
          <textarea id="excerpt" name="excerpt" rows="2" maxlength="320"<?= $aria('excerpt') ?>><?= e($values['excerpt']) ?></textarea>
          <?= $err('excerpt') ?>
        </div>
        <div class="field">
          <label id="content-label" for="content_html">Content</label>
          <div class="editor" data-editor hidden>
            <div class="editor-toolbar" role="toolbar" aria-label="Formatting" aria-controls="content-editable">
              <button type="button" data-cmd="formatBlock" data-arg="H2" title="Heading">H2</button>
              <button type="button" data-cmd="formatBlock" data-arg="H3" title="Subheading">H3</button>
              <button type="button" data-cmd="formatBlock" data-arg="P" title="Paragraph">¶</button>
              <button type="button" data-cmd="bold" title="Bold"><b>B</b></button>
              <button type="button" data-cmd="italic" title="Italic"><i>I</i></button>
              <button type="button" data-cmd="insertUnorderedList" title="Bulleted list">• List</button>
              <button type="button" data-cmd="insertOrderedList" title="Numbered list">1. List</button>
              <button type="button" data-cmd="link" title="Link">Link</button>
              <button type="button" data-cmd="formatBlock" data-arg="BLOCKQUOTE" title="Quote">“ Quote</button>
              <button type="button" data-cmd="formatBlock" data-arg="PRE" title="Code block">&lt;/&gt; Code</button>
            </div>
            <div id="content-editable" class="prose editor-area" contenteditable="true" role="textbox" aria-multiline="true" aria-labelledby="content-label"></div>
          </div>
          <textarea id="content_html" name="content_html" rows="16" class="editor-source"<?= $aria('content_html') ?>><?= e($values['content_html']) ?></textarea>
          <?= $err('content_html') ?>
        </div>
      </div>

      <aside class="editor-side">
        <div class="panel">
          <h2 class="panel-title">Cover image <span class="opt">(optional)</span></h2>
          <?php if (!empty($values['cover_image'])): ?>
            <img class="cover-preview" src="<?= e(media_url($values['cover_image'])) ?>" alt="">
            <label class="check"><input type="checkbox" name="remove_cover" value="1"> Remove cover image</label>
          <?php endif ?>
          <div class="field">
            <label for="cover"><?= empty($values['cover_image']) ? 'Upload image' : 'Replace image' ?></label>
            <input id="cover" name="cover" type="file" accept="image/jpeg,image/png,image/webp"<?= $aria('cover') ?>>
            <p class="hint">JPEG, PNG or WebP, up to 5 MB.</p>
            <?= $err('cover') ?>
          </div>
          <div class="field">
            <label for="cover_alt">Alternative text</label>
            <input id="cover_alt" name="cover_alt" maxlength="200" value="<?= e($values['cover_alt']) ?>"<?= $aria('cover_alt') ?>>
            <p class="hint">Describe the image for people who can't see it.</p>
            <?= $err('cover_alt') ?>
          </div>
        </div>
        <div class="panel">
          <h2 class="panel-title">Search engines <span class="opt">(optional)</span></h2>
          <div class="field">
            <label for="seo_title">SEO title</label>
            <input id="seo_title" name="seo_title" maxlength="70" value="<?= e($values['seo_title']) ?>"<?= $aria('seo_title') ?>>
            <?= $err('seo_title') ?>
          </div>
          <div class="field">
            <label for="seo_description">SEO description</label>
            <textarea id="seo_description" name="seo_description" rows="3" maxlength="170"<?= $aria('seo_description') ?>><?= e($values['seo_description']) ?></textarea>
            <?= $err('seo_description') ?>
          </div>
        </div>
        <div class="panel actions-panel">
          <?php if ($isPublished): ?>
            <button class="btn btn-primary btn-block" name="action" value="update" type="submit">Update published article</button>
            <button class="btn btn-secondary btn-block" type="submit" formaction="/admin/blog/preview" formtarget="_blank" data-preview>Preview changes</button>
            <button class="btn btn-secondary btn-block" name="action" value="unpublish" type="submit" formnovalidate>Unpublish</button>
          <?php else: ?>
            <button class="btn btn-secondary btn-block" name="action" value="save_draft" type="submit">Save draft</button>
            <button class="btn btn-secondary btn-block" type="submit" formaction="/admin/blog/preview" formtarget="_blank" data-preview>Preview</button>
            <button class="btn btn-primary btn-block" name="action" value="publish" type="submit">Publish</button>
          <?php endif ?>
          <?php if ($id): ?><a class="btn-link danger" href="/admin/blog/<?= (int) $id ?>/delete">Delete article</a><?php endif ?>
          <p class="hint" id="dirty-note" aria-live="polite"></p>
        </div>
      </aside>
    </div>
  </form>
</div>
