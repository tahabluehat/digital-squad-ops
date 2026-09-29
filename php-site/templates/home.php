<?php
/** @var array $latest @var array $errors @var array $values @var bool $sent */
$values += ['name' => '', 'email' => '', 'company' => '', 'interest' => '', 'message' => ''];
$interestValues = ['Build your product', 'Extend your team', 'Improve your platform'];
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
if (current_locale() === 'fr') {
    $services = [
        ['Construire votre produit', 'Transformez une idée ou une feuille de route en logiciel opérationnel.', ['Conception produit et UX', 'Ingénierie frontend et backend', 'Tests et assurance qualité'], 'Parler d’un produit'],
        ['Renforcer votre équipe', 'Intégrez des spécialistes expérimentés à votre équipe technique.', ['Ingénieurs logiciels et tech leads', 'Designers produit et business analysts', 'Coaching agile et accompagnement delivery'], 'Parler du renfort d’équipe'],
        ['Améliorer votre plateforme', 'Identifiez les freins techniques et planifiez les améliorations.', ['Audit du code et de l’architecture', 'Modernisation et refactoring', 'DevOps, CI/CD et cloud'], 'Parler de votre plateforme'],
    ];
    $stories = [['Groupe OCP','Transformation du processus commercial','Transformation numérique du processus de vente du Groupe OCP, leader mondial de l’industrie des phosphates.','Imane, Bakr, Taha, Wijdane, Haitam'],['CDG Capital','Développement d’un portail client','Développement en un temps record d’un portail client pour la banque d’investissement CDG Capital.','Bakr, Taha'],['Tribunaux de commerce français','Transformation numérique','Contribution à la transformation numérique du système des tribunaux de commerce en France.','Haitam, Taha']];
    $steps = [['Aligner le besoin','Nous clarifions l’objectif, les contraintes et le résultat attendu avant de commencer.'],['Construire ensemble','Des itérations courtes, un backlog partagé et des démos régulières rendent les progrès visibles.'],['Revoir et transmettre','Le code, la documentation et les environnements restent chez vous, avec des prochaines étapes claires.']];
    $faqs = [['Pouvez-vous rejoindre une équipe existante ?','Oui. Nous nous intégrons à vos outils, processus et standards de revue de code.'],['Pouvez-vous intervenir sur un code existant ?','Oui. Nous évaluons le code et le dispositif de livraison, puis priorisons les améliorations.'],['Comment démarrer ?','Envoyez-nous une courte note via le formulaire ou par e-mail.']];
} elseif (current_locale() === 'ar') {
    $services = [
        ['بناء منتجكم', 'نحوّل فكرة المنتج أو خارطة الطريق إلى برنامج جاهز للعمل.', ['تصميم المنتج وتجربة المستخدم', 'هندسة الواجهات والخلفية', 'الاختبار وضمان الجودة'], 'ناقش منتجك'],
        ['تعزيز فريقكم', 'نضيف متخصصين ذوي خبرة إلى فريقكم الهندسي.', ['مهندسو برمجيات وقادة تقنيون', 'مصممو منتجات ومحللو أعمال', 'تدريب أجايل ودعم التسليم'], 'ناقش دعم الفريق'],
        ['تطوير منصتكم', 'نحدد العوائق التقنية ونخطط للتحسينات القادمة.', ['تدقيق الكود والبنية', 'التحديث وإعادة الهيكلة', 'DevOps وCI/CD والسحابة'], 'ناقش منصتك'],
    ];
    $stories = [['مجموعة OCP','تحويل عملية المبيعات','التحول الرقمي لعملية المبيعات لدى مجموعة OCP، الرائدة عالمياً في صناعة الفوسفات.','إيمان، بكر، طه، وجدان، هيثم'],['CDG Capital','تطوير بوابة العملاء','تطوير بوابة عملاء للبنك الاستثماري CDG Capital في وقت قياسي.','بكر، طه'],['المحاكم التجارية الفرنسية','التحول الرقمي','المساهمة في التحول الرقمي لمنظومة المحاكم التجارية في فرنسا.','هيثم، طه']];
    $steps = [['تحديد الاحتياج','نوضح الهدف والقيود والنتيجة المطلوبة قبل بدء العمل.'],['نبني معاً','دورات قصيرة وقائمة مهام مشتركة وعروض منتظمة تجعل التقدم واضحاً.'],['المراجعة والتسليم','يبقى الكود والتوثيق والبيئات لديكم، مع خطوات تالية واضحة.']];
    $faqs = [['هل يمكنكم الانضمام إلى فريق قائم؟','نعم، نندمج مع أدواتكم وعملياتكم ومعايير مراجعة الكود.'],['هل يمكنكم العمل على كود موجود؟','نعم، نراجع الكود وإعدادات التسليم ثم نرتب التحسينات.'],['كيف نبدأ؟','أرسلوا ملاحظة قصيرة عبر النموذج أو البريد الإلكتروني.']];
}
$err = fn (string $k) => isset($errors[$k]) ? '<p class="field-error" id="' . $k . '-error">' . e($errors[$k]) . '</p>' : '';
$aria = fn (string $k) => isset($errors[$k]) ? ' aria-invalid="true" aria-describedby="' . $k . '-error"' : '';
?>
<section class="section hero">
  <div class="container hero-grid">
    <div>
      <p class="eyebrow"><?= e(t('hero.eyebrow')) ?></p>
      <h1 class="display"><?= e(t('hero.title')) ?></h1>
      <p class="lead measure"><?= e(t('hero.body')) ?></p>
      <div class="btn-row">
        <a href="#contact" class="btn btn-primary"><?= e(t('nav.cta')) ?></a>
        <a href="#services" class="btn btn-secondary"><?= e(t('hero.secondary')) ?></a>
      </div>
    </div>
    <div class="hero-visual" data-video="iRzLFHrvc7U">
      <a class="video-thumb" href="https://www.youtube.com/watch?v=iRzLFHrvc7U" aria-label="Play the DigitalSquad presentation video">
        <img src="/images/digitalsquad-presentation.jpg" alt="DigitalSquad presentation featuring a team member speaking" width="1280" height="720" fetchpriority="high">
      </a>
      <a class="text-link video-link" href="https://www.youtube.com/watch?v=iRzLFHrvc7U"><?= icon('play') ?> <?= e(t('hero.watch')) ?> <?= icon('arrow-right') ?></a>
    </div>
  </div>
