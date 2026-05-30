import { NextResponse } from "next/server";
import { mockPosts } from "../../../lib/mockData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  if (!query) {
    return NextResponse.json([]);
  }

  const lowerQuery = query.toLowerCase();
  const results = mockPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.tags.some((t) => t.name.toLowerCase().includes(lowerQuery)) ||
      post.category.name.toLowerCase().includes(lowerQuery)
  );

  return NextResponse.json(results);
}
