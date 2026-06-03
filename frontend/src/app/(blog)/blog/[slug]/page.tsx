import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getBlogPost, getBlogPosts } from "@/lib/api";

export async function generateStaticParams() {
  try {
    const res = await fetch("http://localhost:8000/api/v1/blog/slugs/");
    const slugs = await res.json();
    return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getBlogPost(slug);
    return {
      title: post.seo?.seo_title || post.title,
      description: post.seo?.search_description || post.excerpt,
      openGraph: {
        title: post.seo?.og_title || post.title,
        description: post.seo?.og_description || post.excerpt,
        images: post.og_image_url ? [{ url: post.og_image_url }] : [],
      },
    };
  } catch (error) {
    return { title: "Blog Post" };
  }
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  
  const post = await getBlogPost(slug).catch(() => null);

  if (!post) {
    notFound();
  }

  // Find related articles (same category, excluding current post)
  const relatedPostsResponse = await getBlogPosts({ 
    category: post.categories?.[0]?.slug,
  }).catch(() => ({ results: [] }));
  
  const relatedPosts = relatedPostsResponse.results
    .filter((p) => p.id !== post.id)
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
            {post.featured_image_url && (
              <Image
                src={post.featured_image_url}
                alt={post.title}
                fill
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              {post.categories?.[0] && (
                <span className="inline-flex items-center rounded-md bg-earth-forest px-2.5 py-1 text-xs font-bold text-white uppercase tracking-wider mb-3">
                  {post.categories[0].name}
                </span>
              )}
              <h1 className="font-serif text-2xl sm:text-4xl font-extrabold tracking-tight leading-snug">
                {post.title}
              </h1>
            </div>
          </div>

          <div className="px-6 py-10 sm:p-12">
            {/* Author info header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-stone-100 dark:border-stone-800 gap-4 mb-10">
              <div className="flex items-center gap-3">
                {post.author?.photo?.url && (
                  <Image
                    src={post.author.photo.url}
                    alt={post.author.title}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="text-sm font-semibold text-stone-900 dark:text-white">
                    By {post.author?.title}
                  </p>
                  <p className="text-xs text-stone-500">{post.author?.role}</p>
                </div>
              </div>
              <div className="text-xs text-stone-500 flex items-center gap-2">
                <span>{new Date(post.published_date).toLocaleDateString()}</span>
                <span>•</span>
                <span>{post.reading_time} min read</span>
              </div>
            </div>

            {/* Content Renderer */}
            <div className="prose prose-stone dark:prose-invert max-w-none text-stone-700 dark:text-stone-300 leading-relaxed text-base space-y-6">
              {post.body.map((block) => {
                if (block.type === "rich_text" || block.type === "paragraph") {
                  return (
                    <div
                      key={block.id}
                      dangerouslySetInnerHTML={{ __html: block.value }}
                    />
                  );
                }
                if (block.type === "heading") {
                  return (
                    <h3 key={block.id} className="font-serif text-2xl font-bold text-stone-900 dark:text-white pt-4">
                      {block.value}
                    </h3>
                  );
                }
                if (block.type === "image") {
                  return (
                    <div key={block.id} className="my-8">
                       {/* Handle image block if needed */}
                    </div>
                  );
                }
                return null;
              })}
            </div>

            {/* Article Tags */}
            <div className="mt-12 pt-8 border-t border-stone-100 dark:border-stone-800">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider mr-2">
                  Tags:
                </span>
                {post.tag_names.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600 dark:bg-stone-800 dark:text-stone-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Author Bio Box */}
        {post.author && (
          <div className="mt-8 p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/50 dark:border-stone-850 flex flex-col sm:flex-row gap-6 shadow-sm items-center">
            {post.author.photo?.url && (
              <Image
                src={post.author.photo.url}
                alt={post.author.title}
                width={64}
                height={64}
                className="h-16 w-16 rounded-2xl object-cover shadow-sm flex-shrink-0"
              />
            )}
            <div className="text-center sm:text-left">
              <h4 className="font-serif text-lg font-bold text-stone-900 dark:text-white">
                About {post.author.title}
              </h4>
              <p className="text-xs text-earth-forest dark:text-earth-gold uppercase tracking-wider font-semibold mt-0.5">
                {post.author.role}
              </p>
              <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
                {post.author.bio}
              </p>
            </div>
          </div>
        )}

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
                    {related.cover_image_url && (
                      <Image
                        src={related.cover_image_url}
                        alt={related.title}
                        fill
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    {related.categories?.[0] && (
                      <span className="text-xs font-semibold text-earth-forest dark:text-earth-gold tracking-widest uppercase">
                        {related.categories[0].name}
                      </span>
                    )}
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