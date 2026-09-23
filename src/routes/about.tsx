import { createFileRoute } from "@tanstack/react-router";
import { Users, Smile, FolderCheck } from "lucide-react";

export const Route = createFileRoute("/about")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "About — Digital Squad" },
      { name: "description", content: "Learn more about Digital Squad, our team, our values, and why companies trust us with their software projects." },
      { property: "og:title", content: "About — Digital Squad" },
      { property: "og:description", content: "Learn more about Digital Squad, our team, our values, and why companies trust us with their software projects." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const stats = [
  { icon: Users, value: "10", label: "Clients" },
  { icon: Smile, value: "99%", label: "Satisfaction" },
  { icon: FolderCheck, value: "14", label: "Projects" },
];

function AboutPage() {
  return (
    <>
      <section className="bg-[#1a1a2e] py-20 text-white lg:py-28">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <h1 className="section-title text-4xl lg:text-5xl">About Digital Squad</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">A proactive, technically proficient team focused on software craftsmanship.</p>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="section-subtitle">Welcome</span>
              <h2 className="section-title mt-3 text-3xl lg:text-4xl">
                Production, brainstorming of ideas and perfect rendering of work.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                This is what <span className="font-semibold text-[#f14836]">Digital Squad</span> is all about — a team of extremely hardworking people specialized in software development and many other fields.
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                Composed of designers, developers, agile experts and more, Digital Squad has a team for every project and will not disappoint. We achieve the best for our clients.
              </p>
            </div>
            <div>
              <img src="/images/about.svg" alt="About Digital Squad" className="rounded-2xl" />
            </div>
          </div>

          <div className="mt-20 grid gap-8 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl bg-white p-8 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f14836]/10 text-[#f14836]">
                  <s.icon className="h-7 w-7" />
                </div>
                <p className="section-title mt-4 text-4xl">{s.value}</p>
                <p className="mt-1 text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
