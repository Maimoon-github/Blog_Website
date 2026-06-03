"use client";

import React, { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { mockPosts, Post } from "../../../lib/mockData";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";
  
  const [query, setQuery] = useState(initialQuery);
  const results = useMemo(() => {
    if (query.trim() === "") {
      return [] as Post[];
    }

    const lowerQuery = query.toLowerCase();
    return mockPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.excerpt.toLowerCase().includes(lowerQuery) ||
        post.tags.some((t) => t.name.toLowerCase().includes(lowerQuery)) ||
        post.category.name.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="flex-1 bg-stone-50 dark:bg-stone-950 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-12">
          <span className="text-sm font-semibold tracking-wider uppercase text-earth-gold">
            Search Portal
          </span>
          <h1 className="font-serif text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white sm:text-4xl mt-2">
            Search Our Publications
          </h1>
        </div>

        {/* Search input form */}
        <form onSubmit={handleSearchSubmit} className="relative mb-12">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your search query (e.g. Cob, Jacuzzi, Thermal...)"
            className="w-full rounded-2xl border border-stone-200 bg-white px-5 py-4 pl-12 text-sm text-stone-900 shadow-md focus:border-earth-forest focus:ring-1 focus:ring-earth-forest dark:border-stone-800 dark:bg-stone-900 dark:text-white"
          />
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-stone-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.602 10.602z" />
            </svg>
          </div>
        </form>

        {/* Results List */}
        <div>
          <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-white mb-6">
            Search Results {query && `for "${query}"`} ({results.length})
          </h2>

          {query.trim() === "" ? (
            <p className="text-sm text-stone-500 dark:text-stone-400">Please enter a keyword to begin searching.</p>
          ) : results.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/50 dark:border-stone-850 p-8 shadow-sm">
              <p className="text-sm text-stone-500 dark:text-stone-400">
                No matching articles found. Try using different keywords like &quot;Cob&quot;, &quot;Rammed Earth&quot;, or &quot;Hot Tub&quot;.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {results.map((post) => (
                <div
                  key={post.id}
                  className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/50 dark:border-stone-850 p-6 flex flex-col sm:flex-row gap-6 hover-lift shadow-sm"
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={192}
                    height={128}
                    unoptimized
                    className="h-32 w-full sm:w-48 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-semibold text-earth-forest dark:text-earth-gold uppercase tracking-widest">
                        {post.category.name}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white mt-1 hover:text-earth-forest dark:hover:text-earth-gold transition-colors">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="text-xs text-stone-500 mt-4">
                      By {post.author.name} • {post.publishDate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen flex-col items-center justify-center bg-stone-50/50 dark:bg-stone-950/50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-stone-200 border-t-earth-gold dark:border-stone-850 dark:border-t-earth-gold"></div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
