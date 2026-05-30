// src/components/Footer.tsx
"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#4E3473]/60 bg-[#1F1A40]/80">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span
                className="h-8 w-8 rounded-lg bg-[#5F2DA6] flex items-center justify-center text-white font-bold text-lg"
                style={{ boxShadow: "0 0 10px rgba(95,45,166,0.5)" }}
              >
                🪷
              </span>
              <span className="font-sans text-xl font-bold tracking-tight text-[#E0E0E0]">
                Earth<span className="text-[#8B65BF] font-medium">&</span>Escape
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[#8B65BF]/80 max-w-xs">
              A mystical portal celebrating sustainable architecture and
              romantic destinations, shrouded in an ethereal violet haze.
            </p>
            <div className="flex space-x-4">
              <span className="text-xs text-[#4E3473]">
                ✦ Instagram • Pinterest • Twitter ✦
              </span>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#8B65BF]">
                  Explore
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                  <li>
                    <Link
                      href="/blog"
                      className="text-sm text-[#E0E0E0]/60 hover:text-[#8B65BF] transition-colors"
                    >
                      All Articles
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog?category=earthen-architecture"
                      className="text-sm text-[#E0E0E0]/60 hover:text-[#8B65BF] transition-colors"
                    >
                      Earthen Homes
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog?category=hot-tub-getaways"
                      className="text-sm text-[#E0E0E0]/60 hover:text-[#8B65BF] transition-colors"
                    >
                      Hot Tub Escapes
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#8B65BF]">
                  Information
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                  <li>
                    <Link
                      href="/about"
                      className="text-sm text-[#E0E0E0]/60 hover:text-[#8B65BF] transition-colors"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services"
                      className="text-sm text-[#E0E0E0]/60 hover:text-[#8B65BF] transition-colors"
                    >
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-sm text-[#E0E0E0]/60 hover:text-[#8B65BF] transition-colors"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#8B65BF]">
                Legal
              </h3>
              <ul role="list" className="mt-4 space-y-3">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-sm text-[#E0E0E0]/60 hover:text-[#8B65BF] transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-[#E0E0E0]/60 hover:text-[#8B65BF] transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[#4E3473]/40 pt-8">
          <p className="text-xs text-[#4E3473] text-center">
            ✦ © {new Date().getFullYear()} Earth &amp; Escape Blog. All rights
            reserved. Built with Next.js &amp; TailwindCSS. ✦
          </p>
        </div>
      </div>
    </footer>
  );
}