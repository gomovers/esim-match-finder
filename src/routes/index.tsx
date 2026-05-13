import { createFileRoute } from "@tanstack/react-router";
import App from "../App";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "eSIM Match — Find the Best eSIM for Your Trip" },
      {
        name: "description",
        content:
          "Compare Holafly, Airalo, Nomad, Saily, Ubigi and GigSky in 30 seconds. Save up to 90% vs. carrier roaming.",
      },
      {
        property: "og:title",
        content: "eSIM Match — Find the Best eSIM for Your Trip",
      },
      {
        property: "og:description",
        content:
          "Compare Holafly, Airalo, Nomad, Saily, Ubigi and GigSky in 30 seconds. Save up to 90% vs. carrier roaming.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: App,
});
