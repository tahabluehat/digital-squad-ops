import { useState } from "react";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Play, Users } from "lucide-react";
import { Container, SectionHeading, buttonStyles } from "@/components/site/primitives";
import { ContactSection, INTEREST_EVENT } from "@/components/site/contact-section";
import { isLocale, locales, localizedPath, pageCopy, type Locale } from "@/lib/i18n";
import { localizedPosts } from "@/lib/localized-posts";
import presentationCover from "@/assets/digitalsquad-presentation.jpg";

const ORIGIN = "https://digital-squad-ops.lovable.app";

function resolveLocale(value: string): Locale {
  return isLocale(value) ? value : "en";
}

const OG_LOCALE = { en: "en_US", fr: "fr_FR", ar: "ar_MA" } as const;

export function localizedHead(localeParam: string, rawPath: string) {
  const locale = resolveLocale(localeParam);
  const copy = pageCopy[locale];
  const path = rawPath.replace(/^\/+|\/+$/g, "");
  const postSlug = path.startsWith("blog/") ? path.slice(5) : "";
  const post = localizedPosts[locale].find((item) => item.slug === postSlug);
  const page = path === "blog" ? copy.blog.title : path === "about" ? copy.about.title : path === "services" ? copy.standaloneServices.title : path === "contact" ? copy.contact.eyebrow : path === "tva" ? copy.tva.title : post?.title ?? copy.meta.title;
  const description = post?.excerpt ?? (path === "blog" ? copy.blog.body : path === "about" ? copy.about.body : path === "services" ? copy.standaloneServices.body : path === "contact" ? copy.contact.body : path === "tva" ? copy.tva.body : copy.meta.description);
  const suffix = page === copy.meta.title ? "" : " — DigitalSquad";
  const title = `${page}${suffix}`;
  const pathname = `/${locale}${path ? `/${path}` : ""}`;
  const url = `${ORIGIN}${pathname}`;
  const known = ["", "blog", "about", "services", "contact", "tva"].includes(path) || Boolean(post);

  const organization = {
    "@type": "Organization",
    "@id": `${ORIGIN}/#organization`,
    name: "DigitalSquad",
    url: ORIGIN,
    logo: `${ORIGIN}/images/squad.png`,
    email: "contact@digitalsquad.ma",
    telephone: "+212625291897",
    address: { "@type": "PostalAddress", addressLocality: "Casablanca", addressCountry: "MA" },
    sameAs: [
      "https://www.linkedin.com/company/digital-squad-ma/",
      "https://www.youtube.com/channel/UCguqMv7qfdhjTm9JZCwspYg",
    ],
  };

  const graph: Record<string, unknown>[] = [organization];
  if (!path) {
    graph.push({
      "@type": "WebSite",
      "@id": `${ORIGIN}/#website`,
      url,
      name: "DigitalSquad",
      inLanguage: locale,
      description,
      publisher: { "@id": `${ORIGIN}/#organization` },
    });
    graph.push({
      "@type": "ProfessionalService",
      name: "DigitalSquad",
      url,
      description,
      areaServed: ["MA", "FR"],
      provider: { "@id": `${ORIGIN}/#organization` },
    });
  } else {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "DigitalSquad", item: `${ORIGIN}/${locale}` },
        ...(post ? [{ "@type": "ListItem", position: 2, name: copy.blog.title, item: `${ORIGIN}/${locale}/blog` }] : []),
        { "@type": "ListItem", position: post ? 3 : 2, name: page, item: url },
      ],
    });
  }
  if (post) {
    graph.push({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      inLanguage: locale,
      articleSection: post.category,
      mainEntityOfPage: url,
      author: { "@id": `${ORIGIN}/#organization` },
      publisher: { "@id": `${ORIGIN}/#organization` },
    });
  }

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: post ? "article" : "website" },
      { property: "og:url", content: url },
      { property: "og:site_name", content: "DigitalSquad" },
      { property: "og:locale", content: OG_LOCALE[locale] },
      ...locales.filter((code) => code !== locale).map((code) => ({ property: "og:locale:alternate", content: OG_LOCALE[code] })),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "robots", content: known ? "index, follow, max-image-preview:large, max-snippet:-1" : "noindex" },
    ],
    links: [
      { rel: "canonical", href: url },
      ...locales.map((code) => ({ rel: "alternate", hrefLang: code, href: `${ORIGIN}${localizedPath(code, pathname)}` })),
      { rel: "alternate", hrefLang: "x-default", href: `${ORIGIN}${localizedPath("en", pathname)}` },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      },
    ],
  };
}


