import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, getBlogSlugs } from "@/lib/api";
import type { StreamBlock } from "@/types/wagtail";

export const dynamicParams = true; // allow on-demand ISR for new posts

export async function generateStaticParams() {
  try {
    const slugs = await getBlogSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const post = await getBlogPost(slug);
    return {
      title: post.seo_display_title || post.title,
      description: post.search_description || post.intro,
    };
  } catch {
    return { title: "Post not found" };
  }
}

function renderBlock(block: StreamBlock, index: number): React.ReactNode {
  switch (block.type) {
    case "heading":
      return <h2 key={index} className="font-sans text-2xl font-bold text-[#E0E0E0] mt-10 mb-4">{block.value}</h2>;
    case "paragraph":
      return <div key={index} className="text-[#a89cc8] leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: block.value }} />;
    case "code":
      return (
        <pre key={index} className="bg-[#1F1A40] border border-[rgba(78,52,115,0.5)] rounded-xl p-4 overflow-x-auto my-6">
          <code className="text-sm text-[#8B65BF] font-mono">{block.value.code}</code>
        </pre>
      );
    case "quote":
      return (
        <blockquote key={index} className="border-l-4 border-[#5F2DA6] pl-6 my-8 italic">
          <div className="text-[#E0E0E0] text-lg" dangerouslySetInnerHTML={{ __html: block.value.text }} />
          {block.value.attribution && (
            <cite className="text-sm text-[#8B65BF] mt-2 block not-italic">— {block.value.attribution}</cite>
          )}
        </blockquote>
      );
    case "image":
      return (
        <div key={index} className="relative w-full h-80 rounded-2xl overflow-hidden my-8">
          <Image src={block.value.url} alt={block.value.alt} fill className="object-cover" />
        </div>
      );
    case "embed":
      return (
        <div key={index} className="my-8" dangerouslySetInnerHTML={{ __html: block.value.html ?? "" }} />
      );
    default:
      return null;
  }
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  let post;
  try {
    post = await getBlogPost(slug);
  } catch {
    notFound();
  }

  return (
    <div className="flex-1 bg-[#131026] py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-semibold text-[#8B65BF]/70 hover:text-[#8B65BF] transition-colors">
            ← Back to Journal
          </Link>
        </div>

        <article className="rounded-3xl overflow-hidden" style={{ background: "#1F1A40", border: "1px solid rgba(78,52,115,0.5)" }}>
          {/* Hero Image */}
          {post.hero_image_url && (
            <div className="relative h-72 sm:h-96 w-full">
              <Image src={post.hero_image_url} alt={post.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1A40]/90 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                {post.categories[0] && (
                  <span className="inline-flex items-center rounded-full bg-[#5F2DA6] px-3 py-1 text-xs font-bold text-white uppercase tracking-wider mb-3">
                    {post.categories[0].name}
                  </span>
                )}
                <h1 className="font-sans text-2xl sm:text-4xl font-extrabold tracking-tight">{post.title}</h1>
              </div>
            </div>
          )}
          {!post.hero_image_url && (
            <div className="px-6 pt-10">
              {post.categories[0] && (
                <span className="inline-flex items-center rounded-full bg-[#5F2DA6] px-3 py-1 text-xs font-bold text-white uppercase tracking-wider mb-3">
                  {post.categories[0].name}
                </span>
              )}
              <h1 className="font-sans text-3xl sm:text-4xl font-extrabold text-[#E0E0E0] tracking-tight mb-6">{post.title}</h1>
            </div>
          )}

          <div className="px-6 py-10 sm:p-12">
            {/* Meta */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-10" style={{ borderBottom: "1px solid rgba(78,52,115,0.4)" }}>
              <div className="text-sm text-[#E0E0E0] font-semibold">{post.author?.name ?? "Staff"}</div>
              <div className="text-xs text-[#8B65BF]/60 mt-1 sm:mt-0">
                {new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                {" · "}{post.reading_time_minutes} min read
              </div>
            </div>

            {/* Intro */}
            {post.intro && <p className="text-lg text-[#8B65BF]/80 leading-relaxed mb-10">{post.intro}</p>}

            {/* StreamField Body */}
            <div>{post.body.map((block, i) => renderBlock(block, i))}</div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-12 pt-8 flex flex-wrap gap-2" style={{ borderTop: "1px solid rgba(78,52,115,0.4)" }}>
                {post.tags.map((tag) => (
                  <Link key={tag.slug} href={`/blog?tag=${tag.slug}`} className="rounded-full px-3 py-1 text-xs font-medium text-[#8B65BF]" style={{ background: "rgba(95,45,166,0.15)", border: "1px solid rgba(95,45,166,0.3)" }}>
                    #{tag.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </article>

        {/* Related Posts */}
        {post.related_posts.length > 0 && (
          <div className="mt-16">
            <h3 className="font-sans text-xl font-bold text-[#E0E0E0] mb-6">You Might Also Like</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {post.related_posts.map((related) => (
                <Link key={related.id} href={`/blog/${related.slug}`} className="flex flex-col rounded-2xl overflow-hidden group" style={{ background: "#1F1A40", border: "1px solid rgba(78,52,115,0.5)" }}>
                  {related.hero_image_url && (
                    <div className="h-36 relative"><Image src={related.hero_image_url} alt={related.title} fill className="object-cover" /></div>
                  )}
                  <div className="p-5">
                    <p className="text-xs text-[#8B65BF] font-semibold uppercase tracking-wide">{related.categories[0]?.name}</p>
                    <h4 className="mt-1 font-sans text-sm font-bold text-[#E0E0E0] group-hover:text-[#8B65BF] transition-colors line-clamp-2">{related.title}</h4>
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