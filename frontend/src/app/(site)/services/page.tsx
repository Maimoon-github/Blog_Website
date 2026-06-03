import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { getServicesPage } from "@/lib/api";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const pageData = await getServicesPage();
    return {
      title: pageData.seo?.seo_title || pageData.title,
      description: pageData.seo?.search_description,
    };
  } catch (error) {
    return { title: "Our Services" };
  }
}

export default async function ServicesPage() {
  const pageData = await getServicesPage().catch(() => null);

  if (!pageData) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-foreground/60">Page content not found. Please check backend.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#131026] py-16 sm:py-24">
      {/* Ambient glow */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(95,45,166,0.18) 0%, transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="text-sm font-semibold tracking-wider uppercase text-[#8B65BF]">
            ✦ {pageData.title}
          </span>
          <h1 className="font-sans text-4xl font-extrabold tracking-tight text-[#E0E0E0] sm:text-5xl mt-2">
             <span className="gradient-text">Specialized Advisory</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[#8B65BF]/80">
            {pageData.intro}
          </p>
        </div>

        {/* Dynamic Content Blocks */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {pageData.body.map((block) => {
            if (block.type === "features") {
                return block.value.features.map((feature: any, index: number) => (
                    <div
                        key={index}
                        className="flex flex-col justify-between p-8 rounded-3xl bg-[#1F1A40] border border-[#4E3473]/50 hover-lift transition-all duration-300 shadow-lg shadow-[#5F2DA6]/5"
                    >
                        <div>
                            <h3 className="font-sans text-xl font-bold text-[#E0E0E0]">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-[#8B65BF]/70 mt-4 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                        <div className="mt-8">
                             <Link
                                href="/contact"
                                className="block w-full text-center rounded-full py-2.5 text-xs font-semibold text-white bg-[#5F2DA6] shadow-lg shadow-[#5F2DA6]/30 hover:scale-105 transition-all duration-200"
                            >
                                Inquire Now ✦
                            </Link>
                        </div>
                    </div>
                ));
            }
            return null;
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mx-auto max-w-2xl mt-20 text-center">
          <div className="rounded-3xl px-8 py-12 bg-[#5F2DA6]/5 border border-[#4E3473]/40">
            <h2 className="font-sans text-2xl font-bold text-[#E0E0E0] mt-2">
              Let&apos;s talk it through. <span className="lotus-badge">🪷</span>
            </h2>
            <Link
              href="/contact"
              className="inline-block mt-6 rounded-full px-6 py-2.5 text-sm font-semibold text-white bg-[#5F2DA6] shadow-lg shadow-[#5F2DA6]/40 hover:scale-105 transition-all duration-200"
            >
              Get a Free Consultation →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
