import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SCCS Course Planner",
    short_name: "Planner",
    id: "sccs_plan",
    categories: ["education", "productivity", "utilities"],
    description: "Plan and track your classes with the SCCS Class Planner",
    dir: "auto",
    lang: "en-US",
    start_url: "/",
    display: "standalone",
    orientation: "any",
    display_override: ["fullscreen", "minimal-ui"],
    background_color: "#141C2A",
    theme_color: "#141C2A",
    icons: [
      {
        src: "favicon.ico",
        sizes: "32x32",
        type: "image/x-icon",
        purpose: "any",
      },
      {
        src: "logo.svg",
        sizes: "any",
        type: "image/svg",
        purpose: "any",
      },
      {
        src: "icon.png",
        sizes: "2048x2048",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "icon-maskable.png",
        sizes: "2048x2048",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "opengraph-image.png",
        sizes: "1200x630",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "twitter-image.png",
        sizes: "1600x900",
        type: "image/png",
        purpose: "any",
      },
    ],
    screenshots: [
      {
        src: "screenshot-wide.png",
        sizes: "2363x1267",
        type: "image/png",
        form_factor: "wide",
      },
      {
        src: "screenshot-narrow.png",
        sizes: "563x999",
        type: "image/png",
        form_factor: "narrow",
      },
    ],
  };
}
