<div class="container login-wrap">
  <div class="form-panel">
    <h1 class="subheading">Sign in</h1>
    <p class="muted small">Private area for managing the DigitalSquad blog.</p>
    <?php if (isset($_GET['signed_out'])): ?><div class="alert alert-success" role="status">You have been signed out.</div><?php endif ?>
    <?php if ($error): ?><div class="alert alert-error" role="alert"><?= e($error) ?></div><?php endif ?>
    <form method="post" action="/admin/login" class="form" data-once>
      <?= csrf_field() ?>
      <div class="field">
        <label for="username">Username</label>
        <input id="username" name="username" autocomplete="username" required maxlength="100" value="<?= e($username) ?>" autofocus>
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input id="password" name="password" type="password" autocomplete="current-password" required maxlength="200">
      </div>
      <button class="btn btn-primary btn-block" type="submit" data-loading-text="Signing in…">Sign in</button>
    </form>
  </div>
</div>
