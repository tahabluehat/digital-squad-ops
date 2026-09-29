export const locales = ["en", "fr", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export const localeInfo = {
  en: { label: "English", flag: "🇬🇧", dir: "ltr" },
  fr: { label: "Français", flag: "🇫🇷", dir: "ltr" },
  ar: { label: "العربية", flag: "🇲🇦", dir: "rtl" },
} as const;

export function localeFromPath(pathname: string): Locale {
  const segment = pathname.split("/").filter(Boolean)[0];
  return isLocale(segment) ? segment : defaultLocale;
}

export function localizedPath(locale: Locale, pathname: string, hash = "") {
  const parts = pathname.split("/").filter(Boolean);
  if (isLocale(parts[0])) parts.shift();
  const rest = parts.length ? `/${parts.join("/")}` : "";
  return `/${locale}${rest}${hash ? `#${hash}` : ""}`;
}

export const ui = {
  en: {
    nav: { services: "Services", work: "Work", approach: "Approach", blog: "Blog", cta: "Discuss your project" },
    footer: { explore: "Explore", company: "Company", about: "About", careers: "Careers & internships", contact: "Contact", blurb: "Software engineering and consulting for teams building, improving, and scaling products.", rights: "All rights reserved." },
  },
  fr: {
    nav: { services: "Services", work: "Réalisations", approach: "Approche", blog: "Blog", cta: "Parlons de votre projet" },
    footer: { explore: "Explorer", company: "Entreprise", about: "À propos", careers: "Carrières et stages", contact: "Contact", blurb: "Ingénierie logicielle et conseil pour les équipes qui créent, améliorent et font évoluer leurs produits.", rights: "Tous droits réservés." },
  },
  ar: {
    nav: { services: "الخدمات", work: "إنجازاتنا", approach: "منهجيتنا", blog: "المدونة", cta: "لنتحدث عن مشروعك" },
    footer: { explore: "استكشف", company: "الشركة", about: "من نحن", careers: "الوظائف والتدريب", contact: "اتصل بنا", blurb: "هندسة البرمجيات والاستشارات للفرق التي تبني المنتجات وتحسنها وتوسعها.", rights: "جميع الحقوق محفوظة." },
  },
} as const;

export const pageCopy = {
  en: {
    meta: { title: "DigitalSquad | Software Engineering & Consulting", description: "Agile delivery and engineering excellence, focused on the outcomes that matter to your business." },
    hero: { eyebrow: "Software engineering & consulting", title: "Move faster. Create lasting value.", body: "Agile delivery and engineering excellence, focused on the outcomes that matter to your business.", primary: "Discuss your project", secondary: "Explore our expertise", watch: "Watch our presentation", video: "DigitalSquad presentation video" },
    refs: "Teams we have delivered software for",
    services: { eyebrow: "Ways to work together", title: "The right support for your next step.", body: "Three clear ways to engage, depending on whether you need a product built, more capacity, or a clearer technical path.", items: [
      ["Build your product", "Turn a product idea or roadmap into working software.", "Product and UX design|Frontend and backend engineering|Testing and QA", "Discuss a product"],
      ["Extend your team", "Bring experienced specialists into your existing engineering team.", "Software engineers and tech leads|Product designers and business analysts|Agile coaching and delivery support", "Discuss team support"],
      ["Improve your platform", "Identify technical friction and plan the next improvements.", "Code and architecture audits|Modernisation and refactoring|DevOps, CI/CD, and cloud", "Discuss your platform"],
    ]},
    impact: { eyebrow: "Selected engagements", title: "Our Impact and success stories", body: "Digital products and transformation programmes delivered by DigitalSquad team members across industry, finance, and public services.", team: "Team members involved", stories: [
      ["OCP Group", "Sales Process Transformation", "Digital transformation of the sales process for OCP Group, a global leader in the phosphate industry.", "Imane, Bakr, Taha, Wijdane, Haitam"],
      ["CDG Capital", "Client Portal Development", "Development of a client portal for investment bank CDG Capital in record time.", "Bakr, Taha"],
      ["French Commercial Courts", "Digital Transformation", "Contribution to the digital transformation of the commercial court system in France.", "Haitam, Taha"],
    ]},
    approach: { eyebrow: "How we work", title: "Clear priorities. Visible progress.", body: "A simple way of working that keeps scope, collaboration, and delivery visible from the first conversation.", steps: [["Align on the need", "We clarify the goal, constraints, and a good outcome before work begins."], ["Build together", "Short iterations, a shared backlog, and regular demos keep progress visible."], ["Review and hand over", "Code, documentation, and environments stay with you, with clear next steps."]], faqs: [["Can you join an existing engineering team?", "Yes. We integrate with your tools, processes, and code review standards."], ["Can you work on an existing codebase?", "Yes. We review the code and delivery setup, then prioritise improvements."], ["How do we start a discussion?", "Send a short note through the form or email us directly."]]},
    contact: { eyebrow: "Contact", title: "Tell us what you're building.", body: "Share your goals, current challenges, or the expertise your team needs.", name: "Name", email: "Email", company: "Company", optional: "optional", interest: "Area of interest", select: "Select an area", need: "Project or team need", send: "Send message", sending: "Sending…", or: "Or email", success: "Message sent. We'll be in touch shortly." },
    blog: { title: "Our Blog", body: "News, insights and updates from DigitalSquad.", read: "Read more", back: "Back to blog", share: "Share", categories: "Categories", tags: "Popular Tags", all: "All Items" },
    about: { title: "About DigitalSquad", body: "A proactive, technically proficient team focused on software craftsmanship.", eyebrow: "Welcome", heading: "Ideas, delivery, and software built with care.", p1: "DigitalSquad brings together experienced specialists in software development, design, and agile delivery.", p2: "We form the right team for each engagement and work closely with clients from the first conversation to handover." },
    standaloneServices: { title: "Our Services", body: "Practical expertise to build products, strengthen teams, and improve platforms." },
    tva: { title: "TVA calculator for Moroccan businesses", body: "Enter an amount and choose a TVA rate to calculate the net amount, tax, and total." },
    notFound: "Page not found",
  },
  fr: {
    meta: { title: "DigitalSquad | Ingénierie logicielle et conseil", description: "Livraison agile et excellence technique, centrées sur les résultats qui comptent pour votre entreprise." },
    hero: { eyebrow: "Ingénierie logicielle & conseil", title: "Avancez plus vite. Créez une valeur durable.", body: "Livraison agile et excellence technique, centrées sur les résultats qui comptent pour votre entreprise.", primary: "Parlons de votre projet", secondary: "Découvrir notre expertise", watch: "Voir notre présentation", video: "Vidéo de présentation DigitalSquad" },
    refs: "Des équipes pour lesquelles nous avons livré des logiciels",
    services: { eyebrow: "Nos modes de collaboration", title: "Le bon accompagnement pour votre prochaine étape.", body: "Trois façons claires de collaborer selon votre besoin : construire un produit, renforcer une équipe ou améliorer une plateforme.", items: [
      ["Construire votre produit", "Transformez une idée ou une feuille de route en logiciel opérationnel.", "Conception produit et UX|Ingénierie frontend et backend|Tests et assurance qualité", "Parler d’un produit"],
      ["Renforcer votre équipe", "Intégrez des spécialistes expérimentés à votre équipe technique.", "Ingénieurs logiciels et tech leads|Designers produit et business analysts|Coaching agile et accompagnement delivery", "Parler du renfort d’équipe"],
      ["Améliorer votre plateforme", "Identifiez les freins techniques et planifiez les prochaines améliorations.", "Audit du code et de l’architecture|Modernisation et refactoring|DevOps, CI/CD et cloud", "Parler de votre plateforme"],
    ]},
    impact: { eyebrow: "Missions sélectionnées", title: "Notre impact et nos réussites", body: "Des produits numériques et programmes de transformation livrés par les membres de l’équipe DigitalSquad dans l’industrie, la finance et les services publics.", team: "Membres de l’équipe", stories: [["Groupe OCP", "Transformation du processus commercial", "Transformation numérique du processus de vente du Groupe OCP, leader mondial de l’industrie des phosphates.", "Imane, Bakr, Taha, Wijdane, Haitam"], ["CDG Capital", "Développement d’un portail client", "Développement en un temps record d’un portail client pour la banque d’investissement CDG Capital.", "Bakr, Taha"], ["Tribunaux de commerce français", "Transformation numérique", "Contribution à la transformation numérique du système des tribunaux de commerce en France.", "Haitam, Taha"]]},
    approach: { eyebrow: "Notre méthode", title: "Des priorités claires. Des progrès visibles.", body: "Une façon de travailler simple qui rend le périmètre, la collaboration et la livraison visibles dès le premier échange.", steps: [["Aligner le besoin", "Nous clarifions l’objectif, les contraintes et le résultat attendu avant de commencer."], ["Construire ensemble", "Des itérations courtes, un backlog partagé et des démos régulières rendent les progrès visibles."], ["Revoir et transmettre", "Le code, la documentation et les environnements restent chez vous, avec des prochaines étapes claires."]], faqs: [["Pouvez-vous rejoindre une équipe existante ?", "Oui. Nous nous intégrons à vos outils, processus et standards de revue de code."], ["Pouvez-vous intervenir sur un code existant ?", "Oui. Nous évaluons le code et le dispositif de livraison, puis priorisons les améliorations."], ["Comment démarrer ?", "Envoyez-nous une courte note via le formulaire ou par e-mail."]]},
    contact: { eyebrow: "Contact", title: "Parlez-nous de votre projet.", body: "Partagez vos objectifs, vos défis actuels ou l’expertise dont votre équipe a besoin.", name: "Nom", email: "E-mail", company: "Entreprise", optional: "facultatif", interest: "Domaine d’intérêt", select: "Choisir un domaine", need: "Projet ou besoin de l’équipe", send: "Envoyer le message", sending: "Envoi…", or: "Ou écrivez à", success: "Message envoyé. Nous vous répondrons prochainement." },
    blog: { title: "Notre blog", body: "Actualités, analyses et nouveautés de DigitalSquad.", read: "Lire la suite", back: "Retour au blog", share: "Partager", categories: "Catégories", tags: "Mots-clés", all: "Tous les articles" },
    about: { title: "À propos de DigitalSquad", body: "Une équipe proactive et techniquement experte, attachée à la qualité logicielle.", eyebrow: "Bienvenue", heading: "Des idées, une livraison maîtrisée et des logiciels conçus avec soin.", p1: "DigitalSquad réunit des spécialistes expérimentés du développement logiciel, du design et de la livraison agile.", p2: "Nous constituons l’équipe adaptée à chaque mission et travaillons étroitement avec nos clients jusqu’à la transmission." },
    standaloneServices: { title: "Nos services", body: "Une expertise concrète pour construire des produits, renforcer les équipes et améliorer les plateformes." },
    tva: { title: "Calculateur de TVA pour les entreprises marocaines", body: "Saisissez un montant et choisissez un taux de TVA pour calculer le hors taxe, la taxe et le total." },
    notFound: "Page introuvable",
  },
  ar: {
    meta: { title: "DigitalSquad | هندسة البرمجيات والاستشارات", description: "تسليم مرن وتميز هندسي يركزان على النتائج المهمة لأعمالكم." },
    hero: { eyebrow: "هندسة البرمجيات والاستشارات", title: "تحركوا أسرع. واصنعوا قيمة تدوم.", body: "تسليم مرن وتميز هندسي يركزان على النتائج المهمة لأعمالكم.", primary: "لنتحدث عن مشروعك", secondary: "اكتشف خبراتنا", watch: "شاهد عرضنا", video: "فيديو تقديم DigitalSquad" },
    refs: "فرق قدمنا لها حلولاً برمجية",
    services: { eyebrow: "طرق التعاون معنا", title: "الدعم المناسب لخطوتكم القادمة.", body: "ثلاث طرق واضحة للتعاون، سواء أردتم بناء منتج أو تعزيز فريقكم أو تطوير منصتكم.", items: [
      ["بناء منتجكم", "نحوّل فكرة المنتج أو خارطة الطريق إلى برنامج جاهز للعمل.", "تصميم المنتج وتجربة المستخدم|هندسة الواجهات والخلفية|الاختبار وضمان الجودة", "ناقش منتجك"],
      ["تعزيز فريقكم", "نضيف متخصصين ذوي خبرة إلى فريقكم الهندسي الحالي.", "مهندسو برمجيات وقادة تقنيون|مصممو منتجات ومحللو أعمال|تدريب أجايل ودعم التسليم", "ناقش دعم الفريق"],
      ["تطوير منصتكم", "نحدد العوائق التقنية ونخطط للتحسينات القادمة.", "تدقيق الكود والبنية|التحديث وإعادة الهيكلة|DevOps وCI/CD والسحابة", "ناقش منصتك"],
    ]},
    impact: { eyebrow: "مشاريع مختارة", title: "أثرنا وقصص نجاحنا", body: "منتجات رقمية وبرامج تحول أنجزها أعضاء فريق DigitalSquad في الصناعة والتمويل والخدمات العامة.", team: "أعضاء الفريق المشاركون", stories: [["مجموعة OCP", "تحويل عملية المبيعات", "التحول الرقمي لعملية المبيعات لدى مجموعة OCP، الرائدة عالمياً في صناعة الفوسفات.", "إيمان، بكر، طه، وجدان، هيثم"], ["CDG Capital", "تطوير بوابة العملاء", "تطوير بوابة عملاء للبنك الاستثماري CDG Capital في وقت قياسي.", "بكر، طه"], ["المحاكم التجارية الفرنسية", "التحول الرقمي", "المساهمة في التحول الرقمي لمنظومة المحاكم التجارية في فرنسا.", "هيثم، طه"]]},
    approach: { eyebrow: "كيف نعمل", title: "أولويات واضحة. تقدم ملموس.", body: "منهجية بسيطة تجعل النطاق والتعاون والتسليم واضحة منذ أول محادثة.", steps: [["تحديد الاحتياج", "نوضح الهدف والقيود والنتيجة المطلوبة قبل بدء العمل."], ["نبني معاً", "دورات قصيرة وقائمة مهام مشتركة وعروض منتظمة تجعل التقدم واضحاً."], ["المراجعة والتسليم", "يبقى الكود والتوثيق والبيئات لديكم، مع خطوات تالية واضحة."]], faqs: [["هل يمكنكم الانضمام إلى فريق هندسي قائم؟", "نعم، نندمج مع أدواتكم وعملياتكم ومعايير مراجعة الكود لديكم."], ["هل يمكنكم العمل على كود موجود؟", "نعم، نراجع الكود وإعدادات التسليم ثم نرتب التحسينات حسب الأولوية."], ["كيف نبدأ؟", "أرسلوا ملاحظة قصيرة عبر النموذج أو البريد الإلكتروني."]]},
    contact: { eyebrow: "اتصل بنا", title: "حدثنا عما تبنيه.", body: "شارك أهدافك أو تحدياتك الحالية أو الخبرة التي يحتاجها فريقك.", name: "الاسم", email: "البريد الإلكتروني", company: "الشركة", optional: "اختياري", interest: "مجال الاهتمام", select: "اختر مجالاً", need: "تفاصيل المشروع أو حاجة الفريق", send: "إرسال الرسالة", sending: "جارٍ الإرسال…", or: "أو راسلنا", success: "تم إرسال الرسالة. سنتواصل معك قريباً." },
    blog: { title: "مدونتنا", body: "أخبار ورؤى وتحديثات من DigitalSquad.", read: "اقرأ المزيد", back: "العودة إلى المدونة", share: "مشاركة", categories: "التصنيفات", tags: "الوسوم الشائعة", all: "كل المقالات" },
    about: { title: "من نحن في DigitalSquad", body: "فريق استباقي ذو خبرة تقنية يركز على جودة صناعة البرمجيات.", eyebrow: "مرحباً", heading: "أفكار وتنفيذ وبرمجيات مبنية بعناية.", p1: "تجمع DigitalSquad متخصصين ذوي خبرة في تطوير البرمجيات والتصميم والتسليم المرن.", p2: "نكوّن الفريق المناسب لكل مهمة ونعمل عن قرب مع عملائنا من أول محادثة حتى التسليم." },
    standaloneServices: { title: "خدماتنا", body: "خبرة عملية لبناء المنتجات وتعزيز الفرق وتطوير المنصات." },
    tva: { title: "حاسبة الضريبة على القيمة المضافة للشركات المغربية", body: "أدخل المبلغ واختر نسبة الضريبة لحساب المبلغ دون الضريبة والضريبة والإجمالي." },
    notFound: "الصفحة غير موجودة",
  },
} as const;
