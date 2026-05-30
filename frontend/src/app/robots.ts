import { MetadataRoute } from "next";

export const dynamic = 'force-static';   // Required for static export with output: 'export'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: "https://maimoonamin.com/sitemap.xml",
  };
}