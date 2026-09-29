import { createFileRoute } from "@tanstack/react-router";
import { posts } from "@/lib/blog-posts";
import { locales } from "@/lib/i18n";

const BASE_URL = "https://digital-squad-ops.lovable.app";

const escape = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[c]!);

function urlEntry(relative: string, priority: string, changefreq: string, lastmod: string) {
  const alternates = [
    ...locales.map((code) => [code, `/${code}${relative}`] as const),
    ["x-default", `/en${relative}`] as const,
  ]
    .map(([code, href]) => `<xhtml:link rel="alternate" hreflang="${code}" href="${escape(BASE_URL + href)}"/>`)
    .join("");
  return locales
    .map(
      (code) =>
        `<url><loc>${escape(`${BASE_URL}/${code}${relative}`)}</loc><lastmod>${lastmod}</lastmod>` +
        `<changefreq>${changefreq}</changefreq><priority>${priority}</priority>${alternates}</url>`,
    )
    .join("");
}

export const Route = createFileRoute("/sitemap.xml")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async () => {
        const lastmod = new Date().toISOString().slice(0, 10);
        const pages: Array<[string, string, string]> = [
          ["", "1.0", "weekly"],
          ["/services", "0.8", "monthly"],
          ["/about", "0.6", "monthly"],
          ["/contact", "0.7", "monthly"],
          ["/blog", "0.8", "weekly"],
          ["/tva", "0.5", "yearly"],
          ...posts.map((post) => [`/blog/${post.slug}`, "0.6", "monthly"] as [string, string, string]),
        ];
        const body =
          `<?xml version="1.0" encoding="UTF-8"?>` +
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">` +
          pages.map(([path, priority, freq]) => urlEntry(path, priority, freq, lastmod)).join("") +
          `</urlset>`;
        return new Response(body, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
