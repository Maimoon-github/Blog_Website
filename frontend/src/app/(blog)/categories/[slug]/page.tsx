import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getCategory, getBlogPosts } from "@/lib/api";

export async function generateStaticParams() {
  try {
    const res = await fetch("http://localhost:8000/api/v1/categories/slugs/");
    const slugs = await res.json();
    return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const category = await getCategory(slug);
    return {
      title: `${category.name} | Earthen Homes`,
      description: category.description,
    };
  } catch (error) {
    return { title: "Category" };
  }
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  
  const category = await getCategory(slug).catch(() => null);

  if (!category) {
    notFound();
  }

  // Filter posts matching this category
  const postsResponse = await getBlogPosts({ category: slug }).catch(() => ({ results: [], count: 0 }));
  const categoryPosts = postsResponse.results;

  return (
    <div className="flex-1 bg-stone-50 dark:bg-stone-950 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-8 max-w-5xl mx-auto">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-xs font-semibold text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Back to Categories
          </Link>
        </div>

        {/* Category Profile Header */}
        <div className="max-w-5xl mx-auto bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/50 dark:border-stone-850 overflow-hidden shadow-sm flex flex-col md:flex-row gap-8 items-center mb-16 transition-all">
          <div className="h-64 w-full md:w-80 relative flex-shrink-0">
               {category.image_url && (
                    <Image
                        src={category.image_url}
                        alt={category.name}
                        fill
                        className="absolute inset-0 h-full w-full object-cover"
                    />
               )}
          </div>
          <div className="p-8 md:p-6 text-center md:text-left">
            <span className="text-xs font-bold text-earth-gold uppercase tracking-wider">
              Category Directory
            </span>
            <h1 className="font-serif text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white mt-1">
              {category.name}
            </h1>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-4 leading-relaxed max-w-xl">
              {category.description}
            </p>
          </div>
        </div>

        {/* Category Articles Grid */}
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-white mb-8 border-b border-stone-100 dark:border-stone-800 pb-4">
            Articles in Category ({postsResponse.count})
          </h2>
          
          {categoryPosts.length === 0 ? (
            <p className="text-sm text-stone-500 dark:text-stone-400">No articles published in this category yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {categoryPosts.map((post) => (
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
                    <div className="mt-6 flex items-center gap-x-3 border-t border-stone-100 dark:border-stone-800 pt-4">
                        {post.author?.photo?.url && (
                             <Image
                                src={post.author.photo.url}
                                alt={post.author.title}
                                width={32}
                                height={32}
                                className="h-8 w-8 rounded-full object-cover"
                            />
                        )}
                      <div className="text-xs">
                        <p className="font-semibold text-stone-900 dark:text-white">
                          {post.author?.title}
                        </p>
                        <p className="text-stone-500">{new Date(post.published_date).toLocaleDateString()} • {post.reading_time} min read</p>
                      </div>
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