function HeroVisual({ locale }: { locale: Locale }) {
  const [playing, setPlaying] = useState(false);
  const copy = pageCopy[locale].hero;
  if (playing) return <div className="aspect-video overflow-hidden rounded-[var(--ds-radius-card)] bg-navy"><iframe src="https://www.youtube-nocookie.com/embed/iRzLFHrvc7U?autoplay=1&rel=0&modestbranding=1" title={copy.video} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen className="h-full w-full" /></div>;
  return <div className="flex flex-col gap-4"><button type="button" onClick={() => setPlaying(true)} aria-label={copy.video} className="group relative aspect-video overflow-hidden rounded-[var(--ds-radius-card)] bg-navy"><img src={presentationCover} alt="DigitalSquad" className="h-full w-full object-cover transition-transform group-hover:scale-[1.015]" /><span className="absolute inset-0 bg-media-overlay" /></button><button type="button" onClick={() => setPlaying(true)} className="inline-flex items-center gap-2 text-sm font-semibold text-brand underline underline-offset-4"><Play className="h-4 w-4" />{copy.watch}<ArrowRight className="directional h-4 w-4" /></button></div>;
}

function Home({ locale }: { locale: Locale }) {
  const c = pageCopy[locale];
  const refs = [["CDG Capital", "/images/brand-1.png"], ["Intelcia", "/images/brand-2.png"], ["Docaposte", "/images/brand-3.png"], ["Omnia Academy", "/images/brand-4.png"]];
  return <>
    <section className="ds-section"><Container><div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16"><div className="lg:col-span-7"><p className="ds-eyebrow">{c.hero.eyebrow}</p><h1 className="ds-display mt-4">{c.hero.title}</h1><p className="ds-lead ds-measure mt-6">{c.hero.body}</p><div className="mt-10 flex flex-wrap gap-4"><a href={`/${locale}#contact`} className={buttonStyles.primary}>{c.hero.primary}</a><a href={`/${locale}#services`} className={buttonStyles.secondary}>{c.hero.secondary}</a></div></div><div className="lg:col-span-5"><HeroVisual locale={locale} /></div></div></Container></section>
    <section className="border-y py-14 bg-surface-subtle"><Container><p className="ds-eyebrow text-center">{c.refs}</p><ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">{refs.map(([name, src]) => <li className="ds-logo-tile" key={name}><img src={src} alt={name} className="h-10 w-auto object-contain" /></li>)}</ul></Container></section>
    <section id="services" className="ds-section scroll-mt-24"><Container><SectionHeading eyebrow={c.services.eyebrow} title={c.services.title} description={c.services.body} /><div className="mt-12 grid gap-6 md:grid-cols-3">{c.services.items.map(([title, outcome, caps, cta]) => <div key={title} className="flex flex-col rounded-[var(--ds-radius-card)] border bg-white p-6 lg:p-8"><h3 className="ds-subheading">{title}</h3><p className="mt-3 text-text-secondary">{outcome}</p><ul className="mt-6 flex-1 space-y-3 text-sm">{caps.split("|").map(cap => <li className="flex items-start gap-3" key={cap}><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />{cap}</li>)}</ul><a href={`/${locale}#contact`} onClick={() => window.dispatchEvent(new CustomEvent(INTEREST_EVENT, { detail: title }))} className="mt-8 inline-flex items-center gap-2 font-semibold text-brand underline underline-offset-4">{cta}<ArrowRight className="directional h-4 w-4" /></a></div>)}</div></Container></section>
    <section id="work" className="on-navy ds-section scroll-mt-24 bg-navy"><Container><SectionHeading eyebrow={c.impact.eyebrow} title={c.impact.title} description={c.impact.body} inverse /><div className="mt-14 border-t border-navy-border">{c.impact.stories.map(([org, project, desc, team], i) => <article key={org} className="grid gap-6 border-b border-navy-border py-9 lg:grid-cols-12 lg:items-center"><div className="lg:col-span-4"><p className="text-sm font-semibold text-inverse-link">0{i + 1} / {org}</p><h3 className="mt-2 text-2xl font-semibold text-inverse-text">{project}</h3></div><p className="text-inverse-secondary lg:col-span-5">{desc}</p><div className="lg:col-span-3"><p className="flex items-center gap-2 text-xs font-semibold text-inverse-secondary"><Users className="h-4 w-4 text-brand" />{c.impact.team}</p><p className="mt-2 text-sm text-inverse-text">{team}</p></div></article>)}</div></Container></section>
    <section id="approach" className="ds-section scroll-mt-24"><Container><SectionHeading eyebrow={c.approach.eyebrow} title={c.approach.title} description={c.approach.body} /><ol className="mt-12 grid gap-8 md:grid-cols-3">{c.approach.steps.map(([title, body], i) => <li key={title}><span className="font-bold text-brand">0{i + 1}</span><h3 className="ds-subheading mt-2">{title}</h3><p className="mt-3 text-text-secondary">{body}</p></li>)}</ol><div className="mt-16 grid gap-8 md:grid-cols-3">{c.approach.faqs.map(([q, a]) => <div key={q}><h3 className="font-semibold">{q}</h3><p className="mt-2 text-text-secondary">{a}</p></div>)}</div></Container></section>
    <ContactSection locale={locale} />
  </>;
}

