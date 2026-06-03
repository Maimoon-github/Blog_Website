import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getBlogList, getCategories } from "@/lib/api";
import type { BlogPostListItem, Category } from "@/types/blog";

export const revalidate = 60; // ISR: revalidate every 60 seconds

interface BlogPageProps {
  searchParams: Promise<{ category?: string; page?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category, page } = await searchParams;

  let posts: BlogPostListItem[] = [];
  let categories: Category[] = [];
  let totalCount = 0;
  let error: string | null = null;

  try {
    const [blogData, catData] = await Promise.all([
      getBlogList({
        category: category,
        page: page ? Number(page) : 1,
      }),
      getCategories(),
    ]);
    posts = blogData.results;
    totalCount = blogData.count;
    categories = catData;
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load posts.";
  }

  return (
    <div className="flex-1 bg-[#131026] py-16 sm:py-24">
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% 0%, rgba(95,45,166,0.2) 0%, transparent 65%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-12">
          <span className="text-sm font-semibold tracking-wider uppercase text-[#8B65BF]">
            ✦ The Journal
          </span>
          <h1 className="font-sans text-4xl font-extrabold tracking-tight text-[#E0E0E0] sm:text-5xl mt-2">
            Explore Our{" "}
            <span style={{ color: "#8B65BF" }}>Blog</span>
          </h1>
          <p className="mt-4 text-[#8B65BF]/80">
            {totalCount > 0 ? `${totalCount} articles and counting.` : "Read our latest guides and insights."}
          </p>
        </div>

        {/* Category Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              href="/blog"
              className="rounded-full px-5 py-2 text-xs font-semibold tracking-wider transition-all duration-200"
              style={
                !category
                  ? { background: "#5F2DA6", color: "#fff" }
                  : { background: "rgba(31,26,64,0.8)", color: "rgba(224,224,224,0.7)", border: "1px solid rgba(78,52,115,0.5)" }
              }
            >
              All Articles
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog?category=${cat.slug}`}
                className="rounded-full px-5 py-2 text-xs font-semibold tracking-wider transition-all duration-200"
                style={
                  category === cat.slug
                    ? { background: "#5F2DA6", color: "#fff" }
                    : { background: "rgba(31,26,64,0.8)", color: "rgba(224,224,224,0.7)", border: "1px solid rgba(78,52,115,0.5)" }
                }
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-16 text-red-400">
            <p className="font-semibold">Could not load posts</p>
            <p className="text-sm mt-1 opacity-70">{error}</p>
            <p className="text-xs mt-3 opacity-50">
              Make sure the Django server is running at{" "}
              {process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}
            </p>
          </div>
        )}

        {/* Empty State */}
        {!error && posts.length === 0 && (
          <div
            className="text-center py-24 rounded-3xl max-w-xl mx-auto"
            style={{ background: "#1F1A40", border: "1px solid rgba(78,52,115,0.5)" }}
          >
            <div className="text-5xl mb-4 opacity-40">📝</div>
            <h3 className="font-sans text-lg font-bold text-[#E0E0E0]">No articles yet</h3>
            <p className="text-sm text-[#8B65BF]/70 mt-2 px-6">
              Create and publish blog posts in the{" "}
              <a href="http://localhost:8000/admin" className="underline">Wagtail Admin</a>.
            </p>
          </div>
        )}

        {/* Posts Grid */}
        {posts.length > 0 && (
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="flex flex-col items-start justify-between overflow-hidden rounded-2xl transition-all duration-300"
                style={{ background: "#1F1A40", border: "1px solid rgba(78,52,115,0.5)" }}
              >
                {post.hero_image_url && (
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={post.hero_image_url}
                      alt={post.title}
                      fill
                      className="object-cover opacity-80 hover:scale-105 transition-transform duration-500"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to bottom, transparent 50%, #1F1A40 100%)" }}
                    />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {post.categories[0] && (
                      <span className="text-xs font-semibold text-[#8B65BF] tracking-widest uppercase">
                        {post.categories[0].name}
                      </span>
                    )}
                    <h3 className="mt-2 font-sans text-lg font-bold leading-snug text-[#E0E0E0] hover:text-[#8B65BF] transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="mt-3 text-sm text-[#8B65BF]/70 line-clamp-3 leading-relaxed">
                      {post.intro}
                    </p>
                  </div>
                  <div
                    className="mt-6 flex items-center gap-x-3 border-t pt-4"
                    style={{ borderColor: "rgba(78,52,115,0.4)" }}
                  >
                    <div className="text-xs">
                      {post.author_name && (
                        <p className="font-semibold text-[#E0E0E0]">{post.author_name}</p>
                      )}
                      <p className="text-[#8B65BF]/60">
                        {new Date(post.published_at).toLocaleDateString("en-US", {
                          year: "numeric", month: "short", day: "numeric",
                        })}{" "}
                        · {post.reading_time_minutes} min read
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
