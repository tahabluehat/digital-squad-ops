import { createFileRoute } from "@tanstack/react-router";
import { LocalizedPage, localizedHead } from "@/components/site/localized-page";

export const Route = createFileRoute("/$locale/$")({
  staticData: { sitemap: true },
  head: ({ params }) => localizedHead(params.locale, params._splat ?? ""),
  component: LocaleCatchAll,
});

function LocaleCatchAll() {
  const { _splat } = Route.useParams();
  return <LocalizedPage path={_splat ?? ""} />;
}