function Blog({ locale }: { locale: Locale }) {
  const c = pageCopy[locale].blog;
  return <><PageIntro title={c.title} body={c.body} /><section className="ds-section"><Container><div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">{localizedPosts[locale].map(post => <article key={post.slug} className="flex flex-col overflow-hidden rounded-[var(--ds-radius-card)] bg-white shadow-sm"><Link to="/$locale/$" params={{ locale, _splat: `blog/${post.slug}` }}><img src={post.image} alt={post.imageAlt} className="h-48 w-full object-cover" /></Link><div className="flex flex-1 flex-col p-6"><p className="text-xs font-semibold text-brand">{post.category} · {post.readTime}</p><h2 className="ds-subheading mt-2">{post.title}</h2><p className="mt-3 flex-1 text-sm text-text-secondary">{post.excerpt}</p><Link to="/$locale/$" params={{ locale, _splat: `blog/${post.slug}` }} className="mt-6 inline-flex items-center gap-2 font-semibold text-brand">{c.read}<ArrowRight className="directional h-4 w-4" /></Link></div></article>)}</div></Container></section></>;
}

function Article({ locale, slug }: { locale: Locale; slug: string }) {
  const post = localizedPosts[locale].find(item => item.slug === slug);
  if (!post) return <NotFound locale={locale} />;
  return <article><section className="bg-navy py-20 text-inverse-text"><Container><Link to="/$locale/$" params={{ locale, _splat: "blog" }} className="inline-flex items-center gap-2"><ArrowLeft className="directional h-4 w-4" />{pageCopy[locale].blog.back}</Link><h1 className="ds-display mt-6 max-w-4xl">{post.title}</h1></Container></section><section className="ds-section"><div className="mx-auto max-w-[70ch] px-5"><img src={post.image} alt={post.imageAlt} className="mb-10 aspect-video w-full rounded-[var(--ds-radius-card)] object-cover" /><p className="text-sm font-semibold text-brand">{post.category} · {post.readTime}</p><div className="mt-8 space-y-6 text-lg leading-relaxed text-text-secondary">{post.body.map((block, i) => block.type === "h2" ? <h2 key={i} className="ds-subheading pt-4 text-text">{block.text}</h2> : block.type === "quote" ? <blockquote key={i} className="border-s-4 border-brand bg-surface-subtle p-6 italic text-text">{block.text}</blockquote> : block.type === "ul" ? <ul key={i} className="list-disc space-y-2 ps-6">{block.items.map(item => <li key={item}>{item}</li>)}</ul> : <p key={i}>{block.text}</p>)}</div></div></section></article>;
}

