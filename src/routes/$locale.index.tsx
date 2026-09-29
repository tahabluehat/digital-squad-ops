import { createFileRoute } from "@tanstack/react-router";
import { LocalizedPage, localizedHead } from "@/components/site/localized-page";

export const Route = createFileRoute("/$locale/")({
  staticData: { sitemap: true },
  head: ({ params }) => localizedHead(params.locale, ""),
  component: () => <LocalizedPage path="" />,
});
