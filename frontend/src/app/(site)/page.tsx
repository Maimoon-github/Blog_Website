import React from "react";
import Link from "next/link";
import Image from "next/image";
import { mockPosts, mockCategories } from "../../lib/mockData";

export default function HomePage() {
  const featuredPost = mockPosts.find((p) => p.featured) || mockPosts[0];
  const recentPosts = mockPosts.filter((p) => p.id !== featuredPost.id);

  return (
    <div className="flex-1 bg-stone-50 dark:bg-stone-950">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.amber.100),theme(colors.stone.50))] dark:bg-[radial-gradient(45rem_50rem_at_top,theme(colors.stone.900),theme(colors.stone.950))] opacity-40" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center rounded-full bg-earth-forest/10 px-3 py-1 text-xs font-semibold text-earth-forest dark:text-earth-gold mb-6 ring-1 ring-inset ring-earth-forest/20">
              Welcome to the Future of Sustainable Living & Travel
            </span>
            <h1 className="font-serif text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white sm:text-6xl leading-tight">
              Where Sustainable Design Meets <span className="gradient-text">Absolute Sanctuary</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-stone-600 dark:text-stone-400">
              Discover beautiful, low-impact cob and rammed-earth architectures alongside the world's most romantic hotel suites featuring private in-room hot tubs.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/blog"
                className="rounded-full bg-earth-forest px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-emerald-800 transition hover-lift cursor-pointer"
              >
                Explore the Blog
              </Link>
              <Link
                href="/about"
                className="text-sm font-semibold leading-6 text-stone-900 dark:text-white hover:text-earth-forest dark:hover:text-earth-gold transition-colors"
              >
                Our Philosophy <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Category Showcase */}
      <section className="py-16 sm:py-24 border-y border-stone-200/50 dark:border-stone-850/50 bg-stone-100/30 dark:bg-stone-900/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-stone-900 dark:text-white sm:text-4xl">
              Select Your Journey
            </h2>
            <p className="mt-4 text-stone-600 dark:text-stone-400">
              Choose between ecological structural engineering or handpicked, romantic luxury travel destinations.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {mockCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog?category=${cat.slug}`}
                className="group relative flex flex-col justify-end overflow-hidden rounded-2xl bg-stone-900 px-8 pb-8 pt-40 hover-lift shadow-md"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 h-full w-full object-cover opacity-60 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/40 to-transparent" />
                <div className="relative z-10">
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-earth-gold transition-colors">
                    {cat.name}
                  </h3>
                  <p className="mt-2 text-xs text-stone-300 line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Post Block */}
      {featuredPost && (
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-none">
              <div className="text-center lg:text-left mb-12">
                <span className="text-sm font-semibold tracking-wider uppercase text-earth-gold">
                  Editor&apos;s Highlight
                </span>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-stone-900 dark:text-white mt-1">
                  Featured Article
                </h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200/50 dark:border-stone-850 shadow-xl">
                <div className="relative h-96 lg:h-full w-full min-h-[400px]">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="text-xs font-semibold text-earth-forest dark:text-earth-gold tracking-widest uppercase">
                    {featuredPost.category.name}
                  </span>
                  <h3 className="font-serif text-2xl lg:text-3xl font-bold text-stone-900 dark:text-white mt-2 leading-snug">
                    {featuredPost.title}
                  </h3>
                  <p className="mt-4 text-stone-600 dark:text-stone-400 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="mt-6 flex items-center gap-x-4">
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="text-sm">
                      <p className="font-semibold text-stone-900 dark:text-white">
                        {featuredPost.author.name}
                      </p>
                      <p className="text-stone-500 text-xs">{featuredPost.publishDate} • {featuredPost.readTime}</p>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center justify-center rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 hover-lift cursor-pointer"
                    >
                      Read Full Article
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Stat Callouts & Philosophy */}
      <section className="py-20 bg-earth-forest/5 dark:bg-stone-900/20 border-y border-stone-200/50 dark:border-stone-850/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-center items-center">
            <div className="p-6 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/30 dark:border-stone-800 shadow-md">
              <span className="text-5xl font-extrabold text-earth-forest dark:text-earth-gold font-serif">30%</span>
              <h3 className="mt-3 text-sm font-semibold uppercase tracking-wider text-stone-900 dark:text-white">Global Population</h3>
              <p className="mt-2 text-xs text-stone-600 dark:text-stone-400">
                Nearly 1 in 3 people worldwide live in structures constructed from mud or clay-based earth.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/30 dark:border-stone-800 shadow-md">
              <span className="text-5xl font-extrabold text-earth-forest dark:text-earth-gold font-serif">60%</span>
              <h3 className="mt-3 text-sm font-semibold uppercase tracking-wider text-stone-900 dark:text-white">Energy Reductions</h3>
              <p className="mt-2 text-xs text-stone-600 dark:text-stone-400">
                Proper earthen construction utilizes thermal mass to slash cooling and heating energy demand.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/30 dark:border-stone-800 shadow-md">
              <span className="text-5xl font-extrabold text-earth-forest dark:text-earth-gold font-serif">100%</span>
              <h3 className="mt-3 text-sm font-semibold uppercase tracking-wider text-stone-900 dark:text-white">Eco-Integrity</h3>
              <p className="mt-2 text-xs text-stone-600 dark:text-stone-400">
                At lifecycle end, raw natural walls decompose organically back into the surrounding environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Recent Articles Grid */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-stone-900 dark:text-white sm:text-4xl">
              Latest from the Journal
            </h2>
            <p className="mt-4 text-stone-600 dark:text-stone-400">
              Fresh insights on organic architectural builds, travel recommendations, and construction guides.
            </p>
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {recentPosts.map((post) => (
              <article key={post.id} className="flex flex-col items-start justify-between bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-stone-200/50 dark:border-stone-850 hover-lift shadow-sm">
                <div className="relative w-full h-48">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-earth-forest dark:text-earth-gold tracking-widest uppercase">
                      {post.category.name}
                    </span>
                    <h3 className="mt-2 font-serif text-lg font-bold leading-snug text-stone-900 dark:text-white hover:text-earth-forest dark:hover:text-earth-gold transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="mt-3 text-sm text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-x-3 border-t border-stone-100 dark:border-stone-800 pt-4">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <div className="text-xs">
                      <p className="font-semibold text-stone-900 dark:text-white">
                        {post.author.name}
                      </p>
                      <p className="text-stone-500">{post.publishDate} • {post.readTime}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Newsletter Subscription Block */}
      <section className="bg-stone-900 dark:bg-stone-950 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-earth-forest/10 px-6 py-20 shadow-2xl sm:px-24 sm:py-32 lg:flex lg:items-center lg:px-32 lg:py-24">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(30rem_30rem_at_center,theme(colors.amber.500/10),transparent)]" />
            <div className="mx-auto max-w-2xl lg:max-w-none lg:flex-auto">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Get notified when we publish.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-stone-300">
                Join our newsletter list to receive weekly blueprints, construction guides, and handpicked luxury cabins directly in your inbox.
              </p>
              <form className="mt-6 sm:flex sm:max-w-md gap-3">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full min-w-0 rounded-full border-0 bg-white/5 px-4 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-earth-gold sm:text-sm sm:leading-6"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="mt-3 sm:mt-0 w-full sm:w-auto rounded-full bg-white px-6 py-2 text-sm font-semibold text-stone-900 shadow-sm hover:bg-stone-100 transition hover-lift cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
