import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tva")({
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
    <div className="flex h-[calc(100vh-4rem-1px)] flex-col">
      <iframe
        src="https://calcul-comptable.vercel.app"
        title="TVA Calculator"
        className="w-full flex-1 border-0"
        allow="fullscreen"
      />
    </div>
  );
}
