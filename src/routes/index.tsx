import { createFileRoute } from "@tanstack/react-router";
import { CafeSite } from "@/components/CafeSite";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ember & Bean | Café • Bistro • Good Vibes" },
      {
        name: "description",
        content:
          "Ember & Bean is a warm, modern café in Bengaluru serving specialty coffee, fresh food and memorable moments.",
      },
      { property: "og:title", content: "Ember & Bean | Café • Bistro • Good Vibes" },
      {
        property: "og:description",
        content:
          "A warm, modern café in Bengaluru serving specialty coffee, fresh food and memorable moments.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: CafeSite,
});