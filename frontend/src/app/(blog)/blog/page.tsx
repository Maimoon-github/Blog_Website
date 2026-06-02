"use client";

import React, { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { mockPosts, mockCategories, Post } from "../../../lib/mockData";

function BlogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryQuery = searchParams.get("category") || "all";

  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    let result = mockPosts;
    if (categoryQuery !== "all") {
      result = result.filter((post) => post.category.slug === categoryQuery);
    }
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.name.toLowerCase().includes(query))
      );
    }
    return result;
  }, [categoryQuery, searchQuery]);

  const handleCategorySelect = (slug: string) => {
    if (slug === "all") {
      router.push("/blog");
    } else {
      router.push(`/blog?category=${slug}`);
    }
  };

  return (
    <div className="flex-1 bg-[#131026] py-16 sm:py-24">
      {/* Ambient radial glow */}
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
            Architectural Design &amp;{" "}
            <span className="gradient-text">Romantic Escapes</span>
          </h1>
          <p className="mt-4 text-[#8B65BF]/80">
            Read our latest guides, builder interviews, and hotel recommendations.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="max-w-4xl mx-auto mb-12 space-y-6">
          {/* Search bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles by title, tags, or content…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl px-5 py-4 pl-12 text-sm text-[#E0E0E0] outline-none transition-all duration-200 placeholder:text-[#4E3473]"
              style={{
                background: "#1F1A40",
                border: "1px solid rgba(78,52,115,0.6)",
                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.3)",
              }}
            />
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#4E3473]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.602 10.602z" />
              </svg>
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-4 flex items-center text-xs text-[#8B65BF]/60 hover:text-[#8B65BF] transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => handleCategorySelect("all")}
              className="rounded-full px-5 py-2 text-xs font-semibold tracking-wider transition-all duration-200"
              style={
                categoryQuery === "all"
                  ? { background: "#5F2DA6", color: "#fff", boxShadow: "0 0 14px rgba(95,45,166,0.5)" }
                  : { background: "rgba(31,26,64,0.8)", color: "rgba(224,224,224,0.7)", border: "1px solid rgba(78,52,115,0.5)" }
              }
            >
              All Articles
            </button>
            {mockCategories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleCategorySelect(cat.slug)}
                className="rounded-full px-5 py-2 text-xs font-semibold tracking-wider transition-all duration-200"
                style={
                  categoryQuery === cat.slug
                    ? { background: "#5F2DA6", color: "#fff", boxShadow: "0 0 14px rgba(95,45,166,0.5)" }
                    : { background: "rgba(31,26,64,0.8)", color: "rgba(224,224,224,0.7)", border: "1px solid rgba(78,52,115,0.5)" }
                }
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div
            className="text-center py-24 rounded-3xl max-w-xl mx-auto"
            style={{ background: "#1F1A40", border: "1px solid rgba(78,52,115,0.5)" }}
          >
            <div className="text-5xl mb-4 opacity-40">🪷</div>
            <h3 className="font-sans text-lg font-bold text-[#E0E0E0]">No articles found</h3>
            <p className="text-sm text-[#8B65BF]/70 mt-2 px-6">
              We couldn&apos;t find any posts matching your search. Try adjusting your query or choosing a different category.
            </p>
          </div>
        ) : (
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="flex flex-col items-start justify-between overflow-hidden rounded-2xl hover-lift transition-all duration-300"
                style={{
                  background: "#1F1A40",
                  border: "1px solid rgba(78,52,115,0.5)",
                }}
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    unoptimized
                    className="absolute inset-0 h-full w-full object-cover opacity-80 hover:scale-105 transition-transform duration-500"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to bottom, transparent 50%, #1F1A40 100%)" }}
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-[#8B65BF] tracking-widest uppercase">
                      {post.category.name}
                    </span>
                    <h3 className="mt-2 font-sans text-lg font-bold leading-snug text-[#E0E0E0] hover:text-[#8B65BF] transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="mt-3 text-sm text-[#8B65BF]/70 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                  <div
                    className="mt-6 flex items-center gap-x-3 border-t pt-4"
                    style={{ borderColor: "rgba(78,52,115,0.4)" }}
                  >
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={32}
                      height={32}
                      unoptimized
                      className="h-8 w-8 rounded-full object-cover"
                      style={{ border: "2px solid rgba(95,45,166,0.5)" }}
                    />
                    <div className="text-xs">
                      <p className="font-semibold text-[#E0E0E0]">{post.author.name}</p>
                      <p className="text-[#8B65BF]/60">{post.publishDate} • {post.readTime}</p>
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

export default function BlogPage() {
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
      <BlogContent />
    </Suspense>
  );
}
