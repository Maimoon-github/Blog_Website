// src/app/(site)/page.tsx
import Link from "next/link";
import Image from "next/image";
import { mockPosts, mockCategories } from "@/lib/mockData";

export default function HomePage() {
  // Get featured posts (first 3)
  const featuredPosts = mockPosts.slice(0, 3);
  // Get recent posts (next 3)
  const recentPosts = mockPosts.slice(3, 6);
  // Get top categories (first 3)
  const topCategories = mockCategories.slice(0, 3);

  return (
    <div className="flex-1 bg-lotus-void">
      {/* Ambient background glows – responsive */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(95,45,166,0.2),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_80%_80%,rgba(78,52,115,0.15),transparent_70%)]" />
      </div>

      {/* Hero Section – Fully Responsive */}
      <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs sm:text-sm font-semibold tracking-wider uppercase text-lotus-light lotus-badge mb-3 sm:mb-4">
            ✦ Welcome to the journey
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            <span className="gradient-text">Earthen Homes</span>
            <br className="hidden sm:block" />
            <span className="text-foreground">& Hot Tub Escapes</span>
          </h1>
          <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-foreground/70 px-2">
            Discover organic architecture, eco‑living, and romantic getaways with in‑room hot tubs.
            Your premium portal to sustainable luxury.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link
              href="/blog"
              className="rounded-full bg-lotus-core px-5 sm:px-7 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-lotus-core/40"
            >
              Explore Articles
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-lotus-petal-dark px-5 sm:px-7 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-lotus-light transition-all duration-200 hover:bg-lotus-core/10"
            >
              Learn More →
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Posts Section – Responsive Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold section-ornament inline-block gradient-text">
            Featured Stories
          </h2>
          <p className="mt-2 text-sm sm:text-base text-foreground/60">
            Hand‑picked articles from our editors
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl bg-lotus-shadow border border-lotus-petal-dark/50 overflow-hidden hover-lift transition-all duration-300"
            >
              <div className="aspect-video w-full overflow-hidden bg-lotus-void relative">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  unoptimized
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.category ? (
                    [post.category.name].slice(0, 2).map((cat) => (
                      <span
                        key={cat}
                        className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-lotus-light bg-lotus-core/10 px-2 py-0.5 rounded-full"
                      >
                        {cat}
                      </span>
                    ))
                  ) : null}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground line-clamp-2 group-hover:text-lotus-light transition">
                  {post.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-foreground/60 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-foreground/50">
                  <span>{post.author.name}</span>
                  <span>•</span>
                  <span>{post.publishDate}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories Section – Responsive */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold gradient-text">Explore by Category</h2>
          <p className="mt-2 text-sm sm:text-base text-foreground/60">
            Dive into your favourite topics
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {topCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group relative rounded-2xl overflow-hidden h-40 sm:h-48 bg-lotus-shadow border border-lotus-petal-dark/50 hover-lift"
            >
              <div
                className="absolute inset-0 bg-gradient-to-t from-lotus-void via-lotus-shadow/50 to-transparent"
                style={{ background: "linear-gradient(to top, #131026 0%, rgba(31,26,64,0.5) 50%, transparent 100%)" }}
              />
              <div className="absolute inset-0 flex items-end p-4 sm:p-6">
                <div>
                  <span className="text-2xl sm:text-3xl lotus-badge block mb-1">✦</span>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-lotus-light transition">
                    {category.name}
                  </h3>
                  <p className="text-xs text-foreground/50 mt-1">Explore this category</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats / Philosophy Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="rounded-3xl bg-lotus-shadow/30 border border-lotus-petal-dark/40 p-6 sm:p-8 md:p-10">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold gradient-text">Our Impact</h2>
            <p className="mt-2 text-sm sm:text-base text-foreground/60">
              Building a greener, more romantic world
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            {[
              { icon: "🌿", label: "Natural Materials", value: "100%" },
              { icon: "⚡", label: "Energy Efficiency", value: "60%" },
              { icon: "🌍", label: "Global Reach", value: "30+" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center p-4 sm:p-6 rounded-2xl bg-lotus-shadow border border-lotus-petal-dark/50"
              >
                <div className="text-3xl sm:text-4xl lotus-badge mb-2">{stat.icon}</div>
                <div className="text-2xl sm:text-3xl font-extrabold gradient-text-violet">
                  {stat.value}
                </div>
                <p className="mt-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-foreground/70">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold gradient-text">Latest Musings</h2>
          <p className="mt-2 text-sm sm:text-base text-foreground/60">
            Fresh from the hearth
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl bg-lotus-shadow border border-lotus-petal-dark/50 overflow-hidden hover-lift"
            >
              <div className="aspect-video w-full overflow-hidden relative">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  unoptimized
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-bold text-foreground line-clamp-2 group-hover:text-lotus-light">
                  {post.title}
                </h3>
                <p className="mt-2 text-xs text-foreground/60 line-clamp-2">{post.excerpt}</p>
                <div className="mt-3 flex items-center justify-between text-[10px] sm:text-xs text-foreground/40">
                  <span>{post.author.name}</span>
                  <span>{post.publishDate}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-lotus-petal-dark px-6 py-2.5 text-sm font-semibold text-lotus-light transition hover:bg-lotus-core/10"
          >
            View All Articles
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* Newsletter Section – Responsive */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="rounded-2xl sm:rounded-3xl bg-lotus-core/5 border border-lotus-petal-dark/60 p-6 sm:p-8 md:p-10 text-center">
          <div className="text-3xl sm:text-4xl lotus-badge mb-3">🪷</div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Subscribe to Our Newsletter</h2>
          <p className="mt-2 text-sm text-foreground/70 max-w-md mx-auto">
            Get the latest articles and exclusive offers straight to your inbox.
          </p>
          <form className="mt-6 flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 rounded-full bg-lotus-void/80 border border-lotus-petal-dark px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-lotus-core"
              required
            />
            <button
              type="submit"
              className="rounded-full bg-lotus-core px-6 py-2.5 text-sm font-semibold text-white transition hover:scale-105 hover:shadow-lotus-core/40"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}