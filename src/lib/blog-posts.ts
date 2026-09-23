import transformation from "@/assets/blog-transformation.jpg";
import agile from "@/assets/blog-agile.jpg";
import cloud from "@/assets/blog-cloud.jpg";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "ul"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "digital-transformation-strategies",
    title: "Digital Transformation Strategies That Actually Deliver",
    excerpt: "Transformation is less about technology and more about focus. Here is how to pick the right priorities and show progress early.",
    image: transformation,
    category: "Strategy",
    readTime: "5 min read",
    body: [
      { type: "p", text: "Many transformation programmes start with a long list of tools and platforms. The ones that succeed start with a short list of business problems. Before choosing any technology, agree on which outcomes matter most: faster sales cycles, fewer manual steps, better visibility for customers." },
      { type: "h2", text: "Start with one process, not the whole company" },
      { type: "p", text: "Pick a single process that is painful, visible and measurable. Map how it works today, talk to the people who run it, and design the simplest digital version that removes the biggest friction. A focused first release builds trust faster than a large plan." },
      { type: "quote", text: "The best roadmap is the one your teams can see moving every two weeks." },
      { type: "h2", text: "Make progress visible" },
      { type: "ul", items: ["Ship small, usable increments instead of one big launch.", "Review working software with real users at every step.", "Keep a shared backlog so business and tech teams see the same priorities.", "Measure adoption, not just delivery."] },
      { type: "p", text: "Transformation is a habit, not a project. Once the first process works well, the same approach can be repeated across teams with much less risk." },
    ],
  },
  {
    slug: "agile-teams-scale",
    title: "How Agile Teams Scale Without Slowing Down",
    excerpt: "Adding people does not automatically add speed. These practices help growing teams keep their momentum.",
    image: agile,
    category: "Agile",
    readTime: "4 min read",
    body: [
      { type: "p", text: "Small agile teams move quickly because communication is easy. As a team grows, coordination becomes the real work. Scaling well means protecting that simplicity while the number of people increases." },
      { type: "h2", text: "Keep teams small and autonomous" },
      { type: "p", text: "Rather than one large team, create several small teams that each own a clear part of the product. Each team should be able to design, build, test and release its work without waiting on others." },
      { type: "quote", text: "Scale the number of teams, not the size of each team." },
      { type: "h2", text: "Practices that help" },
      { type: "ul", items: ["A single product vision shared by every team.", "Clear ownership of each part of the system.", "Automated tests and deployments to reduce hand-offs.", "Regular joint demos so everyone sees the whole product."] },
      { type: "p", text: "When extending a team with external engineers, the same rules apply: integrate them into your rituals and tools from day one so they contribute as full members, not as a separate group." },
    ],
  },
  {
    slug: "cloud-infrastructure-best-practices",
    title: "Cloud Infrastructure Best Practices",
    excerpt: "A practical guide to building cloud platforms that are secure, reliable and cost-aware from the start.",
    image: cloud,
    category: "Cloud",
    readTime: "6 min read",
    body: [
      { type: "p", text: "Moving to the cloud gives teams speed and flexibility, but without clear foundations it can also bring surprise costs and security gaps. A few early decisions make a big difference." },
      { type: "h2", text: "Define everything as code" },
      { type: "p", text: "Describe your infrastructure in version-controlled files. Environments become reproducible, changes are reviewed like application code, and recovering from mistakes is much simpler." },
      { type: "h2", text: "Security and cost from day one" },
      { type: "ul", items: ["Grant the minimum permissions each service needs.", "Keep secrets in a dedicated secrets manager, never in code.", "Tag resources by team and project to track spending.", "Set budgets and alerts before usage grows."] },
      { type: "quote", text: "Reliability is designed in, not added after the first outage." },
      { type: "p", text: "Finally, invest in monitoring and clear alerts. Knowing how your platform behaves in production is what lets teams improve it with confidence." },
    ],
  },
];
