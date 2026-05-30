import { NextResponse } from "next/server";
import { mockPosts } from "../../../lib/mockData";

export async function GET() {
  const feedItems = mockPosts
    .map(
      (post) => `
    <item>
      <title>${post.title}</title>
      <link>https://earthandescape.com/blog/${post.slug}</link>
      <description>${post.excerpt}</description>
      <pubDate>${post.publishDate}</pubDate>
    </item>`
    )
    .join("");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Earth &amp; Escape Blog</title>
    <link>https://earthandescape.com</link>
    <description>A premium lifestyle portal about organic architecture and hot tub hotel getaways.</description>
    ${feedItems}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
