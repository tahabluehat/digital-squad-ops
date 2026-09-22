import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Play } from "lucide-react";
import { Container, SectionHeading, buttonStyles } from "@/components/site/primitives";
import { ContactSection, INTEREST_EVENT } from "@/components/site/contact-section";
import presentationCover from "@/assets/digitalsquad-presentation.jpg";

const TITLE = "DigitalSquad | Software Engineering & Consulting";
const DESCRIPTION =
  "Senior engineers, product designers, and delivery specialists helping teams build, improve, and scale software.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const services = [
  {
    title: "Build your product",
    outcome: "Turn a product idea or roadmap into working software.",
    capabilities: ["Product and UX design", "Frontend and backend engineering", "Testing and QA"],
    cta: "Discuss a product",
    interest: "Build your product",
  },
  {
    title: "Extend your team",
    outcome: "Bring experienced specialists into your existing engineering team.",
    capabilities: [
      "Software engineers and tech leads",
      "Product designers and business analysts",
      "Agile coaching and delivery support",
    ],
    cta: "Discuss team support",
    interest: "Extend your team",
  },
  {
    title: "Improve your platform",
    outcome: "Identify technical friction and plan the next improvements.",
    capabilities: [
      "Code and architecture audits",
      "Modernisation and refactoring",
      "DevOps, CI/CD, and cloud",
    ],
    cta: "Discuss your platform",
    interest: "Improve your platform",
  },
];

const references = [
  { name: "CDG Capital", src: "/images/brand-1.png" },
  { name: "Intelcia", src: "/images/brand-2.png" },
  { name: "Docaposte", src: "/images/brand-3.png" },
  { name: "Omnia Academy", src: "/images/brand-4.png" },
];

const steps = [
  {
    title: "Align on the need",
    body: "We start with a short discovery conversation to understand the goal, the constraints, and what a good outcome looks like. Scope and responsibilities are agreed in writing before work begins.",
  },
  {
    title: "Build together",
    body: "Our engineers work in your rhythm — short iterations, a shared backlog, and regular demos. You see progress continuously rather than at the end.",
  },
  {
    title: "Review and hand over",
    body: "Code, documentation, and environments stay with you. We review what shipped, capture the remaining risks, and agree the next step together.",
  },
];

const faqs = [
  {
    q: "Can you join an existing engineering team?",
    a: "Yes. We regularly embed engineers and delivery specialists into in-house teams, working with your tools, processes, and code review standards.",
  },
  {
    q: "Can you work on an existing codebase?",
    a: "Yes. We usually start with a short review of the code, architecture, and delivery setup, then propose improvements in priority order.",
  },
  {
    q: "How do we start a discussion?",
    a: "Send a short note about your goal or challenge through the form below, or email us directly. We'll reply with questions and suggest a call.",
  },
];

function selectInterest(interest: string) {
  window.dispatchEvent(new CustomEvent(INTEREST_EVENT, { detail: interest }));
}

