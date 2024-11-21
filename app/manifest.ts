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
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
        purpose: "any",
      },
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/x-icon",
        purpose: "any",
      },
    ],
    screenshots: [
      {
        src: "/screenshot-wide.jpeg",
        sizes: "2363x1267",
        type: "image/jpg",
        form_factor: "wide",
      },
      {
        src: "/screenshot-narrow.jpeg",
        sizes: "621x1335",
        type: "image/jpg",
        form_factor: "narrow",
      },
    ],
  };
}
