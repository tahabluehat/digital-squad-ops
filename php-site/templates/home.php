<?php
/** @var array $latest @var array $errors @var array $values @var bool $sent */
$values += ['name' => '', 'email' => '', 'company' => '', 'interest' => '', 'message' => ''];
$services = [
    ['Build your product', 'Turn a product idea or roadmap into working software.', ['Product and UX design', 'Frontend and backend engineering', 'Testing and QA'], 'Discuss a product'],
    ['Extend your team', 'Bring experienced specialists into your existing engineering team.', ['Software engineers and tech leads', 'Product designers and business analysts', 'Agile coaching and delivery support'], 'Discuss team support'],
    ['Improve your platform', 'Identify technical friction and plan the next improvements.', ['Code and architecture audits', 'Modernisation and refactoring', 'DevOps, CI/CD, and cloud'], 'Discuss your platform'],
];
$references = [['CDG Capital', 'brand-1.png'], ['Intelcia', 'brand-2.png'], ['Docaposte', 'brand-3.png'], ['Omnia Academy', 'brand-4.png']];
$stories = [
    ['OCP Group', 'Sales Process Transformation', 'Digital transformation of the sales process for OCP Group, a global leader in the phosphate industry.', 'Imane, Bakr, Taha, Wijdane, Haitam'],
    ['CDG Capital', 'Client Portal Development', 'Development of a client portal for investment bank CDG Capital in record time.', 'Bakr, Taha'],
    ['French Commercial Courts', 'Digital Transformation', 'Contribution to the digital transformation of the commercial court system in France.', 'Haitam, Taha'],
];
$steps = [
    ['Align on the need', 'We start with a short discovery conversation to understand the goal, the constraints, and what a good outcome looks like. Scope and responsibilities are agreed in writing before work begins.'],
    ['Build together', 'Our engineers work in your rhythm — short iterations, a shared backlog, and regular demos. You see progress continuously rather than at the end.'],
    ['Review and hand over', 'Code, documentation, and environments stay with you. We review what shipped, capture the remaining risks, and agree the next step together.'],
];
$faqs = [
    ['Can you join an existing engineering team?', 'Yes. We regularly embed engineers and delivery specialists into in-house teams, working with your tools, processes, and code review standards.'],
    ['Can you work on an existing codebase?', 'Yes. We usually start with a short review of the code, architecture, and delivery setup, then propose improvements in priority order.'],
    ['How do we start a discussion?', 'Send a short note about your goal or challenge through the form below, or email us directly. We\'ll reply with questions and suggest a call.'],
];
$err = fn (string $k) => isset($errors[$k]) ? '<p class="field-error" id="' . $k . '-error">' . e($errors[$k]) . '</p>' : '';
$aria = fn (string $k) => isset($errors[$k]) ? ' aria-invalid="true" aria-describedby="' . $k . '-error"' : '';
?>
<section class="section hero">
  <div class="container hero-grid">
    <div>
      <p class="eyebrow">Software engineering &amp; consulting</p>
      <h1 class="display">Move faster. Create lasting value.</h1>
      <p class="lead measure">Agile delivery and engineering excellence, focused on the outcomes that matter to your business.</p>
      <div class="btn-row">
        <a href="#contact" class="btn btn-primary">Discuss your project</a>
        <a href="#services" class="btn btn-secondary">Explore our expertise</a>
      </div>
    </div>
    <div class="hero-visual" data-video="iRzLFHrvc7U">
      <a class="video-thumb" href="https://www.youtube.com/watch?v=iRzLFHrvc7U" aria-label="Play the DigitalSquad presentation video">
        <img src="/images/digitalsquad-presentation.jpg" alt="DigitalSquad presentation featuring a team member speaking" width="1280" height="720" fetchpriority="high">
      </a>
      <a class="text-link video-link" href="https://www.youtube.com/watch?v=iRzLFHrvc7U"><?= icon('play') ?> Watch our presentation <?= icon('arrow-right') ?></a>
    </div>
  </div>
</section>

<section class="refs">
  <div class="container">
    <div class="refs-label" aria-hidden="true"><span></span><p class="eyebrow">Teams we have delivered software for</p><span></span></div>
    <p class="sr-only">Teams we have delivered software for</p>
    <ul class="logo-grid">
      <?php foreach ($references as [$name, $src]): ?>
        <li class="logo-tile"><img src="/images/<?= e($src) ?>" alt="<?= e($name) ?>" width="140" height="48" loading="lazy"></li>
      <?php endforeach ?>
    </ul>
  </div>
</section>

<section id="services" class="section">
  <div class="container">
    <div class="section-heading">
      <p class="eyebrow">Ways to work together</p>
      <h2 class="heading">The right support for your next step.</h2>
      <p class="lead">Three clear ways to engage, depending on whether you need a product built, more capacity, or a clearer technical path.</p>
    </div>
    <div class="card-grid">
      <?php foreach ($services as [$title, $outcome, $caps, $cta]): ?>
        <div class="card">
          <h3 class="subheading"><?= e($title) ?></h3>
          <p class="muted"><?= e($outcome) ?></p>
          <ul class="check-list">
            <?php foreach ($caps as $c): ?><li><?= icon('check', 'icon icon-brand') ?><span><?= e($c) ?></span></li><?php endforeach ?>
          </ul>
          <a class="text-link" href="/?interest=<?= e(rawurlencode($title)) ?>#contact" data-interest="<?= e($title) ?>"><?= e($cta) ?> <?= icon('arrow-right') ?></a>
        </div>
      <?php endforeach ?>
    </div>
  </div>
</section>