function HeroVisual() {
  return (
    <a
      href="https://www.youtube.com/watch?v=iRzLFHrvc7U"
      target="_blank"
      rel="noreferrer"
      aria-label="Watch the DigitalSquad presentation on YouTube"
      className="group relative block aspect-video w-full overflow-hidden rounded-[var(--ds-radius-card)] border bg-[var(--ds-navy)] shadow-[var(--ds-shadow-md)]"
      style={{ borderColor: "var(--ds-border)" }}
    >
      <img
        src={presentationCover}
        alt="DigitalSquad presentation featuring a team member speaking"
        width={1280}
        height={720}
        fetchPriority="high"
        className="h-full w-full object-cover transition-transform duration-[var(--ds-duration-normal)] ease-[var(--ds-ease)] group-hover:scale-[1.015]"
      />
      <span className="absolute inset-0 bg-[color-mix(in_srgb,var(--ds-navy)_18%,transparent)] transition-colors duration-[var(--ds-duration-normal)] group-hover:bg-[color-mix(in_srgb,var(--ds-navy)_28%,transparent)]" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--ds-brand)] text-[var(--ds-inverse-on-primary)] shadow-[var(--ds-shadow-md)] transition-transform duration-[var(--ds-duration-normal)] group-hover:scale-105 group-active:scale-95">
          <Play className="h-7 w-7 translate-x-0.5 fill-current" aria-hidden="true" />
        </span>
      </span>
      <span className="absolute bottom-4 left-4 rounded-[var(--ds-radius-control)] bg-[var(--ds-navy)] px-4 py-2 text-sm font-semibold text-[var(--ds-inverse-text)]">
        Watch our presentation
      </span>
    </a>
  );
}

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="ds-section" style={{ backgroundColor: "var(--ds-background)" }}>
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="ds-eyebrow">Software engineering &amp; consulting</p>
              <h1 className="ds-display mt-4 text-balance">Senior engineers. Stronger products.</h1>
              <p className="ds-lead ds-measure mt-6">
                DigitalSquad helps businesses build, improve, and scale software with experienced
                engineers, product designers, and delivery specialists.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/" hash="contact" className={buttonStyles.primary}>
                  Discuss your project
                </Link>
                <Link to="/" hash="services" className={buttonStyles.secondary}>
                  Explore our expertise
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5">
              <HeroVisual />
            </div>
          </div>
        </Container>
      </section>

      {/* Credibility */}
      <section className="border-y py-10" style={{ borderColor: "var(--ds-border)" }}>
        <Container>
          <p className="text-sm font-semibold text-[var(--ds-text-secondary)]">
            Teams we have delivered software for
          </p>
          <ul className="mt-6 flex flex-wrap items-center gap-x-12 gap-y-6">
            {references.map((ref) => (
              <li key={ref.name}>
                <img
                  src={ref.src}
                  alt={ref.name}
                  width={140}
                  height={48}
                  loading="lazy"
                  className="h-10 w-auto object-contain"
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Services */}
      <section id="services" className="ds-section scroll-mt-24">
        <Container>
          <SectionHeading
            eyebrow="Ways to work together"
            title="The right support for your next step."
            description="Three clear ways to engage, depending on whether you need a product built, more capacity, or a clearer technical path."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="flex flex-col rounded-[var(--ds-radius-card)] border bg-white p-6 lg:p-8"
                style={{ borderColor: "var(--ds-border)", boxShadow: "var(--ds-shadow-sm)" }}
              >
                <h3 className="ds-subheading">{service.title}</h3>
                <p className="mt-3 text-[var(--ds-text-secondary)]">{service.outcome}</p>
                <ul className="mt-6 flex-1 space-y-3 text-sm">
                  {service.capabilities.map((capability) => (
                    <li key={capability} className="flex items-start gap-3">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0"
                        style={{ color: "var(--ds-brand)" }}
                        aria-hidden="true"
                      />
                      <span>{capability}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/"
                  hash="contact"
                  onClick={() => selectInterest(service.interest)}
                  className="mt-8 inline-flex items-center gap-2 text-[0.9375rem] font-semibold underline underline-offset-4"
                  style={{ color: "var(--ds-link)" }}
                >
                  {service.cta}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Work */}
      <section
        id="work"
        className="ds-section scroll-mt-24"
        style={{ backgroundColor: "var(--ds-surface-subtle)" }}
      >
        <Container>
          <SectionHeading
            eyebrow="Selected work"
            title="Engineering that fits the business context."
            description="A short view of engagements our team has delivered. Details are kept to what we can describe accurately."
          />
          <div className="mt-12 space-y-8">
            <article
              className="grid gap-6 rounded-[var(--ds-radius-card)] border bg-white p-6 lg:grid-cols-3 lg:p-8"
              style={{ borderColor: "var(--ds-border)" }}
            >
              <h3 className="ds-subheading">CDG Capital</h3>
              <div className="lg:col-span-2 space-y-4 text-[var(--ds-text-secondary)]">
                <p>
                  <span className="font-semibold text-[var(--ds-text)]">Context.</span> A financial
                  institution modernising internal business applications.
                </p>
                <p>
                  <span className="font-semibold text-[var(--ds-text)]">Our contribution.</span>{" "}
                  DigitalSquad engineers worked alongside the internal team on application
                  development and delivery practices.
                </p>
              </div>
            </article>
            <article
              className="grid gap-6 rounded-[var(--ds-radius-card)] border bg-white p-6 lg:grid-cols-3 lg:p-8"
              style={{ borderColor: "var(--ds-border)" }}
            >
              <h3 className="ds-subheading">OCP</h3>
              <div className="lg:col-span-2 space-y-4 text-[var(--ds-text-secondary)]">
                <p>
                  <span className="font-semibold text-[var(--ds-text)]">Context.</span> A large
                  industrial group running digital programmes across multiple sites.
                </p>
                <p>
                  <span className="font-semibold text-[var(--ds-text)]">Our contribution.</span>{" "}
                  Engineering and delivery support on digital applications within the wider
                  programme.
                </p>
              </div>
            </article>
          </div>
        </Container>
      </section>

      {/* Approach */}
      <section id="approach" className="ds-section scroll-mt-24">
        <Container>
          <SectionHeading
            eyebrow="How we work"
            title="Clear priorities. Visible progress."
            description="A simple way of working that keeps scope, collaboration, and delivery visible from the first conversation."
          />
          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title}>
                <span
                  className="font-display text-sm font-bold"
                  style={{ color: "var(--ds-brand)" }}
                >
                  0{index + 1}
                </span>
                <h3 className="ds-subheading mt-2">{step.title}</h3>
                <p className="mt-3 text-[var(--ds-text-secondary)]">{step.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {faqs.map((faq) => (
              <div key={faq.q}>
                <h3 className="font-display text-base font-semibold">{faq.q}</h3>
                <p className="mt-2 text-[var(--ds-text-secondary)]">{faq.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ContactSection />
    </>
  );
}
