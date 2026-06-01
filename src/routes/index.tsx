import { createFileRoute } from "@tanstack/react-router";
import App from "../App";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "eSIM Match — Find the Best eSIM for Your Trip" },
      { name: "description", content: "Compare Holafly, Airalo, Nomad, Saily, Ubigi and GigSky in 30 seconds. Save up to 90% vs. carrier roaming." },
      { property: "og:title", content: "eSIM Match — Find the Best eSIM for Your Trip" },
      { property: "og:description", content: "Compare Holafly, Airalo, Nomad, Saily, Ubigi and GigSky in 30 seconds. Save up to 90% vs. carrier roaming." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://esimfinder.com.au/" },
      { property: "og:site_name", content: "eSIM Match" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "eSIM Match — Find the Best eSIM for Your Trip" },
      { name: "twitter:description", content: "Compare Holafly, Airalo, Nomad, Saily, Ubigi and GigSky in 30 seconds. Save up to 90% vs. carrier roaming." },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/77c9eaee-8ae9-49dd-9e93-086f51badaee/id-preview-86cf30fe--2ccc05ce-9a37-4547-8550-85212b9f3228.lovable.app-1778644419773.png" },
    ],
    links: [
      { rel: "canonical", href: "https://esimfinder.com.au/" },
    ],
  }),
  component: App,
});
