"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteLayout({
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
    <div className="flex min-h-screen flex-col bg-[#131026] text-[#E0E0E0]">
      {/* Sticky Glassmorphism Header */}
      <header className="sticky top-0 z-50 glassmorphism shadow-sm transition-all duration-300">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2 group">
              {/* Lotus logo badge */}
              <span className="h-8 w-8 rounded-lg bg-[#5F2DA6] flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform"
                style={{ boxShadow: "0 0 12px rgba(95,45,166,0.5)" }}>
                🪷
              </span>
              <span className="font-sans text-xl font-bold tracking-tight text-[#E0E0E0]">
                Earth<span className="text-[#8B65BF] font-medium">&</span>Escape
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
                    ? "text-[#8B65BF] font-bold bg-[#4E3473]/30"
                    : "text-[#E0E0E0]/70 hover:text-[#E0E0E0] hover:bg-[#4E3473]/20"
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#5F2DA6] rounded-full"
                    style={{ boxShadow: "0 0 6px rgba(95,45,166,0.8)" }} />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              href="/contact"
              className="rounded-full bg-[#5F2DA6] px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#7B3FCC] hover:scale-105 cursor-pointer"
              style={{ boxShadow: "0 0 12px rgba(95,45,166,0.4)" }}
            >
              Get in Touch ✦
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[#8B65BF]"
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
          <div className="lg:hidden border-t border-[#4E3473]/50 bg-[#1F1A40]/95 backdrop-blur-md p-4 transition-all duration-200">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block rounded-lg px-3 py-2 text-base font-semibold transition-all ${
                    isActive(item.href)
                      ? "bg-[#4E3473]/40 text-[#8B65BF]"
                      : "text-[#E0E0E0]/80 hover:bg-[#4E3473]/20 hover:text-[#E0E0E0]"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="border-t border-[#4E3473]/50 pb-3 pt-4">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center rounded-lg bg-[#5F2DA6] px-4 py-2.5 text-base font-semibold text-white shadow-md transition-colors hover:bg-[#7B3FCC]"
              >
                Get in Touch ✦
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">{children}</main>

      {/* Footer */}
      <footer className="border-t border-[#4E3473]/60 bg-[#1F1A40]/80">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="h-8 w-8 rounded-lg bg-[#5F2DA6] flex items-center justify-center text-white font-bold text-lg"
                  style={{ boxShadow: "0 0 10px rgba(95,45,166,0.5)" }}>
                  🪷
                </span>
                <span className="font-sans text-xl font-bold tracking-tight text-[#E0E0E0]">
                  Earth<span className="text-[#8B65BF] font-medium">&</span>Escape
                </span>
              </div>
              <p className="text-sm leading-relaxed text-[#8B65BF]/80 max-w-xs">
                A mystical portal celebrating sustainable architecture and romantic destinations, shrouded in an ethereal violet haze.
              </p>
              <div className="flex space-x-4">
                <span className="text-xs text-[#4E3473]">✦ Instagram • Pinterest • Twitter ✦</span>
              </div>
            </div>

            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[#8B65BF]">
                    Explore
                  </h3>
                  <ul role="list" className="mt-4 space-y-3">
                    <li><Link href="/blog" className="text-sm text-[#E0E0E0]/60 hover:text-[#8B65BF] transition-colors">All Articles</Link></li>
                    <li><Link href="/blog?category=earthen-architecture" className="text-sm text-[#E0E0E0]/60 hover:text-[#8B65BF] transition-colors">Earthen Homes</Link></li>
                    <li><Link href="/blog?category=hot-tub-getaways" className="text-sm text-[#E0E0E0]/60 hover:text-[#8B65BF] transition-colors">Hot Tub Escapes</Link></li>
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[#8B65BF]">
                    Information
                  </h3>
                  <ul role="list" className="mt-4 space-y-3">
                    <li><Link href="/about" className="text-sm text-[#E0E0E0]/60 hover:text-[#8B65BF] transition-colors">About Us</Link></li>
                    <li><Link href="/services" className="text-sm text-[#E0E0E0]/60 hover:text-[#8B65BF] transition-colors">Services</Link></li>
                    <li><Link href="/contact" className="text-sm text-[#E0E0E0]/60 hover:text-[#8B65BF] transition-colors">Contact</Link></li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#8B65BF]">
                  Legal
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                  <li><Link href="/privacy-policy" className="text-sm text-[#E0E0E0]/60 hover:text-[#8B65BF] transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="text-sm text-[#E0E0E0]/60 hover:text-[#8B65BF] transition-colors">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-[#4E3473]/40 pt-8">
            <p className="text-xs text-[#4E3473] text-center">
              ✦ © {new Date().getFullYear()} Earth &amp; Escape Blog. All rights reserved. Built with Next.js &amp; TailwindCSS. ✦
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
