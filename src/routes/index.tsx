import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Code, Briefcase, Cloud, Palette } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Digital Squad — Software Development Team" },
      { name: "description", content: "Not all heroes wear capes. Digital Squad designs and builds software for startups and established companies." },
      { property: "og:title", content: "Digital Squad — Software Development Team" },
      { property: "og:description", content: "Not all heroes wear capes. Digital Squad designs and builds software for startups and established companies." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const services = [
  { icon: Code, title: "Outsourcing", desc: "Cut costs and work with professionals on your projects." },
  { icon: Briefcase, title: "Auditing", desc: "Ensure your software engineering is high quality and on plan." },
  { icon: Palette, title: "Agility & Design", desc: "UX/UI design and agile coaching for better products." },
  { icon: Cloud, title: "DevOps & Cloud", desc: "CI/CD pipelines and cloud infrastructure setup." },
];

const clients = [
  { name: "CDG Capital", href: "https://www.cdgcapital.ma/fr", src: "/images/brand-1.png" },
  { name: "Intelcia", href: "https://www.intelcia.com/fr/it-solutions", src: "/images/brand-2.jpg" },
  { name: "Docaposte", href: "https://www.docaposte.com/", src: "/images/brand-3.png" },
  { name: "Omnia Academy", href: "https://www.omniacademy.ma/", src: "/images/brand-4.png" },
];

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#1a1a2e] py-24 text-white lg:py-32">
        <div className="absolute inset-0 opacity-20">
          <img src="/images/header-hero.jpg" alt="" className="h-full w-full object-cover" />
        </div>
        <div className="container relative mx-auto px-4 text-center lg:px-8">
          <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight lg:text-6xl">
            Not all heroes wear capes, <span className="text-[#f14836]">some design your software!</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            Digital Squad excels in guiding clients to success with a proactive and technically proficient team focused on software craftsmanship.
          </p>
          <form className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <Input
              type="email"
              placeholder="contact@digitalsquad.ma"
              className="h-12 flex-1 border-white/20 bg-white/10 text-white placeholder:text-white/50"
            />
            <Button asChild className="h-12 bg-[#f14836] px-6 text-white hover:bg-[#f14836]/90">
              <Link to="/contact">Get in touch</Link>
            </Button>
          </form>
        </div>
      </section>

      {/* About summary */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="section-subtitle">Welcome</span>
            <h2 className="section-title mt-3 text-3xl lg:text-4xl">
              Production, brainstorming of ideas and perfect rendering of work.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              This is what <span className="font-semibold text-[#f14836]">Digital Squad</span> is all about — a team of extremely hardworking people specialized in software development and many other fields.
              Composed of designers, developers, agile experts and more, we have a team for every project.
            </p>
          </div>
          <div className="mt-12 flex justify-center">
            <img src="/images/about.svg" alt="About Digital Squad" className="max-w-full" />
          </div>
        </div>
      </section>

      {/* Services highlights */}
      <section className="bg-[#fff0ee] py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-subtitle">Our Services</span>
            <h2 className="section-title mt-3 text-3xl lg:text-4xl">Solutions tailored to your needs</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <div key={s.title} className="rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#f14836]/10 text-[#f14836]">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="section-title mt-4 text-xl">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline" className="border-[#f14836] text-[#f14836] hover:bg-[#f14836] hover:text-white">
              <Link to="/services" className="gap-2">
                All Services <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* References */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center">
            <span className="section-subtitle">Some References</span>
            <h2 className="section-title mt-3 text-3xl">Trusted by leading companies</h2>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 grayscale transition-all hover:grayscale-0">
            {clients.map((c) => (
              <a key={c.name} href={c.href} target="_blank" rel="noreferrer" className="block">
                <img src={c.src} alt={c.name} className="h-16 w-auto object-contain" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