</section>

<section class="refs">
  <div class="container">
    <div class="refs-label" aria-hidden="true"><span></span><p class="eyebrow"><?= e(t('refs')) ?></p><span></span></div>
    <p class="sr-only"><?= e(t('refs')) ?></p>
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
      <p class="eyebrow"><?= e(t('services.eyebrow')) ?></p>
      <h2 class="heading"><?= e(t('services.title')) ?></h2>
      <p class="lead"><?= e(t('services.body')) ?></p>
    </div>
    <div class="card-grid">
      <?php foreach ($services as $serviceIndex => [$title, $outcome, $caps, $cta]): ?>
        <div class="card">
          <h3 class="subheading"><?= e($title) ?></h3>
          <p class="muted"><?= e($outcome) ?></p>
          <ul class="check-list">
            <?php foreach ($caps as $c): ?><li><?= icon('check', 'icon icon-brand') ?><span><?= e($c) ?></span></li><?php endforeach ?>
          </ul>
          <a class="text-link" href="<?= e(locale_url()) ?>?interest=<?= e(rawurlencode($interestValues[$serviceIndex])) ?>#contact" data-interest="<?= e($interestValues[$serviceIndex]) ?>"><?= e($cta) ?> <?= icon('arrow-right') ?></a>
        </div>
      <?php endforeach ?>
    </div>
  </div>
</section>

<section id="work" class="section on-navy navy">
  <div class="container">
    <div class="section-heading">
      <p class="eyebrow eyebrow-inverse"><?= e(t('impact.eyebrow')) ?></p>
      <h2 class="heading"><?= e(t('impact.title')) ?></h2>
      <p class="lead"><?= e(t('impact.body')) ?></p>
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
            <p class="story-team-label"><?= icon('users', 'icon icon-brand') ?> <?= e(t('impact.team')) ?></p>
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
      <p class="eyebrow"><?= e(t('approach.eyebrow')) ?></p>
      <h2 class="heading"><?= e(t('approach.title')) ?></h2>
      <p class="lead"><?= e(t('approach.body')) ?></p>
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
        <p class="eyebrow"><?= e(t('blog.from')) ?></p>
        <h2 class="heading"><?= e(t('blog.latest')) ?></h2>
      </div>
      <a class="text-link" href="<?= e(locale_url('blog')) ?>"><?= e(t('blog.all')) ?> <?= icon('arrow-right') ?></a>
    </div>
    <?php if ($latest): ?>
      <div class="post-grid">
        <?php foreach ($latest as $a) { require APP_ROOT . '/templates/partials/article-card.php'; } ?>
      </div>
    <?php else: ?>
      <div class="empty-state empty-inline">
        <p class="muted"><?= e(t('blog.empty')) ?></p>
      </div>
    <?php endif ?>
  </div>
