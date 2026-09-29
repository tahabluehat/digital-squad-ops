import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { isLocale } from "@/lib/i18n";

export const Route = createFileRoute("/$locale")({
  staticData: { sitemap: false },
  beforeLoad: ({ params }) => {
    if (!isLocale(params.locale)) throw redirect({ to: "/en" as never });
  },
  component: LocaleLayout,
});

function LocaleLayout() {
  return <Outlet />;
}
