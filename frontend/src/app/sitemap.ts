import { MetadataRoute } from "next";
import { mockPosts } from "../lib/mockData";

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = mockPosts.map((post) => ({
    url: `https://maimoonamin.com/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const routes = ["", "/blog", "/about", "/services", "/contact"].map((route) => ({
    url: `https://maimoonamin.com${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 1.0,
  }));

  return [...routes, ...posts];
}