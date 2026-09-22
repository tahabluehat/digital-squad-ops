import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useLocation,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X, Youtube, Linkedin, Mail, MapPin, Phone } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "@/components/ui/sonner";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
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
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Digital Squad — Software Development Team" },
      { name: "description", content: "Digital Squad is a proactive, technically proficient software development agency guiding startups and established companies to success." },
      { name: "author", content: "Digital Squad" },
      { property: "og:title", content: "Digital Squad — Software Development Team" },
      { property: "og:description", content: "Digital Squad is a proactive, technically proficient software development agency guiding startups and established companies to success." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@digitalsquad" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" },
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

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/blog", label: "Blog" },
  { to: "/tva", label: "TVA" },
  { to: "/contact", label: "Contact" },
];

function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src="/images/squad.png" alt="Digital Squad" className="h-10 w-auto" />
          <span className="font-display text-xl font-bold text-[#f14836]">Digital Squad</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-[#f14836] ${
                pathname === link.to ? "text-[#f14836]" : "text-foreground/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild className="bg-[#f14836] text-white hover:bg-[#f14836]/90">
            <Link to="/contact">Get in touch</Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetTitle className="sr-only">Navigation menu</SheetTitle>
            <div className="flex flex-col gap-4 pt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`text-lg font-medium transition-colors hover:text-[#f14836] ${
                    pathname === link.to ? "text-[#f14836]" : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild className="mt-4 bg-[#f14836] text-white hover:bg-[#f14836]/90">
                <Link to="/contact" onClick={() => setOpen(false)}>
                  Get in touch
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[#1a1a2e] text-white">
      <div className="container mx-auto px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="/images/squad.png" alt="Digital Squad" className="h-10 w-auto" />
              <span className="font-display text-xl font-bold text-[#f14836]">Why Us</span>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              There are many software development agencies out there, but transparent and hardworking ones are rare.
              Digital Squad offers top-scale services with clients’ needs in mind. Contact us about your next big project.
            </p>
          </div>

          <div>
            <h5 className="mb-6 font-display text-lg font-semibold">Services</h5>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link to="/services" className="hover:text-[#f14836]">Outsourcing</Link></li>
              <li><Link to="/services" className="hover:text-[#f14836]">Auditing</Link></li>
              <li><Link to="/services" className="hover:text-[#f14836]">Agility & Design</Link></li>
              <li><Link to="/services" className="hover:text-[#f14836]">DevOps & Cloud</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="mb-6 font-display text-lg font-semibold">About Us</h5>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link to="/about" className="hover:text-[#f14836]">Overview</Link></li>
              <li><Link to="/about" className="hover:text-[#f14836]">Why us</Link></li>
              <li><Link to="/about" className="hover:text-[#f14836]">Awards & Recognitions</Link></li>
              <li><Link to="/about" className="hover:text-[#f14836]">Team</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="mb-6 font-display text-lg font-semibold">Contact Info</h5>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#f14836]" />
                <span>BD MOHAMED ZAFZAF RES SOFIA<br />N 189 APT RDC SIDI MOUMEN, CASABLANCA</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-[#f14836]" />
                <span>contact@digitalsquad.ma</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-[#f14836]" />
                <span>+212 625 29 18 97</span>
              </li>
            </ul>
            <div className="mt-6 flex gap-4">
              <a href="https://www.youtube.com/channel/UCguqMv7qfdhjTm9JZCwspYg" target="_blank" rel="noreferrer" aria-label="YouTube" className="text-white/70 hover:text-[#f14836]">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/company/digital-squad-ma/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-white/70 hover:text-[#f14836]">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-sm text-white/50">
        © {new Date().getFullYear()} Digital Squad. All rights reserved.
      </div>
    </footer>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <Toaster position="bottom-right" richColors />
    </QueryClientProvider>
  );
}
