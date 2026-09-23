import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import { Menu, Youtube, Linkedin, Mail, MapPin, Phone } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "@/components/ui/sonner";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Container, buttonStyles } from "@/components/site/primitives";

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
  return (
    <html lang="en">
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

const navLinks: { to: string; hash?: string; label: string }[] = [
  { to: "/", hash: "services", label: "Services" },
  { to: "/", hash: "work", label: "Work" },
  { to: "/", hash: "approach", label: "Approach" },
  { to: "/blog", label: "Blog" },
];

function Header() {
  const [open, setOpen] = useState(false);

  function goToContact(event: MouseEvent<HTMLAnchorElement>) {
    if (window.location.pathname !== "/") return;

    event.preventDefault();
    setOpen(false);
    window.setTimeout(() => {
      window.location.hash = "contact";
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, open ? 350 : 0);
  }

  return (
    <header
      className="sticky top-0 z-50 w-full border-b"
      style={{ backgroundColor: "var(--ds-background)", borderColor: "var(--ds-border)" }}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3" aria-label="DigitalSquad home">
          <img
            src="/images/squad.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-auto"
          />
          <span className="font-display text-lg font-bold text-[var(--ds-brand)]">
            DigitalSquad
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              hash={link.hash}
              className="text-[0.9375rem] font-medium text-[var(--ds-text)] transition-colors hover:text-[var(--ds-link)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <a href="/#contact" onClick={goToContact} className={buttonStyles.primary}>
            Discuss your project
          </a>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button
              type="button"
              aria-label="Open menu"
              className="inline-flex h-12 w-12 items-center justify-center rounded-[var(--ds-radius-control)] border"
              style={{ borderColor: "var(--ds-border)" }}
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 bg-[var(--ds-background)]">
            <SheetTitle className="sr-only">Navigation menu</SheetTitle>
            <nav aria-label="Mobile" className="flex flex-col gap-2 pt-10">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  hash={link.hash}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center text-lg font-medium text-[var(--ds-text)]"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="/#contact"
                onClick={goToContact}
                className={`${buttonStyles.primary} mt-4`}
              >
                Discuss your project
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  );
}

function Footer() {
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
              Software engineering and consulting for teams building, improving, and scaling
              products.
            </p>
          </div>

          <div>
            <h2
              className="font-display text-base font-semibold"
              style={{ color: "var(--ds-inverse-text)" }}
            >
              Explore
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link to="/" hash="services" className={inverseLink}>
                  Services
                </Link>
              </li>
              <li>
                <Link to="/" hash="work" className={inverseLink}>
                  Work
                </Link>
              </li>
              <li>
                <Link to="/" hash="approach" className={inverseLink}>
                  Approach
                </Link>
              </li>
              <li>
                <Link to="/tva" className={inverseLink}>
                  TVA calculator
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2
              className="font-display text-base font-semibold"
              style={{ color: "var(--ds-inverse-text)" }}
            >
              Company
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link to="/about" className={inverseLink}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/blog" className={inverseLink}>
                  Blog
                </Link>
              </li>
              <li>
                <a href="mailto:recrutement@digitalsquad.ma" className={inverseLink}>
                  Careers &amp; internships
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2
              className="font-display text-base font-semibold"
              style={{ color: "var(--ds-inverse-text)" }}
            >
              Contact
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
            © {new Date().getFullYear()} DigitalSquad. All rights reserved.
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
