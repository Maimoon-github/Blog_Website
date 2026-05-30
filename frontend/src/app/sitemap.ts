import { MetadataRoute } from "next";
import { mockPosts } from "../lib/mockData";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = mockPosts.map((post) => ({
    url: `https://earthandescape.com/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const routes = ["", "/blog", "/about", "/services", "/contact"].map((route) => ({
    url: `https://earthandescape.com${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 1.0,
  }));

  return [...routes, ...posts];
}