function PageIntro({ title, body }: { title: string; body: string }) { return <section className="bg-navy py-20 text-center text-inverse-text"><Container><h1 className="ds-display">{title}</h1><p className="ds-lead mx-auto mt-4 max-w-2xl text-inverse-secondary">{body}</p></Container></section>; }
function About({ locale }: { locale: Locale }) { const c = pageCopy[locale].about; return <><PageIntro title={c.title} body={c.body} /><section className="ds-section"><Container><div className="grid items-center gap-12 lg:grid-cols-2"><div><p className="ds-eyebrow">{c.eyebrow}</p><h2 className="ds-heading mt-3">{c.heading}</h2><p className="ds-lead mt-6">{c.p1}</p><p className="mt-4 text-lg text-text-secondary">{c.p2}</p></div><img src="/images/about.svg" alt="DigitalSquad" className="w-full" /></div></Container></section></>; }
function Services({ locale }: { locale: Locale }) { const c = pageCopy[locale]; return <><PageIntro title={c.standaloneServices.title} body={c.standaloneServices.body} /><section className="ds-section"><Container><div className="grid gap-6 md:grid-cols-3">{c.services.items.map(([title, body, caps]) => <article key={title} className="rounded-[var(--ds-radius-card)] border bg-white p-8"><h2 className="ds-subheading">{title}</h2><p className="mt-3 text-text-secondary">{body}</p><ul className="mt-6 space-y-3">{caps.split("|").map(cap => <li className="flex gap-3" key={cap}><Check className="h-5 w-5 text-brand" />{cap}</li>)}</ul></article>)}</div></Container></section></>; }
function NotFound({ locale }: { locale: Locale }) { return <section className="ds-section"><Container><h1 className="ds-heading">{pageCopy[locale].notFound}</h1><Link to="/$locale" params={{ locale }} className={`${buttonStyles.primary} mt-6`}>{pageCopy[locale].hero.primary}</Link></Container></section>; }

export function LocalizedPage({ path }: { path: string }) {
  const params = useParams({ strict: false });
  const locale = resolveLocale(String(params.locale ?? "en"));
  const clean = path.replace(/^\/+|\/+$/g, "");
  if (!clean) return <Home locale={locale} />;
  if (clean === "blog") return <Blog locale={locale} />;
  if (clean.startsWith("blog/")) return <Article locale={locale} slug={clean.slice(5)} />;
  if (clean === "about") return <About locale={locale} />;
  if (clean === "services") return <Services locale={locale} />;
  if (clean === "contact") return <><PageIntro title={pageCopy[locale].contact.eyebrow} body={pageCopy[locale].contact.body} /><ContactSection locale={locale} /></>;
  if (clean === "tva") return <><div className="ds-container py-10"><h1 className="ds-heading">{pageCopy[locale].tva.title}</h1><p className="ds-lead ds-measure mt-3">{pageCopy[locale].tva.body}</p></div><iframe src="https://calcul-comptable.vercel.app" title={pageCopy[locale].tva.title} className="h-[80vh] w-full border-0" /></>;
  return <NotFound locale={locale} />;
}