</section>

<section id="contact" class="section on-navy navy">
  <div class="container contact-grid">
    <div>
      <p class="eyebrow eyebrow-inverse">Contact</p>
      <h2 class="heading"><?= e(t('contact.title')) ?></h2>
      <p class="lead"><?= e(t('contact.body')) ?></p>
      <ul class="contact-list">
        <li><?= icon('map-pin', 'icon icon-brand') ?><span>Casablanca, Morocco</span></li>
        <li><?= icon('mail', 'icon icon-brand') ?><a href="mailto:contact@digitalsquad.ma">contact@digitalsquad.ma</a></li>
        <li><?= icon('phone', 'icon icon-brand') ?><a href="tel:+212625291897">+212 625 29 18 97</a></li>
      </ul>
    </div>
    <div class="form-panel">
      <?php if ($sent): ?>
        <div class="alert alert-success" role="status" tabindex="-1" data-focus><?= e(t('contact.sent')) ?></div>
      <?php endif ?>
      <?php if (isset($errors['form'])): ?>
        <div class="alert alert-error" role="alert"><?= e($errors['form']) ?></div>
      <?php elseif ($errors): ?>
        <div class="alert alert-error" role="alert"><?= e(t('contact.check')) ?></div>
      <?php endif ?>
      <form method="post" action="<?= e(locale_url()) ?>#contact" class="form" data-once novalidate>
        <input type="hidden" name="_token" value="<?= e(form_token()) ?>">
        <div class="hp" aria-hidden="true"><label>Website <input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
        <div class="field-row">
          <div class="field">
            <label for="name"><?= e(t('contact.name')) ?> <span class="req">(<?= e(t('required')) ?>)</span></label>
            <input id="name" name="name" autocomplete="name" required maxlength="120" value="<?= e($values['name']) ?>"<?= $aria('name') ?>>
            <?= $err('name') ?>
          </div>
          <div class="field">
            <label for="email"><?= e(t('contact.email')) ?> <span class="req">(<?= e(t('required')) ?>)</span></label>
            <input id="email" name="email" type="email" autocomplete="email" required maxlength="190" value="<?= e($values['email']) ?>"<?= $aria('email') ?>>
            <?= $err('email') ?>
          </div>
        </div>
        <div class="field-row">
          <div class="field">
            <label for="company"><?= e(t('contact.company')) ?> <span class="opt">(<?= e(t('optional')) ?>)</span></label>
            <input id="company" name="company" autocomplete="organization" maxlength="160" value="<?= e($values['company']) ?>"<?= $aria('company') ?>>
            <?= $err('company') ?>
          </div>
          <div class="field">
            <label for="interest"><?= e(t('contact.interest')) ?> <span class="opt">(<?= e(t('optional')) ?>)</span></label>
            <select id="interest" name="interest">
              <option value=""><?= e(t('contact.select')) ?></option>
              <?php foreach (CONTACT_INTERESTS as $interestIndex => $opt): ?>
                <option value="<?= e($opt) ?>"<?= $values['interest'] === $opt ? ' selected' : '' ?>><?= e($services[$interestIndex][0] ?? $opt) ?></option>
              <?php endforeach ?>
            </select>
          </div>
        </div>
        <div class="field">
          <label for="message"><?= e(t('contact.need')) ?> <span class="req">(<?= e(t('required')) ?>)</span></label>
          <textarea id="message" name="message" rows="5" required maxlength="5000"<?= $aria('message') ?>><?= e($values['message']) ?></textarea>
          <?= $err('message') ?>
        </div>
        <button type="submit" class="btn btn-primary btn-block" data-loading-text="<?= e(t('contact.sending')) ?>"><?= e(t('contact.send')) ?></button>
      </form>
    </div>
  </div>
</section>
