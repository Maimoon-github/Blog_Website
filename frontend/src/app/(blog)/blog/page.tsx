import React, { Suspense } from "react";
import { Metadata } from "next";
import { getBlogPosts, getCategories } from "@/lib/api";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Blog | Earthen Homes",
  description: "Read our latest guides, builder interviews, and hotel recommendations.",
};

interface BlogPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
    page?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const category = params.category || undefined;
  const search = params.search || undefined;
  const page = params.page ? parseInt(params.page) : 1;

  // Fetch data in parallel
  const [postsResponse, categoriesResponse] = await Promise.all([
    getBlogPosts({ category, search, page }).catch(() => ({ results: [], count: 0, next: null, previous: null })),
    getCategories().catch(() => ({ results: [] })),
  ]);

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#131026]">
          <div
            className="h-12 w-12 animate-spin rounded-full"
            style={{
              border: "3px solid rgba(78,52,115,0.4)",
              borderTopColor: "#5F2DA6",
              boxShadow: "0 0 16px rgba(95,45,166,0.3)",
            }}
          />
        </div>
      }
    >
      <BlogContent
        initialPosts={postsResponse.results}
        categories={categoriesResponse.results}
        totalCount={postsResponse.count}
        currentPage={page}
      />
    </Suspense>
  );
}
