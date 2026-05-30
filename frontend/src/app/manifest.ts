import { MetadataRoute } from "next";

export const dynamic = 'force-static';   // Required for static export with output: 'export'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MaimoonAmin | PorPolio",
    short_name: "PorPolio",
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