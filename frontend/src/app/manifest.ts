import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Earth & Escape Blog",
    short_name: "EarthEscape",
    description: "A premium lifestyle portal about organic architecture and hot tub hotel getaways.",
    start_url: "/",
    display: "standalone",
    background_color: "#fdfbf7",
    theme_color: "#2d6a4f",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
