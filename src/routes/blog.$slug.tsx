import { createFileRoute, Link } from "@tanstack/react-router";
import { notFound } from "@tanstack/react-router";
import { posts, type Post } from "@/lib/blog-posts";
import { ArrowLeft, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    const title = post ? `${post.title} — Digital Squad Blog` : "Article not found — Digital Squad";
    const desc = post?.excerpt ?? "This article could not be found.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(post ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  component: BlogDetailPage,
});


function BlogDetailPage() {
  const { post } = Route.useLoaderData() as { post: Post };

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
              <img src={post.image} alt="" width={1280} height={720} className="w-full rounded-2xl object-cover" />
              <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-[#f14836]">{post.category} · {post.readTime}</p>
              <div className="mt-6 max-w-[70ch] space-y-6 text-lg leading-relaxed text-muted-foreground">
                {post.body.map((b, i) =>
                  b.type === "h2" ? <h2 key={i} className="section-title pt-4 text-2xl text-foreground">{b.text}</h2>
                  : b.type === "quote" ? <blockquote key={i} className="border-l-4 border-[#f14836] bg-[#fff0ee] p-6 italic text-foreground">{b.text}</blockquote>
                  : b.type === "ul" ? <ul key={i} className="list-disc space-y-2 pl-6">{b.items.map((it) => <li key={it}>{it}</li>)}</ul>
                  : <p key={i}>{b.text}</p>
                )}
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
