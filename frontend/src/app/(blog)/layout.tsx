"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <div className="flex min-h-screen flex-col bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100">
      {/* Shared Header for Blog Group */}
      <header className="sticky top-0 z-50 glassmorphism shadow-sm transition-all duration-300">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2 group">
              <span className="h-8 w-8 rounded-lg bg-earth-forest flex items-center justify-center text-white font-serif font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
                E
              </span>
              <span className="font-serif text-xl font-bold tracking-tight text-stone-900 dark:text-white">
                Earth<span className="text-earth-gold font-sans font-medium">&amp;</span>Escape
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-semibold tracking-wide transition-colors duration-200 relative py-1 px-2 rounded-md ${
                  isActive(item.href)
                    ? "text-earth-forest dark:text-earth-gold font-bold bg-stone-100/50 dark:bg-stone-900/50"
                    : "text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white hover:bg-stone-100/30 dark:hover:bg-stone-900/30"
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-earth-forest dark:bg-earth-gold rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Call to Action Button */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              href="/contact"
              className="rounded-full bg-earth-forest px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-emerald-800 transition-colors hover:lift cursor-pointer"
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-stone-700 dark:text-stone-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200/50 bg-stone-50 dark:border-stone-850 dark:bg-stone-950 p-4 transition-all duration-200">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block rounded-lg px-3 py-2 text-base font-semibold transition-all ${
                    isActive(item.href)
                      ? "bg-earth-forest/10 text-earth-forest dark:text-earth-gold"
                      : "text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-900"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="border-t border-stone-200/50 dark:border-stone-800 pb-3 pt-4">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center rounded-lg bg-earth-forest px-4 py-2.5 text-base font-semibold text-white shadow-md hover:bg-emerald-800 transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Blog layouts could feature a categories submenu or secondary toolbar */}
      <main className="flex-1 flex flex-col">{children}</main>

      {/* Shared Footer for Blog Group */}
      <footer className="border-t border-stone-200/60 bg-stone-100 dark:border-stone-800/65 dark:bg-stone-900/50">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="h-8 w-8 rounded-lg bg-earth-forest flex items-center justify-center text-white font-serif font-bold text-lg">
                  E
                </span>
                <span className="font-serif text-xl font-bold tracking-tight text-stone-900 dark:text-white">
                  Earth<span className="text-earth-gold font-sans font-medium">&amp;</span>Escape
                </span>
              </div>
              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400 max-w-xs">
                A luxury portal celebrating clean, sustainable architecture and inspiring romantic destinations with premium hot tubs.
              </p>
              <div className="flex space-x-4">
                <span className="text-xs text-stone-400 dark:text-stone-500">Instagram • Pinterest • Twitter</span>
              </div>
            </div>
            
            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-950 dark:text-white">
                    Explore
                  </h3>
                  <ul role="list" className="mt-4 space-y-3">
                    <li>
                      <Link href="/blog" className="text-sm text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white">
                        All Articles
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog?category=earthen-architecture" className="text-sm text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white">
                        Earthen Homes
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog?category=hot-tub-getaways" className="text-sm text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white">
                        Hot Tub Escapes
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-950 dark:text-white">
                    Information
                  </h3>
                  <ul role="list" className="mt-4 space-y-3">
                    <li>
                      <Link href="/about" className="text-sm text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link href="/services" className="text-sm text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white">
                        Services
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="text-sm text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-950 dark:text-white">
                  Legal
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                  <li>
                    <Link href="/privacy-policy" className="text-sm text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-sm text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-12 border-t border-stone-200/50 pt-8 dark:border-stone-850">
            <p className="text-xs text-stone-500 dark:text-stone-400 text-center">
              &copy; {new Date().getFullYear()} Earth &amp; Escape Blog. All rights reserved. Built with Next.js &amp; TailwindCSS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
