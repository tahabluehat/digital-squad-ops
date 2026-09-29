import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/$slug")({
  staticData: { sitemap: false },
  component: LegacyBlogRedirect,
});

function LegacyBlogRedirect() {
  const { slug } = Route.useParams();
  return <Navigate to="/$locale/$" params={{ locale: "en", _splat: `blog/${slug}` }} replace />;
}
