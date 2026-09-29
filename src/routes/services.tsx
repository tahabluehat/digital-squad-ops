import { createFileRoute, Navigate } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Briefcase, Palette, Cloud } from "lucide-react";

export const Route = createFileRoute("/services")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Services — Digital Squad" },
      { name: "description", content: "Discover Digital Squad services: outsourcing, auditing, agility & design, DevOps & cloud." },
      { property: "og:title", content: "Services — Digital Squad" },
      { property: "og:description", content: "Discover Digital Squad services: outsourcing, auditing, agility & design, DevOps & cloud." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <Navigate to="/$locale/$" params={{ locale: "en", _splat: "services" }} replace />,
});

const serviceTabs = [
  {
    id: "outsourcing",
    icon: Code,
    title: "Outsourcing",
    image: "/images/code-review.svg",
    content: (
      <>
        <p>
          <span className="font-semibold text-[#f14836]">Digital Squad</span> is the perfect match if you are looking to cut costs and work with professionals. We offer an outsourcing service to companies and start-ups.
        </p>
        <p className="mt-4">
          Working with an outside agency brings new perspectives, ideas and skills to an already going or new project. Our agency is one of the leaders in this area, making our clients’ projects stronger and built to last.
        </p>
      </>
    ),
  },
  {
    id: "auditing",
    icon: Briefcase,
    title: "Auditing",
    image: "/images/auditing.jpg",
    content: (
      <p>
        Just like any entity, an audit is an external or internal process required to ensure that a company’s software engineering is of good quality and that it’s adhering to the plans made in the first stages of creation.
      </p>
    ),
  },
  {
    id: "agility",
    icon: Palette,
    title: "Agility & Design",
    image: "/images/scrum.svg",
    content: (
      <>
        <h3 className="section-title text-2xl">UX/UI designer and agile coach for your business growth.</h3>
        <p className="mt-4">
          From mood boards to prototypes, our team works on UX design to improve usability and ensure a good user interaction with businesses, services and products.
        </p>
        <p className="mt-4">
          The UI part of every project is just as important, which is why we work with professional designers for branding, visuals, animation and more.
        </p>
      </>
    ),
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "DevOps & Cloud",
    image: "/images/cloud.svg",
    content: (
      <>
        <h3 className="section-title text-2xl">DevOps and Cloud for your business growth.</h3>
        <p className="mt-4">
          Highly skilled team in setting up the entire CI/CD chain.
        </p>
      </>
    ),
  },
];

function ServicesPage() {
  return (
    <>
      <section className="bg-[#1a1a2e] py-20 text-white lg:py-28">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <h1 className="section-title text-4xl lg:text-5xl">Our Services</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Insuring our clients every need is met is a requirement we work on, which is why we offer a various set of solutions.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <Tabs defaultValue="outsourcing" className="w-full">
            <TabsList className="mb-12 flex w-full flex-wrap justify-center gap-2 bg-transparent">
              {serviceTabs.map((s) => (
                <TabsTrigger
                  key={s.id}
                  value={s.id}
                  className="gap-2 rounded-full border border-border px-5 py-2.5 data-[state=active]:border-[#f14836] data-[state=active]:bg-[#f14836] data-[state=active]:text-white"
                >
                  <s.icon className="h-4 w-4" />
                  {s.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {serviceTabs.map((s) => (
              <TabsContent key={s.id} value={s.id}>
                <div className="grid items-center gap-12 lg:grid-cols-2">
                  <div className="rounded-2xl bg-muted p-8">
                    <img src={s.image} alt={s.title} className="w-full rounded-xl object-cover" />
                  </div>
                  <div className="text-lg text-muted-foreground">
                    {s.content}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-[#fff0ee] py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-subtitle">Why Us</span>
            <h2 className="section-title mt-3 text-3xl lg:text-4xl">The reasons to choose us as your business partner</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="section-title text-lg">References</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Digital Squad has collaborated with Morocco’s premier energy and phosphate company, OCP, and redesigned the frontend for CDG Capital’s customer portal.
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="section-title text-lg">Client Centric Approach</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Money is never the top priority. Implementing the entire project from architecture to deployment is what we do best. Client approval and satisfaction is our greatest achievement.
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="section-title text-lg">Transparency</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Without trust, no initiative can succeed. We work on a human scale and in full transparency. A fruitful, long-lasting collaboration is more important than anything else.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
