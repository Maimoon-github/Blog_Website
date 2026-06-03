import React from "react";
import { Metadata } from "next";
import { getPrivacyPolicyPage } from "@/lib/api";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const pageData = await getPrivacyPolicyPage();
    return {
      title: pageData.seo?.seo_title || pageData.title,
      description: pageData.seo?.search_description,
    };
  } catch (error) {
    return { title: "Privacy Policy" };
  }
}

export default async function PrivacyPolicyPage() {
  const pageData = await getPrivacyPolicyPage().catch(() => null);

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
            "radial-gradient(ellipse 50% 35% at 50% 0%, rgba(95,45,166,0.15) 0%, transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <span className="text-sm font-semibold tracking-wider uppercase text-[#8B65BF]">
          ✦ Legal
        </span>
        <h1 className="font-sans text-3xl font-extrabold tracking-tight text-[#E0E0E0] sm:text-4xl mt-2">
          {pageData.title}
        </h1>
        <p className="text-xs text-[#4E3473] mt-2">
            Last updated: {new Date(pageData.last_published_at || Date.now()).toLocaleDateString()}
        </p>

        <div
          className="mt-10 rounded-3xl p-8 space-y-6 text-sm text-[#8B65BF]/80 leading-relaxed bg-[#1F1A40] border border-[#4E3473]/50"
        >
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
                if (block.type === "heading") {
                    return (
                        <h2 key={block.id} className="font-sans text-xl font-bold text-[#E0E0E0] pt-4 flex items-center gap-2">
                             <span className="text-[#5F2DA6]">✦</span> {block.value}
                        </h2>
                    );
                }
                return null;
            })}
        </div>
      </div>
    </div>
  );
}
