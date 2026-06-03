import React from "react";
import { Metadata } from "next";
import { getContactPage, getContactInfo } from "@/lib/api";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const pageData = await getContactPage();
    return {
      title: pageData.seo?.seo_title || pageData.title,
      description: pageData.seo?.search_description,
    };
  } catch (error) {
    return { title: "Contact Us" };
  }
}

export default async function ContactPage() {
  const [pageData, contactInfo] = await Promise.all([
    getContactPage().catch(() => null),
    getContactInfo().catch(() => ({ email: "", phone: "", address: "" })),
  ]);

  if (!pageData) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-foreground/60">Page content not found. Please check backend.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#131026] py-16 sm:py-24">
      {/* Ambient backgrounds */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(95,45,166,0.15) 0%, transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="text-sm font-semibold tracking-wider uppercase text-[#8B65BF]">
            ✦ {pageData.title}
          </span>
          <h1 className="font-sans text-4xl font-extrabold tracking-tight text-[#E0E0E0] sm:text-5xl mt-2">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[#8B65BF]/80">
            {pageData.intro}
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-12 sm:mt-20 lg:grid-cols-2">
            {/* Contact Info */}
            <div className="space-y-8">
                <div>
                    <h3 className="text-lg font-bold text-[#E0E0E0]">Contact Information</h3>
                    <p className="mt-3 text-sm text-[#8B65BF]/70">We&apos;re here to help with any inquiries about our services or travel recommendations.</p>
                </div>
                <dl className="space-y-6">
                    <div className="flex gap-x-4">
                        <dt className="flex-none"><span className="text-xl">📧</span></dt>
                        <dd className="text-sm font-medium text-[#E0E0E0]">{contactInfo.email || "hello@earthandescape.com"}</dd>
                    </div>
                    <div className="flex gap-x-4">
                        <dt className="flex-none"><span className="text-xl">📞</span></dt>
                        <dd className="text-sm font-medium text-[#E0E0E0]">{contactInfo.phone || "+1 (555) 000-0000"}</dd>
                    </div>
                    <div className="flex gap-x-4">
                        <dt className="flex-none"><span className="text-xl">📍</span></dt>
                        <dd className="text-sm font-medium text-[#E0E0E0]">{contactInfo.address || "Eco-Building Cluster, Earth City"}</dd>
                    </div>
                </dl>
                
                {/* Body Content */}
                <div className="prose prose-stone dark:prose-invert text-sm text-[#8B65BF]/70">
                    {pageData.body.map((block) => {
                        if (block.type === "rich_text" || block.type === "paragraph") {
                            return <div key={block.id} dangerouslySetInnerHTML={{ __html: block.value }} />;
                        }
                        return null;
                    })}
                </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-3xl bg-[#1F1A40] border border-[#4E3473]/50 p-8 shadow-xl">
                <form action="#" method="POST" className="space-y-6">
                    <div>
                        <label htmlFor="full-name" className="block text-xs font-semibold text-[#8B65BF] uppercase tracking-wider">Full Name</label>
                        <input type="text" name="full-name" id="full-name" className="mt-2 block w-full rounded-xl bg-[#131026] border border-[#4E3473] px-4 py-3 text-sm text-[#E0E0E0] outline-none focus:ring-2 focus:ring-[#5F2DA6]" placeholder="Jane Doe" required />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-xs font-semibold text-[#8B65BF] uppercase tracking-wider">Email Address</label>
                        <input type="email" name="email" id="email" className="mt-2 block w-full rounded-xl bg-[#131026] border border-[#4E3473] px-4 py-3 text-sm text-[#E0E0E0] outline-none focus:ring-2 focus:ring-[#5F2DA6]" placeholder="jane@example.com" required />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-xs font-semibold text-[#8B65BF] uppercase tracking-wider">Message</label>
                        <textarea name="message" id="message" rows={4} className="mt-2 block w-full rounded-xl bg-[#131026] border border-[#4E3473] px-4 py-3 text-sm text-[#E0E0E0] outline-none focus:ring-2 focus:ring-[#5F2DA6]" placeholder="How can we help you?" required></textarea>
                    </div>
                    <button type="submit" className="w-full rounded-full bg-[#5F2DA6] py-3 text-sm font-bold text-white shadow-lg shadow-[#5F2DA6]/30 hover:scale-[1.02] transition-all">Send Message ✦</button>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
}