<section id="work" class="section on-navy navy">
  <div class="container">
    <div class="section-heading">
      <p class="eyebrow eyebrow-inverse">Selected engagements</p>
      <h2 class="heading">Our Impact and success stories</h2>
      <p class="lead">Digital products and transformation programmes delivered by DigitalSquad team members across industry, finance, and public services.</p>
    </div>
    <div class="stories">
      <?php foreach ($stories as $i => [$org, $project, $desc, $team]): ?>
        <article class="story">
          <div class="story-title">
            <p class="story-org">0<?= $i + 1 ?> / <?= e($org) ?></p>
            <h3><?= e($project) ?></h3>
          </div>
          <p class="story-desc"><?= e($desc) ?></p>
          <div class="story-team">
            <p class="story-team-label"><?= icon('users', 'icon icon-brand') ?> Team members involved</p>
            <p><?= e($team) ?></p>
          </div>
        </article>
      <?php endforeach ?>
    </div>
  </div>
</section>

<section id="approach" class="section">
  <div class="container">
    <div class="section-heading">
      <p class="eyebrow">How we work</p>
      <h2 class="heading">Clear priorities. Visible progress.</h2>
      <p class="lead">A simple way of working that keeps scope, collaboration, and delivery visible from the first conversation.</p>
    </div>
    <ol class="steps">
      <?php foreach ($steps as $i => [$t, $b]): ?>
        <li><span class="step-num">0<?= $i + 1 ?></span><h3 class="subheading"><?= e($t) ?></h3><p class="muted"><?= e($b) ?></p></li>
      <?php endforeach ?>
    </ol>
    <div class="faqs">
      <?php foreach ($faqs as [$q, $a]): ?>
        <div><h3 class="faq-q"><?= e($q) ?></h3><p class="muted"><?= e($a) ?></p></div>
      <?php endforeach ?>
    </div>
  </div>
</section>

<section id="latest" class="section section-subtle">
  <div class="container">
    <div class="section-heading-row">
      <div class="section-heading">
        <p class="eyebrow">From the blog</p>
        <h2 class="heading">Latest articles</h2>
      </div>
      <a class="text-link" href="/blog">View all articles <?= icon('arrow-right') ?></a>
    </div>
    <?php if ($latest): ?>
      <div class="post-grid">
        <?php foreach ($latest as $a) { require APP_ROOT . '/templates/partials/article-card.php'; } ?>
      </div>
    <?php else: ?>
      <div class="empty-state empty-inline">
        <p class="muted">Our first articles are on the way. Check back soon.</p>
      </div>
    <?php endif ?>
  </div>
</section>

<section id="contact" class="section on-navy navy">
  <div class="container contact-grid">
    <div>
      <p class="eyebrow eyebrow-inverse">Contact</p>
      <h2 class="heading">Tell us about your project.</h2>
      <p class="lead">Share a few details about your goal or team need. We'll reply with questions and suggest a call.</p>
      <ul class="contact-list">
        <li><?= icon('map-pin', 'icon icon-brand') ?><span>Casablanca, Morocco</span></li>
        <li><?= icon('mail', 'icon icon-brand') ?><a href="mailto:contact@digitalsquad.ma">contact@digitalsquad.ma</a></li>
        <li><?= icon('phone', 'icon icon-brand') ?><a href="tel:+212625291897">+212 625 29 18 97</a></li>
      </ul>
    </div>
    <div class="form-panel">
      <?php if ($sent): ?>
        <div class="alert alert-success" role="status" tabindex="-1" data-focus>Message sent. We'll be in touch shortly.</div>
      <?php endif ?>
      <?php if (isset($errors['form'])): ?>
        <div class="alert alert-error" role="alert"><?= e($errors['form']) ?></div>
      <?php elseif ($errors): ?>
        <div class="alert alert-error" role="alert">Please check the highlighted fields.</div>
      <?php endif ?>
      <form method="post" action="/#contact" class="form" data-once novalidate>
        <input type="hidden" name="_token" value="<?= e(form_token()) ?>">
        <div class="hp" aria-hidden="true"><label>Website <input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
        <div class="field-row">
          <div class="field">
            <label for="name">Name <span class="req">(required)</span></label>
            <input id="name" name="name" autocomplete="name" required maxlength="120" value="<?= e($values['name']) ?>"<?= $aria('name') ?>>
            <?= $err('name') ?>
          </div>
          <div class="field">
            <label for="email">Email <span class="req">(required)</span></label>
            <input id="email" name="email" type="email" autocomplete="email" required maxlength="190" value="<?= e($values['email']) ?>"<?= $aria('email') ?>>
            <?= $err('email') ?>
          </div>
        </div>
        <div class="field-row">
          <div class="field">
            <label for="company">Company <span class="opt">(optional)</span></label>
            <input id="company" name="company" autocomplete="organization" maxlength="160" value="<?= e($values['company']) ?>"<?= $aria('company') ?>>
            <?= $err('company') ?>
          </div>
          <div class="field">
            <label for="interest">Area of interest <span class="opt">(optional)</span></label>
            <select id="interest" name="interest">
              <option value="">Select an option</option>
              <?php foreach (CONTACT_INTERESTS as $opt): ?>
                <option<?= $values['interest'] === $opt ? ' selected' : '' ?>><?= e($opt) ?></option>
              <?php endforeach ?>
            </select>
          </div>
        </div>
        <div class="field">
          <label for="message">Project or team need <span class="req">(required)</span></label>
          <textarea id="message" name="message" rows="5" required maxlength="5000"<?= $aria('message') ?>><?= e($values['message']) ?></textarea>
          <?= $err('message') ?>
        </div>
        <button type="submit" class="btn btn-primary btn-block" data-loading-text="Sending…">Send message</button>
      </form>
    </div>
  </div>
</section>
