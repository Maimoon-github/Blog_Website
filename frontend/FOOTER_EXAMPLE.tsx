/**
 * Footer Component - Refactored with Navigation Utilities
 * 
 * This is an example of how to refactor the existing Footer to use the new
 * centralized navigation configuration.
 * 
 * Key improvements:
 * - Uses FOOTER_NAVIGATION from lib/navigation.ts
 * - Uses SITE_CONFIG for branding
 * - Cleaner, more maintainable code
 * - Easy to update all footer links from one place
 */

import Link from 'next/link';
import { FOOTER_NAVIGATION, SITE_CONFIG } from '@/lib/navigation';

const FooterExample = () => {
  return (
    <footer className="bg-lotus-shadow/50 border-t border-lotus-petal-dark/50 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand Column */}
          <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
            <Link
              href="/"
              className="inline-block text-xl sm:text-2xl font-bold gradient-text hover:opacity-80 transition-opacity"
            >
              {SITE_CONFIG.shortName}
            </Link>
            <p className="text-sm text-foreground/70 leading-relaxed max-w-xs">
              {SITE_CONFIG.description}
            </p>

            {/* Social Links */}
            <div className="flex justify-center sm:justify-start space-x-4 text-lotus-light pt-2">
              {FOOTER_NAVIGATION.social.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-xl hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-lotus-core rounded-lg p-1"
                  title={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {FOOTER_NAVIGATION.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/70 hover:text-lotus-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="text-center sm:text-left">
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              {FOOTER_NAVIGATION.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/70 hover:text-lotus-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup (Optional) */}
          <div className="text-center sm:text-left">
            <h3 className="font-semibold text-foreground mb-4">Newsletter</h3>
            <p className="text-sm text-foreground/70 mb-4">
              Stay updated with our latest articles and stories.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-3 py-2 bg-lotus-core/10 border border-lotus-petal-dark rounded-lg text-sm text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-lotus-core"
              />
              <button
                type="submit"
                className="w-full px-3 py-2 bg-lotus-core text-white text-sm font-medium rounded-lg hover:bg-lotus-core/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Divider */}
        <div className="border-t border-lotus-petal-dark/30 my-8 sm:my-10" />

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-sm text-foreground/60">
          <p>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p>
            Crafted with passion for sustainable living and romantic escapes.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterExample;
