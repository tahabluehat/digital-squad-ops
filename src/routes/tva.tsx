import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tva")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "TVA Calculator — Digital Squad" },
      { name: "description", content: "Calculate TVA easily with our embedded calculator." },
      { property: "og:title", content: "TVA Calculator — Digital Squad" },
      { property: "og:description", content: "Calculate TVA easily with our embedded calculator." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TvaPage,
});

function TvaPage() {
  return (
    <div className="flex flex-col">
      <div className="ds-container py-10">
        <h1 className="ds-heading">TVA calculator for Moroccan businesses</h1>
        <p className="ds-lead ds-measure mt-3">
          Enter an amount excluding or including tax and pick the TVA rate to instantly get the
          net amount, the tax and the total. Use it to check quotes and invoices in seconds.
        </p>
      </div>
      <iframe
        src="https://calcul-comptable.vercel.app"
        title="TVA Calculator"
        className="h-[80vh] w-full border-0"
        allow="fullscreen"
      />
    </div>
  );
}
