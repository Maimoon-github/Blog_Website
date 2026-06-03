import { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/api";

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const postsResponse = await getBlogPosts({ limit: 1000 }).catch(() => ({ results: [] }));
  
  const posts = postsResponse.results.map((post) => ({
    url: `https://earthandescape.com/blog/${post.slug}`,
    lastModified: new Date(post.last_published_at || Date.now()),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const routes = ["", "/blog", "/about", "/services", "/contact", "/categories", "/authors"].map((route) => ({
    url: `https://earthandescape.com${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 1.0,
  }));

  return [...routes, ...posts];
}