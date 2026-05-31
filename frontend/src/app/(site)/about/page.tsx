import React from "react";
import { mockAuthors } from "../../../lib/mockData";

export default function AboutPage() {
  return (
    <div className="flex-1 bg-[#131026] py-12 sm:py-16 lg:py-24">
      {/* Ambient radial glow – responsive opacity */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(95,45,166,0.18) 0%, transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── About Header ── */}
        <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#8B65BF]">
            ✦ Our Story
          </span>
          <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#E0E0E0] mt-2">
            Eco-Architectural{" "}
            <span className="gradient-text">Harmony</span>
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-[#8B65BF]/80 px-2">
            Earth &amp; Escape is a digital journal bridging the gap between natural building
            practices and romantic retreats. We believe architecture should be clean,
            low-impact, and aesthetically breath-taking.
          </p>
        </div>

        {/* ── Core Values with Responsive Image ── */}
        <div className="mx-auto max-w-5xl mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="font-sans text-xl sm:text-2xl font-bold text-[#E0E0E0]">
              <span style={{ color: "#5F2DA6", marginRight: "0.4rem" }}>✦</span>
              Why We Care About Earth Building
            </h2>
            <p className="mt-3 sm:mt-4 text-[#8B65BF]/80 leading-relaxed text-sm sm:text-base">
              Earthen construction methods like cob, rammed earth, and adobe utilize local
              clay-rich soils, straw, and gravel. They avoid carbon-heavy manufacturing
              processes and are completely non-toxic. They are highly energy-efficient because
              they absorb heat during the day and release it when the air cools down. Earthen
              structures represent a thousands-of-years-old tradition that remains fully viable
              today.
            </p>

            <h2 className="font-sans text-xl sm:text-2xl font-bold text-[#E0E0E0] mt-6 sm:mt-8">
              <span style={{ color: "#5F2DA6", marginRight: "0.4rem" }}>✦</span>
              The Escape Element
            </h2>
            <p className="mt-3 sm:mt-4 text-[#8B65BF]/80 leading-relaxed text-sm sm:text-base">
              Every sustainable structure needs to inspire. We pair our architectural tutorials
              with the finest romantic escapes that utilize natural materials, geothermal energy,
              or beautiful outdoor wellness integrations like hot tubs and jacuzzis. We show that
              luxury travel doesn&apos;t have to cost the planet.
            </p>
          </div>

          {/* Responsive image container */}
          <div className="order-1 md:order-2 relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl h-64 sm:h-80 md:h-96"
            style={{
              border: "1px solid rgba(78,52,115,0.6)",
              boxShadow: "0 0 40px rgba(95,45,166,0.2)",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80"
              alt="Natural landscape"
              className="absolute inset-0 h-full w-full object-cover opacity-75"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(95,45,166,0.15) 0%, rgba(19,16,38,0.3) 100%)",
              }}
            />
          </div>
        </div>

        {/* ── Philosophy Stats – responsive grid ── */}
        <div className="mx-auto max-w-5xl mt-12 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {[
            { icon: "🌿", label: "Natural Materials", value: "100%" },
            { icon: "⚡", label: "Energy Efficiency", value: "60%" },
            { icon: "🌍", label: "Global Reach", value: "30+" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl p-4 sm:p-6 text-center hover-lift transition-all duration-300"
              style={{
                background: "#1F1A40",
                border: "1px solid rgba(78,52,115,0.5)",
              }}
            >
              <div className="text-2xl sm:text-3xl mb-2 sm:mb-3 lotus-badge">{item.icon}</div>
              <div
                className="text-2xl sm:text-3xl font-extrabold"
                style={{
                  background: "linear-gradient(135deg, #8B65BF 0%, #5F2DA6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {item.value}
              </div>
              <p className="mt-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#E0E0E0]/70">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── Meet Our Team – responsive cards ── */}
        <div className="mx-auto max-w-5xl mt-16 sm:mt-24">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-[#E0E0E0]">
              <span className="section-ornament" />Meet Our Team
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#8B65BF]/80 px-2">
              The writers, architects, and scouts curating content for Earth &amp; Escape.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:gap-8">
            {mockAuthors.map((author) => (
              <div
                key={author.slug}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl hover-lift transition-all duration-300"
                style={{
                  background: "#1F1A40",
                  border: "1px solid rgba(78,52,115,0.5)",
                }}
              >
                {/* Avatar – centered on mobile, left on desktop */}
                <div className="relative flex-shrink-0 mx-auto sm:mx-0">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl object-cover shadow-md"
                    style={{
                      border: "2px solid rgba(95,45,166,0.6)",
                      boxShadow: "0 0 16px rgba(95,45,166,0.25)",
                    }}
                  />
                  <span
                    className="absolute -bottom-1 -right-1 h-3 w-3 sm:h-4 sm:w-4 rounded-full pulse-glow"
                    style={{ background: "#5F2DA6", border: "2px solid #131026" }}
                  />
                </div>

                <div className="text-center sm:text-left">
                  <h3 className="font-sans text-lg sm:text-xl font-bold text-[#E0E0E0]">
                    {author.name}
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

        {/* ── Bottom CTA – responsive padding ── */}
        <div className="mx-auto max-w-2xl mt-16 sm:mt-24 text-center">
          <div
            className="rounded-2xl sm:rounded-3xl px-6 sm:px-8 py-8 sm:py-12"
            style={{
              background: "rgba(95,45,166,0.08)",
              border: "1px solid rgba(78,52,115,0.5)",
              boxShadow: "0 0 40px rgba(95,45,166,0.1)",
            }}
          >
            <div className="text-3xl sm:text-4xl lotus-badge mb-3 sm:mb-4">🪷</div>
            <h2 className="font-sans text-xl sm:text-2xl font-bold text-[#E0E0E0]">
              Ready to Explore?
            </h2>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-[#8B65BF]/80 px-2">
              Dive into our curated journal of earthen architecture and romantic escapes.
            </p>
            <div className="mt-5 sm:mt-6 flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
              <a
                href="/blog"
                className="rounded-full px-5 sm:px-6 py-2 text-xs sm:text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
                style={{
                  background: "#5F2DA6",
                  boxShadow: "0 0 16px rgba(95,45,166,0.5)",
                }}
              >
                Browse Articles
              </a>
              <a
                href="/contact"
                className="rounded-full px-5 sm:px-6 py-2 text-xs sm:text-sm font-semibold text-[#8B65BF] transition-all duration-200 hover:text-[#E0E0E0]"
                style={{
                  border: "1px solid rgba(78,52,115,0.6)",
                }}
              >
                Get in Touch →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}