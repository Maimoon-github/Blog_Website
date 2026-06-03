import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { mockAuthors, mockPosts } from "../../../../lib/mockData";

export const dynamicParams = false; // Disable dynamic params to ensure only generated paths are valid  

export async function generateStaticParams() {
  // Get unique author slugs from all posts
  const uniqueAuthors = Array.from(
    new Set(mockPosts.map((post) => post.author.slug))
  );
  return uniqueAuthors.map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function AuthorProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const author = mockAuthors.find((a) => a.slug === slug);

  if (!author) {
    notFound();
  }

  // Filter posts written by this author
  const authorPosts = mockPosts.filter((post) => post.author.slug === slug);

  return (
    <div className="flex-1 bg-stone-50 dark:bg-stone-950 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-8 max-w-3xl mx-auto">
          <Link
            href="/authors"
            className="inline-flex items-center gap-2 text-xs font-semibold text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Back to Authors
          </Link>
        </div>

        {/* Author Header Profile */}
        <div className="max-w-3xl mx-auto bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/50 dark:border-stone-850 p-8 sm:p-12 shadow-sm text-center sm:text-left flex flex-col sm:flex-row gap-8 items-center mb-16">
          <Image
            src={author.avatar}
            alt={author.name}
            width={112}
            height={112}
            unoptimized
            className="h-28 w-28 rounded-3xl object-cover shadow-md flex-shrink-0"
          />
          <div>
            <span className="text-xs font-bold text-earth-gold uppercase tracking-wider">
              Author Profile
            </span>
            <h1 className="font-serif text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white mt-1">
              {author.name}
            </h1>
            <p className="text-sm font-semibold text-earth-forest dark:text-earth-gold uppercase tracking-wider mt-1">
              {author.role}
            </p>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-4 leading-relaxed">
              {author.bio}
            </p>
          </div>
        </div>

        {/* Author Articles Grid */}
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-white mb-8 border-b border-stone-100 dark:border-stone-800 pb-4">
            Articles Published by {author.name} ({authorPosts.length})
          </h2>
          
          {authorPosts.length === 0 ? (
            <p className="text-sm text-stone-500 dark:text-stone-400">This author hasn&apos;t published any articles yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {authorPosts.map((post) => (
                <article
                  key={post.id}
                  className="flex flex-col items-start justify-between bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-stone-200/50 dark:border-stone-850 hover-lift shadow-sm"
                >
                  <div className="relative w-full h-48">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      unoptimized
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
                    <div className="mt-6 text-xs text-stone-500 border-t border-stone-100 dark:border-stone-800 pt-4 w-full">
                      {post.publishDate} • {post.readTime}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}