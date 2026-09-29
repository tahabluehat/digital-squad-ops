import { createFileRoute } from "@tanstack/react-router";
import { getRouterInstance } from "@tanstack/react-start";
import { sitemapStaticPaths, sitemapXML, type SitemapEntry } from "@/lib/sitemap";
import { posts } from "@/lib/blog-posts";
import { locales } from "@/lib/i18n";

const BASE_URL = "https://digital-squad-ops.lovable.app";

export const Route = createFileRoute("/sitemap.xml")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async () => {
        const router = await getRouterInstance();
        const entries: SitemapEntry[] = sitemapStaticPaths(router).map((path) => ({ path }));
        for (const locale of locales) {
          entries.push({ path: `/${locale}` }, { path: `/${locale}/blog` });
          for (const page of ["about", "services", "contact", "tva"]) entries.push({ path: `/${locale}/${page}` });
          for (const post of posts) {
            entries.push({ path: `/${locale}/blog/${post.slug}` });
          }
        }
        return new Response(sitemapXML(BASE_URL, entries), {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
