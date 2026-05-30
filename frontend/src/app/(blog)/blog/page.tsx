"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { mockPosts, mockCategories, Post } from "../../../lib/mockData";

function BlogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryQuery = searchParams.get("category") || "all";
  
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(mockPosts);

  useEffect(() => {
    let result = mockPosts;

    // 1. Filter by category
    if (categoryQuery !== "all") {
      result = result.filter((post) => post.category.slug === categoryQuery);
    }

    // 2. Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.name.toLowerCase().includes(query))
      );
    }

    setFilteredPosts(result);
  }, [categoryQuery, searchQuery]);

  const handleCategorySelect = (slug: string) => {
    if (slug === "all") {
      router.push("/blog");
    } else {
      router.push(`/blog?category=${slug}`);
    }
  };

  return (
    <div className="flex-1 bg-stone-50 dark:bg-stone-950 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="mx-auto max-w-2xl text-center mb-12">
          <span className="text-sm font-semibold tracking-wider uppercase text-earth-gold">
            The Journal
          </span>
          <h1 className="font-serif text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white sm:text-5xl mt-2">
            Architectural Design &amp; Romantic Escapes
          </h1>
          <p className="mt-4 text-stone-600 dark:text-stone-400">
            Read our latest guides, builder interviews, and hotel recommendations.
          </p>
        </div>

        {/* Search and Filter Area */}
        <div className="max-w-4xl mx-auto mb-12 space-y-6">
          {/* Search bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles by title, tags, or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-stone-200 bg-white px-5 py-4 pl-12 text-sm text-stone-900 shadow-sm focus:border-earth-forest focus:ring-1 focus:ring-earth-forest dark:border-stone-800 dark:bg-stone-900 dark:text-white"
            />
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-stone-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.602 10.602z" />
              </svg>
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-4 flex items-center text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => handleCategorySelect("all")}
              className={`rounded-full px-5 py-2 text-xs font-semibold tracking-wider transition ${
                categoryQuery === "all"
                  ? "bg-earth-forest text-white shadow-md"
                  : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 dark:bg-stone-900 dark:border-stone-850 dark:text-stone-300 dark:hover:bg-stone-800"
              }`}
            >
              All Articles
            </button>
            {mockCategories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleCategorySelect(cat.slug)}
                className={`rounded-full px-5 py-2 text-xs font-semibold tracking-wider transition ${
                  categoryQuery === cat.slug
                    ? "bg-earth-forest text-white shadow-md"
                    : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 dark:bg-stone-900 dark:border-stone-850 dark:text-stone-300 dark:hover:bg-stone-800"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-24 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/50 dark:border-stone-850 shadow-sm max-w-xl mx-auto">
            <svg xmlns="http://www.w3.org/2500/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-stone-300 dark:text-stone-700 mx-auto mb-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white">No articles found</h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-2 px-6">
              We couldn&apos;t find any posts matching your search criteria. Try adjusting your search query or choosing a different category.
            </p>
          </div>
        ) : (
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="flex flex-col items-start justify-between bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-stone-200/50 dark:border-stone-850 hover-lift shadow-sm"
              >
                <div className="relative w-full h-48">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-earth-forest dark:text-earth-gold tracking-widest uppercase">
                      {post.category.name}
                    </span>
                    <h3 className="mt-2 font-serif text-lg font-bold leading-snug text-stone-900 dark:text-white hover:text-earth-forest dark:hover:text-earth-gold transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="mt-3 text-sm text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-x-3 border-t border-stone-100 dark:border-stone-800 pt-4">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <div className="text-xs">
                      <p className="font-semibold text-stone-900 dark:text-white">
                        {post.author.name}
                      </p>
                      <p className="text-stone-500">{post.publishDate} • {post.readTime}</p>
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
    <Suspense fallback={
      <div className="flex min-h-screen flex-col items-center justify-center bg-stone-50/50 dark:bg-stone-950/50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-stone-200 border-t-earth-gold dark:border-stone-850 dark:border-t-earth-gold"></div>
      </div>
    }>
      <BlogContent />
    </Suspense>
  );
}
