import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { getAboutPage, getAuthors } from "@/lib/api";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const pageData = await getAboutPage();
    return {
      title: pageData.seo?.seo_title || pageData.title,
      description: pageData.seo?.search_description,
      openGraph: {
        title: pageData.seo?.og_title,
        description: pageData.seo?.og_description,
        images: pageData.seo?.og_image ? [{ url: pageData.seo.og_image }] : [],
      },
    };
  } catch (error) {
    return { title: "About Us" };
  }
}

export default async function AboutPage() {
  const [pageData, authorsResponse] = await Promise.all([
    getAboutPage().catch(() => null),
    getAuthors().catch(() => ({ results: [] })),
  ]);

  if (!pageData) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-foreground/60">Page content not found. Please check backend.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#131026] py-12 sm:py-16 lg:py-24">
      {/* Ambient radial glow */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(95,45,166,0.18) 0%, transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#8B65BF]">
            ✦ {pageData.title}
          </span>
          <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#E0E0E0] mt-2">
            Eco-Architectural <span className="gradient-text">Harmony</span>
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-[#8B65BF]/80 px-2">
            {pageData.intro}
          </p>
        </div>

        {/* Content blocks */}
        <div className="mx-auto max-w-5xl mt-8 sm:mt-12 space-y-12">
            {pageData.body.map((block) => {
                if (block.type === "rich_text" || block.type === "paragraph") {
                    return (
                        <div
                            key={block.id}
                            className="prose prose-stone dark:prose-invert max-w-none text-[#8B65BF]/80"
                            dangerouslySetInnerHTML={{ __html: block.value }}
                        />
                    );
                }
                return null;
            })}
        </div>

        {/* Team Section */}
        <div className="mx-auto max-w-5xl mt-16 sm:mt-24">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-[#E0E0E0]">
              Meet Our Team
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#8B65BF]/80 px-2">
              The writers, architects, and scouts curating content for Earth & Escape.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:gap-8">
            {authorsResponse.results.map((author) => (
              <div
                key={author.slug}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl bg-[#1F1A40] border border-[#4E3473]/50 hover-lift transition-all duration-300"
              >
                <div className="relative flex-shrink-0 mx-auto sm:mx-0">
                  {author.photo?.url && (
                    <Image
                        src={author.photo.url}
                        alt={author.title}
                        width={96}
                        height={96}
                        className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl object-cover shadow-md border-2 border-[#5F2DA6]/60"
                    />
                  )}
                </div>

                <div className="text-center sm:text-left">
                  <h3 className="font-sans text-lg sm:text-xl font-bold text-[#E0E0E0]">
                    {author.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs font-semibold text-[#8B65BF] uppercase tracking-wider mt-1">
                    {author.role}
                  </p>
                  <p className="text-xs sm:text-sm text-[#8B65BF]/70 mt-2 sm:mt-3 leading-relaxed">
                    {author.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mx-auto max-w-2xl mt-16 sm:mt-24 text-center">
            <div className="rounded-2xl sm:rounded-3xl px-6 sm:px-8 py-8 sm:py-12 bg-[#5F2DA6]/10 border border-[#4E3473]/50">
                <h2 className="font-sans text-xl sm:text-2xl font-bold text-[#E0E0E0]">Ready to Explore?</h2>
                <div className="mt-6 flex items-center justify-center gap-4">
                    <Link href="/blog" className="rounded-full px-6 py-2 bg-[#5F2DA6] text-white text-sm font-semibold">Browse Articles</Link>
                    <Link href="/contact" className="rounded-full px-6 py-2 border border-[#4E3473] text-[#8B65BF] text-sm font-semibold">Get in Touch</Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}