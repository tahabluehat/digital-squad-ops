import { createFileRoute, Link } from "@tanstack/react-router";
import { notFound } from "@tanstack/react-router";
import { ArrowLeft, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())} — Digital Squad Blog` },
      { name: "description", content: "Read this article on the Digital Squad blog." },
      { property: "og:title", content: `${params.slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())} — Digital Squad Blog` },
      { property: "og:description", content: "Read this article on the Digital Squad blog." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  component: BlogDetailPage,
});

const posts = [
  {
    slug: "digital-transformation-strategies",
    title: "Digital Transformation Strategies for 2024",
    image: "/images/news-1.jpg",
  },
  {
    slug: "agile-teams-scale",
    title: "How Agile Teams Scale Effectively",
    image: "/images/news-2.jpg",
  },
  {
    slug: "cloud-infrastructure-best-practices",
    title: "Cloud Infrastructure Best Practices",
    image: "/images/news-3.jpg",
  },
];

function BlogDetailPage() {
  const { post } = Route.useLoaderData();

  return (
    <>
      <section className="relative bg-[#1a1a2e] py-24 text-white lg:py-32">
        <div className="absolute inset-0 opacity-30">
          <img src="/images/page-banner-1.jpg" alt="" className="h-full w-full object-cover" />
        </div>
        <div className="container relative mx-auto px-4 lg:px-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back to blog
          </Link>
          <h1 className="section-title mt-6 max-w-3xl text-3xl lg:text-5xl">{post.title}</h1>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <article className="lg:col-span-2">
              <img src={post.image} alt={post.title} className="w-full rounded-2xl object-cover" />
              <div className="prose prose-lg mt-10 max-w-none text-muted-foreground">
                <p>
                  There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn’t anything embarrassing hidden in the middle of text.
                </p>
                <blockquote className="border-l-4 border-[#f14836] bg-[#fff0ee] p-6 italic text-foreground">
                  “There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words.”
                </blockquote>
                <p>
                  There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly believable.
                </p>
                <ul className="list-disc pl-6">
                  <li>There are many variations of passages of Lorem Ipsum available.</li>
                  <li>Alteration in some form, by injected humour or randomised words.</li>
                  <li>Passage of Lorem Ipsum, you need to be sure there isn’t anything hidden.</li>
                  <li>There are many variations of passages of Lorem Ipsum available.</li>
                </ul>
              </div>

              <div className="mt-12 flex items-center gap-4">
                <span className="font-semibold text-foreground">Share:</span>
                <div className="flex gap-2">
                  <a href="#" aria-label="Facebook" className="rounded-full bg-[#4267B2] p-2 text-white"><Facebook className="h-4 w-4" /></a>
                  <a href="#" aria-label="Twitter" className="rounded-full bg-[#1DA1F2] p-2 text-white"><Twitter className="h-4 w-4" /></a>
                  <a href="#" aria-label="Instagram" className="rounded-full bg-[#E1306C] p-2 text-white"><Instagram className="h-4 w-4" /></a>
                  <a href="#" aria-label="LinkedIn" className="rounded-full bg-[#0077B5] p-2 text-white"><Linkedin className="h-4 w-4" /></a>
                </div>
              </div>
            </article>

            <aside className="space-y-8">
              <div className="rounded-2xl border border-border p-6">
                <h3 className="section-title text-xl">Categories</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li><Link to="/blog" className="hover:text-[#f14836]">All Items</Link></li>
                  <li><Link to="/blog" className="hover:text-[#f14836]">Strategy</Link></li>
                  <li><Link to="/blog" className="hover:text-[#f14836]">Agile</Link></li>
                  <li><Link to="/blog" className="hover:text-[#f14836]">Cloud</Link></li>
                </ul>
              </div>
              <div className="rounded-2xl border border-border p-6">
                <h3 className="section-title text-xl">Popular Tags</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Design", "DevOps", "Agile", "Cloud", "Startup", "UX"].map((tag) => (
                    <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
