import React from "react";
import Link from "next/link";
import Image from "next/image";
// import { mockPosts, mockCategories } from "../../lib/mockData";
import { mockPosts, mockCategories } from "@/lib/mockData";
import styles from "./page.module.css";

export default function HomePage() {
  const featuredPost = mockPosts.find((p) => p.featured) || mockPosts[0];
  const recentPosts = mockPosts.filter((p) => p.id !== featuredPost.id);

  return (
    <div className="flex-1 bg-[#131026]">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden py-24 sm:py-36">
        <div className={`absolute inset-0 -z-10 haze-animate ${styles.heroRadialHaze}`} />
        <div className={`absolute inset-0 -z-10 ${styles.heroDeepGlow}`} />

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span
              className={`inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold text-[#8B65BF] mb-8 ring-1 ring-inset ring-[#4E3473] ${styles.badgeBg}`}
            >
              ✦ Welcome to the Future of Sustainable Living &amp; Travel
            </span>

            <h1 className="font-sans text-4xl font-extrabold tracking-tight text-[#E0E0E0] sm:text-6xl leading-tight">
              Where Sustainable Design Meets{" "}
              <span className="gradient-text">Absolute Sanctuary</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-[#8B65BF]/80">
              Discover beautiful, low-impact cob and rammed-earth architectures alongside the world&apos;s most romantic hotel suites featuring private in-room hot tubs.
            </p>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/blog"
                className={`rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover-lift cursor-pointer ${styles.ctaButton}`}
              >
                Explore the Blog
              </Link>
              <Link
                href="/about"
                className="text-sm font-semibold leading-6 text-[#8B65BF] hover:text-[#E0E0E0] transition-colors"
              >
                Our Philosophy <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute top-8 right-8 text-4xl opacity-20 lotus-badge pointer-events-none hidden lg:block">
          🪷
        </div>
        <div
          className={`absolute bottom-12 left-10 text-2xl opacity-10 lotus-badge pointer-events-none hidden lg:block ${styles.lotusDelay}`}
        >
          ✦
        </div>
      </section>

      {/* 2. CATEGORY SHOWCASE */}
      <section className={`py-16 sm:py-24 border-y ${styles.categorySection}`}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="font-sans text-3xl font-bold tracking-tight text-[#E0E0E0] sm:text-4xl">
              <span className="section-ornament" />Select Your Journey
            </h2>
            <p className="mt-4 text-[#8B65BF]/80">
              Choose between ecological structural engineering or handpicked, romantic luxury travel destinations.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {mockCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog?category=${cat.slug}`}
                className={`group relative flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 hover-lift shadow-md transition-all duration-300 ${styles.categoryCard}`}
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover opacity-50 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
                />
                <div className={`absolute inset-0 ${styles.categoryOverlay}`} />
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none ${styles.categoryGlow}`}
                />
                <div className="relative z-10">
                  <h3 className="font-sans text-xl font-bold text-[#E0E0E0] group-hover:text-[#8B65BF] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="mt-2 text-xs text-[#8B65BF]/70 line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED POST */}
      {featuredPost && (
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-none">
              <div className="text-center lg:text-left mb-12">
                <span className="text-sm font-semibold tracking-wider uppercase text-[#8B65BF]">
                  ✦ Editor&apos;s Highlight
                </span>
                <h2 className="font-sans text-3xl font-bold tracking-tight text-[#E0E0E0] mt-1">
                  Featured Article
                </h2>
              </div>

              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-0 items-center overflow-hidden rounded-3xl hover-lift transition-all duration-300 ${styles.featuredContainer}`}
              >
                <div className="relative h-96 lg:h-full w-full min-h-[400px]">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover opacity-80"
                  />
                  <div className={`absolute inset-0 ${styles.featuredImageOverlay}`} />
                </div>

                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="text-xs font-semibold text-[#8B65BF] tracking-widest uppercase">
                    {featuredPost.category.name}
                  </span>
                  <h3 className="font-sans text-2xl lg:text-3xl font-bold text-[#E0E0E0] mt-2 leading-snug">
                    {featuredPost.title}
                  </h3>
                  <p className="mt-4 text-[#8B65BF]/80 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="mt-6 flex items-center gap-x-4">
                    <div className="relative h-10 w-10">
                      <Image
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        fill
                        className={`rounded-full object-cover ${styles.authorAvatarBorder}`}
                      />
                    </div>
                    <div className="text-sm">
                      <p className="font-semibold text-[#E0E0E0]">{featuredPost.author.name}</p>
                      <p className="text-[#8B65BF]/60 text-xs">{featuredPost.publishDate} • {featuredPost.readTime}</p>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:scale-105 cursor-pointer ${styles.featuredCta}`}
                    >
                      Read Full Article →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. STAT CALLOUTS */}
      <section className={`py-20 border-y ${styles.statsSection}`}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-center items-center">
            {[
              {
                stat: "30%",
                title: "Global Population",
                desc: "Nearly 1 in 3 people worldwide live in structures constructed from mud or clay-based earth.",
              },
              {
                stat: "60%",
                title: "Energy Reductions",
                desc: "Proper earthen construction utilizes thermal mass to slash cooling and heating energy demand.",
              },
              {
                stat: "100%",
                title: "Eco-Integrity",
                desc: "At lifecycle end, raw natural walls decompose organically back into the surrounding environment.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`p-6 rounded-2xl hover-lift transition-all duration-300 cursor-default ${styles.statCard}`}
              >
                <span className={`text-5xl font-extrabold font-sans ${styles.statGradient}`}>
                  {item.stat}
                </span>
                <h3 className="mt-3 text-sm font-semibold uppercase tracking-wider text-[#E0E0E0]">{item.title}</h3>
                <p className="mt-2 text-xs text-[#8B65BF]/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. RECENT ARTICLES GRID */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="font-sans text-3xl font-bold tracking-tight text-[#E0E0E0] sm:text-4xl">
              <span className="section-ornament" />Latest from the Journal
            </h2>
            <p className="mt-4 text-[#8B65BF]/80">
              Fresh insights on organic architectural builds, travel recommendations, and construction guides.
            </p>
          </div>

          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {recentPosts.map((post) => (
              <article
                key={post.id}
                className={`flex flex-col items-start justify-between overflow-hidden rounded-2xl hover-lift transition-all duration-300 ${styles.recentCard}`}
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover opacity-80 hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 ${styles.recentImageOverlay}`} />
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-[#8B65BF] tracking-widest uppercase">
                      {post.category.name}
                    </span>
                    <h3 className="mt-2 font-sans text-lg font-bold leading-snug text-[#E0E0E0] hover:text-[#8B65BF] transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="mt-3 text-sm text-[#8B65BF]/70 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className={`mt-6 flex items-center gap-x-3 border-t pt-4 ${styles.recentDivider}`}>
                    <div className="relative h-8 w-8">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        fill
                        className={`rounded-full object-cover ${styles.recentAvatarBorder}`}
                      />
                    </div>
                    <div className="text-xs">
                      <p className="font-semibold text-[#E0E0E0]">{post.author.name}</p>
                      <p className="text-[#8B65BF]/60">{post.publishDate} • {post.readTime}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. NEWSLETTER */}
      <section className={`py-16 sm:py-24 ${styles.newsletterSection}`}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className={`relative overflow-hidden rounded-3xl px-6 py-20 sm:px-24 sm:py-32 lg:flex lg:items-center lg:px-32 lg:py-24 ${styles.newsletterContainer}`}>
            <div className={`absolute inset-0 -z-10 haze-animate pointer-events-none ${styles.newsletterGlow}`} />

            <div className="mx-auto max-w-2xl lg:max-w-none lg:flex-auto">
              <div className="text-4xl mb-4 lotus-badge">🪷</div>
              <h2 className="font-sans text-3xl font-bold tracking-tight text-[#E0E0E0] sm:text-4xl">
                Get notified when we publish.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#8B65BF]/80">
                Join our newsletter list to receive weekly blueprints, construction guides, and handpicked luxury cabins directly in your inbox.
              </p>
              <form className="mt-6 sm:flex sm:max-w-md gap-3">
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`w-full min-w-0 rounded-full border-0 px-4 py-2 text-[#E0E0E0] shadow-sm sm:text-sm sm:leading-6 outline-none focus:ring-2 ${styles.newsletterInput}`}
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className={`mt-3 sm:mt-0 w-full sm:w-auto rounded-full px-6 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:scale-105 cursor-pointer ${styles.newsletterButton}`}
                >
                  Subscribe ✦
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}