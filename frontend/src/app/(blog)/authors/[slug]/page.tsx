import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAuthor, getBlogPosts } from "@/lib/api";

export async function generateStaticParams() {
  try {
    const res = await fetch("http://localhost:8000/api/v1/authors/slugs/");
    const slugs = await res.json();
    return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const author = await getAuthor(slug);
    return {
      title: `${author.title} | Earthen Homes`,
      description: author.bio,
    };
  } catch (error) {
    return { title: "Author Profile" };
  }
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function AuthorProfilePage({ params }: PageProps) {
  const { slug } = await params;
  
  const author = await getAuthor(slug).catch(() => null);

  if (!author) {
    notFound();
  }

  // Filter posts written by this author
  const postsResponse = await getBlogPosts({ author: slug }).catch(() => ({ results: [], count: 0 }));
  const authorPosts = postsResponse.results;

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
        <div className="max-w-3xl mx-auto bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/50 dark:border-stone-850 p-8 sm:p-12 shadow-sm text-center sm:text-left flex flex-col sm:row gap-8 items-center mb-16 transition-all">
            {author.photo?.url && (
                <Image
                    src={author.photo.url}
                    alt={author.title}
                    width={112}
                    height={112}
                    className="h-28 w-28 rounded-3xl object-cover shadow-md flex-shrink-0"
                />
            )}
          <div>
            <span className="text-xs font-bold text-earth-gold uppercase tracking-wider">
              Author Profile
            </span>
            <h1 className="font-serif text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white mt-1">
              {author.title}
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
            Articles Published by {author.title} ({postsResponse.count})
          </h2>
          
          {authorPosts.length === 0 ? (
            <p className="text-sm text-stone-500 dark:text-stone-400">This author hasn&apos;t published any articles yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {authorPosts.map((post) => (
                <article
                  key={post.id}
                  className="flex flex-col items-start justify-between bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-stone-200/50 dark:border-stone-850 hover-lift shadow-sm transition-all"
                >
                  <div className="relative w-full h-48">
                    {post.cover_image_url && (
                        <Image
                            src={post.cover_image_url}
                            alt={post.title}
                            fill
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="mt-2 font-serif text-lg font-bold leading-snug text-stone-900 dark:text-white hover:text-earth-forest dark:hover:text-earth-gold transition-colors">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p className="mt-3 text-sm text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="mt-6 text-xs text-stone-500 border-t border-stone-100 dark:border-stone-800 pt-4 w-full">
                      {new Date(post.published_date).toLocaleDateString()} • {post.reading_time} min read
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