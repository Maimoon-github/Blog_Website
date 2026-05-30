import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { mockPosts } from "../../../../lib/mockData";

// Static export generation
export async function generateStaticParams() {
  return mockPosts.map((post) => ({ slug: post.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = mockPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Find related articles (same category, excluding current post)
  const relatedPosts = mockPosts
    .filter((p) => p.category.slug === post.category.slug && p.id !== post.id)
    .slice(0, 2);

  return (
    <div className="flex-1 bg-stone-50 dark:bg-stone-950 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Back to Journal
          </Link>
        </div>

        {/* Article Metadata */}
        <article className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/50 dark:border-stone-850 overflow-hidden shadow-sm">
          {/* Main Hero Image */}
          <div className="relative h-72 sm:h-96 md:h-[450px] w-full">
            <img
              src={post.image}
              alt={post.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="inline-flex items-center rounded-md bg-earth-forest px-2.5 py-1 text-xs font-bold text-white uppercase tracking-wider mb-3">
                {post.category.name}
              </span>
              <h1 className="font-serif text-2xl sm:text-4xl font-extrabold tracking-tight leading-snug">
                {post.title}
              </h1>
            </div>
          </div>

          <div className="px-6 py-10 sm:p-12">
            {/* Author info header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-stone-100 dark:border-stone-800 gap-4 mb-10">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-stone-900 dark:text-white">
                    By {post.author.name}
                  </p>
                  <p className="text-xs text-stone-500">{post.author.role}</p>
                </div>
              </div>
              <div className="text-xs text-stone-500 flex items-center gap-2">
                <span>{post.publishDate}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Markdown-style Content Renderer */}
            <div className="prose prose-stone dark:prose-invert max-w-none text-stone-700 dark:text-stone-300 leading-relaxed text-base space-y-6">
              {post.content.split("\n\n").map((paragraph, index) => {
                if (paragraph.startsWith("### ")) {
                  return (
                    <h3 key={index} className="font-serif text-2xl font-bold text-stone-900 dark:text-white pt-4">
                      {paragraph.replace("### ", "")}
                    </h3>
                  );
                }
                if (paragraph.startsWith("* **")) {
                  // Handle bullet lists quickly
                  const items = paragraph.split("\n");
                  return (
                    <ul key={index} className="list-disc pl-6 space-y-2 my-4">
                      {items.map((item, iIndex) => {
                        const cleanItem = item.replace("* **", "").replace("**", "");
                        const parts = cleanItem.split(":");
                        return (
                          <li key={iIndex}>
                            <strong className="text-stone-900 dark:text-white">{parts[0]}:</strong>
                            {parts.slice(1).join(":")}
                          </li>
                        );
                      })}
                    </ul>
                  );
                }
                return <p key={index}>{paragraph}</p>;
              })}
            </div>

            {/* Article Tags */}
            <div className="mt-12 pt-8 border-t border-stone-100 dark:border-stone-800">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider mr-2">
                  Tags:
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag.slug}
                    className="inline-flex items-center rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600 dark:bg-stone-800 dark:text-stone-300"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Author Bio Box */}
        <div className="mt-8 p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/50 dark:border-stone-850 flex flex-col sm:flex-row gap-6 shadow-sm items-center">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="h-16 w-16 rounded-2xl object-cover shadow-sm flex-shrink-0"
          />
          <div className="text-center sm:text-left">
            <h4 className="font-serif text-lg font-bold text-stone-900 dark:text-white">
              About {post.author.name}
            </h4>
            <p className="text-xs text-earth-forest dark:text-earth-gold uppercase tracking-wider font-semibold mt-0.5">
              {post.author.role}
            </p>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
              {post.author.bio}
            </p>
          </div>
        </div>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-white mb-6">
              You Might Also Like
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="flex flex-col bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-stone-200/50 dark:border-stone-850 hover-lift shadow-sm group"
                >
                  <div className="h-40 w-full relative">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold text-earth-forest dark:text-earth-gold tracking-widest uppercase">
                      {related.category.name}
                    </span>
                    <h4 className="mt-2 font-serif text-base font-bold text-stone-900 dark:text-white group-hover:text-earth-forest dark:group-hover:text-earth-gold transition-colors line-clamp-2">
                      {related.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
