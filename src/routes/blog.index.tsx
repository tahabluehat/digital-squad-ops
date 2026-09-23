import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Digital Squad" },
      { name: "description", content: "Read the latest news, insights and updates from Digital Squad." },
      { property: "og:title", content: "Blog — Digital Squad" },
      { property: "og:description", content: "Read the latest news, insights and updates from Digital Squad." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogPage,
});

const posts = [
  {
    slug: "digital-transformation-strategies",
    title: "Digital Transformation Strategies for 2024",
    excerpt: "Explore the key strategies that are driving successful digital transformation across industries this year.",
    image: "/images/news-1.jpg",
  },
  {
    slug: "agile-teams-scale",
    title: "How Agile Teams Scale Effectively",
    excerpt: "Learn how high-performing agile teams maintain velocity while growing in size and complexity.",
    image: "/images/news-2.jpg",
  },
  {
    slug: "cloud-infrastructure-best-practices",
    title: "Cloud Infrastructure Best Practices",
    excerpt: "A practical guide to building secure, scalable and cost-effective cloud infrastructure.",
    image: "/images/news-3.jpg",
  },
];

function BlogPage() {
  return (
    <>
      <section className="bg-[#1a1a2e] py-20 text-white lg:py-28">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <h1 className="section-title text-4xl lg:text-5xl">Our Blog</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">News, insights and updates from Digital Squad.</p>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.slug} className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <img src={post.image} alt={post.title} className="h-48 w-full object-cover" />
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="section-title text-xl">{post.title}</h2>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#f14836] hover:underline"
                  >
                    Read more <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
