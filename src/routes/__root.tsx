import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Check, ChevronDown, Menu, Youtube, Linkedin, Mail, MapPin, Phone } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "@/components/ui/sonner";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Container, buttonStyles } from "@/components/site/primitives";
import { localeFromPath, localeInfo, locales, localizedPath, ui, type Locale } from "@/lib/i18n";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="ds-display">404</h1>
        <h2 className="ds-subheading mt-4">Page not found</h2>
        <p className="ds-lead mt-2">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-6">
          <Link to="/" className={buttonStyles.primary}>
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="ds-subheading">This page didn&apos;t load</h1>
        <p className="ds-lead mt-2">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className={buttonStyles.primary}
          >
            Try again
          </button>
          <a href="/" className={buttonStyles.secondary}>
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const SITE_TITLE = "DigitalSquad | Software Engineering & Consulting";
const SITE_DESCRIPTION =
  "DigitalSquad helps businesses build, improve, and scale software with experienced engineers, product designers, and delivery specialists.";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
      { name: "author", content: "DigitalSquad" },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const locale = localeFromPath(pathname);
  return (
    <html lang={locale} dir={localeInfo[locale].dir}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

type NavLink = { label: string } & ({ to: "/"; hash: string } | { to: "/blog"; hash?: never });

const navLinks: NavLink[] = [
  { to: "/", hash: "services", label: "Services" },
  { to: "/", hash: "work", label: "Work" },
  { to: "/", hash: "approach", label: "Approach" },
  { to: "/blog", label: "Blog" },
];

function LanguageSwitcher({ locale, pathname, mobile = false }: { locale: Locale; pathname: string; mobile?: boolean }) {
  return (
    <details className={`language-switcher relative ${mobile ? "mt-3" : ""}`}>
      <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-[var(--ds-radius-control)] border border-[var(--ds-border)] px-3 font-medium">
        <span aria-hidden="true">{localeInfo[locale].flag}</span><span>{localeInfo[locale].label}</span><ChevronDown className="h-4 w-4" aria-hidden="true" />
      </summary>
      <div className={`${mobile ? "mt-2" : "absolute end-0 top-full mt-2 min-w-44 shadow-lg"} z-50 rounded-[var(--ds-radius-card)] border border-[var(--ds-border)] bg-[var(--ds-background)] p-2`}>
        {locales.map((item) => (
          <a key={item} href={localizedPath(item, pathname)} lang={item} dir={localeInfo[item].dir} className="flex min-h-11 items-center gap-3 rounded-[var(--ds-radius-control)] px-3 hover:bg-[var(--ds-surface-subtle)]">
            <span aria-hidden="true">{localeInfo[item].flag}</span><span className="flex-1">{localeInfo[item].label}</span>{item === locale && <Check className="h-4 w-4 text-[var(--ds-brand)]" aria-hidden="true" />}
          </a>
        ))}
      </div>
    </details>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const locale = localeFromPath(pathname);
  const copy = ui[locale].nav;
  const home = `/${locale}`;
  const links = [
    [`${home}#services`, copy.services], [`${home}#work`, copy.work], [`${home}#approach`, copy.approach], [`${home}/blog`, copy.blog],
  ];
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[var(--ds-background)] border-[var(--ds-border)]">
      <Container className="flex h-20 items-center justify-between gap-4">
        <a href={home} className="flex items-center gap-3" aria-label="DigitalSquad home"><img src="/images/squad.png" alt="" width={40} height={40} className="h-10 w-auto" /><span className="font-display text-lg font-bold text-[var(--ds-brand)]">DigitalSquad</span></a>
        <nav aria-label="Main" className="hidden items-center gap-6 md:flex">{links.map(([href, label]) => <a key={href} href={href} className="text-[0.9375rem] font-medium hover:text-[var(--ds-link)]">{label}</a>)}<LanguageSwitcher locale={locale} pathname={pathname} /></nav>
        <div className="hidden md:block"><a href={`${home}#contact`} className={buttonStyles.primary}>{copy.cta}</a></div>
        <Sheet open={open} onOpenChange={setOpen}><SheetTrigger asChild className="md:hidden"><button type="button" aria-label="Open menu" className="inline-flex h-12 w-12 items-center justify-center rounded-[var(--ds-radius-control)] border border-[var(--ds-border)]"><Menu className="h-6 w-6" /></button></SheetTrigger><SheetContent side={locale === "ar" ? "left" : "right"} className="w-80 bg-[var(--ds-background)]"><SheetTitle className="sr-only">Navigation</SheetTitle><nav className="flex flex-col gap-2 pt-10">{links.map(([href, label]) => <a key={href} href={href} onClick={() => setOpen(false)} className="flex min-h-12 items-center text-lg font-medium">{label}</a>)}<LanguageSwitcher locale={locale} pathname={pathname} mobile /><a href={`${home}#contact`} className={`${buttonStyles.primary} mt-4`}>{copy.cta}</a></nav></SheetContent></Sheet>
      </Container>
    </header>
  );
}

function Footer() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const locale = localeFromPath(pathname);
  const copy = ui[locale].footer;
  const home = `/${locale}`;
  const inverseLink =
    "text-[var(--ds-inverse-secondary)] transition-colors hover:text-[var(--ds-inverse-link)] focus-visible:text-[var(--ds-inverse-link)]";

  return (
    <footer
      className="on-navy border-t"
      style={{
        backgroundColor: "var(--ds-inverse-surface)",
        borderColor: "var(--ds-inverse-border)",
      }}
    >
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center">
                <img src="/images/squad.png" alt="" width={32} height={32} className="h-8 w-auto" />
              </span>
              <span
                className="font-display text-lg font-bold"
                style={{ color: "var(--ds-brand)" }}
              >
                DigitalSquad
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--ds-inverse-secondary)" }}>
              {copy.blurb}
            </p>
          </div>

          <div>
            <h2
              className="font-display text-base font-semibold"
              style={{ color: "var(--ds-inverse-text)" }}
            >
              {copy.explore}
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href={`${home}#services`} className={inverseLink}>{ui[locale].nav.services}</a>
              </li>
              <li>
                <a href={`${home}#work`} className={inverseLink}>{ui[locale].nav.work}</a>
              </li>
              <li>
                <a href={`${home}#approach`} className={inverseLink}>{ui[locale].nav.approach}</a>
              </li>
              <li>
                <a href={`${home}/blog`} className={inverseLink}>{ui[locale].nav.blog}</a>
              </li>
              <li>
                <a href={`${home}/tva`} className={inverseLink}>TVA</a>
              </li>
            </ul>
          </div>

          <div>
            <h2
              className="font-display text-base font-semibold"
              style={{ color: "var(--ds-inverse-text)" }}
            >
              {copy.company}
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href={`${home}/about`} className={inverseLink}>{copy.about}</a>
              </li>
              <li>
                <a href={`${home}/blog`} className={inverseLink}>{ui[locale].nav.blog}</a>
              </li>
              <li>
                <a href="mailto:recrutement@digitalsquad.ma" className={inverseLink}>
                  {copy.careers}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2
              className="font-display text-base font-semibold"
              style={{ color: "var(--ds-inverse-text)" }}
            >
              {copy.contact}
            </h2>
            <ul className="mt-5 space-y-4 text-sm" style={{ color: "var(--ds-inverse-secondary)" }}>
              <li className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0"
                  style={{ color: "var(--ds-inverse-icon)" }}
                  aria-hidden="true"
                />
                <span>Casablanca, Morocco</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail
                  className="mt-0.5 h-5 w-5 shrink-0"
                  style={{ color: "var(--ds-inverse-icon)" }}
                  aria-hidden="true"
                />
                <a href="mailto:contact@digitalsquad.ma" className={inverseLink}>
                  contact@digitalsquad.ma
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone
                  className="mt-0.5 h-5 w-5 shrink-0"
                  style={{ color: "var(--ds-inverse-icon)" }}
                  aria-hidden="true"
                />
                <a href="tel:+212625291897" className={inverseLink}>
                  +212 625 29 18 97
                </a>
              </li>
            </ul>
            <div className="mt-6 flex gap-4">
              <a
                href="https://www.youtube.com/channel/UCguqMv7qfdhjTm9JZCwspYg"
                target="_blank"
                rel="noreferrer"
                aria-label="DigitalSquad on YouTube"
                className={`inline-flex h-11 w-11 items-center justify-center ${inverseLink}`}
              >
                <Youtube className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com/company/digital-squad-ma/"
                target="_blank"
                rel="noreferrer"
                aria-label="DigitalSquad on LinkedIn"
                className={`inline-flex h-11 w-11 items-center justify-center ${inverseLink}`}
              >
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </Container>
      <div className="border-t" style={{ borderColor: "var(--ds-inverse-border)" }}>
        <Container className="py-6">
          <p className="text-sm" style={{ color: "var(--ds-inverse-secondary)" }}>
            © {new Date().getFullYear()} DigitalSquad. {copy.rights}
          </p>
        </Container>
      </div>
    </footer>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-[var(--ds-radius-control)] focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-semibold"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <Toaster position="bottom-right" richColors />
    </QueryClientProvider>
  );
}
