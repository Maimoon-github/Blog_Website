'use client';

import Link from 'next/link';
import { SiteSettings } from '@/types/wagtail';

interface FooterProps {
  settings: SiteSettings | null;
}

const Footer = ({ settings }: FooterProps) => {
  const quickLinks = settings?.header_menu || [
    { url: '/', label: 'Home' },
    { url: '/blog', label: 'Blog' },
    { url: '/about', label: 'About' },
    { url: '/contact', label: 'Contact' },
    { url: '/services', label: 'Services' },
  ];

  const legalLinks = settings?.footer_menu || [
    { url: '/privacy-policy', label: 'Privacy Policy' },
    { url: '/terms', label: 'Terms of Service' },
  ];

  const socialLinks = [
    { href: settings?.twitter_url || '#', label: 'Twitter', icon: '🐦' },
    { href: settings?.instagram_url || '#', label: 'Instagram', icon: '📷' },
    { href: settings?.github_url || '#', label: 'GitHub', icon: '💻' },
    { href: settings?.facebook_url || '#', label: 'Facebook', icon: '👤' },
  ].filter(link => link.href !== '#');

  return (
    <footer className="bg-lotus-shadow/50 border-t border-lotus-petal-dark/50 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand Column */}
          <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold gradient-text">
                {settings?.site_name || 'Earthen Escapes'}
            </h3>
            <p className="text-sm text-foreground/70 leading-relaxed max-w-xs mx-auto sm:mx-0">
               {settings?.site_tagline || 'Organic architecture, eco‑living & romantic hot tub getaways.'}
            </p>
            <div className="flex justify-center sm:justify-start space-x-4 text-lotus-light">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-xl hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-lotus-core rounded-lg p-1"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-semibold mb-4 text-lotus-light">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.url}>
                  <Link
                    href={link.url}
                    className="text-sm text-foreground/70 hover:text-lotus-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-lotus-core rounded inline-block px-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-semibold mb-4 text-lotus-light">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.url}>
                  <Link
                    href={link.url}
                    className="text-sm text-foreground/70 hover:text-lotus-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-lotus-core rounded inline-block px-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-semibold mb-4 text-lotus-light">Stay Updated</h4>
            <p className="text-sm text-foreground/70 mb-3">
              Get the latest articles and offers.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-2"
            >
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-full bg-lotus-void/80 border border-lotus-petal-dark px-4 py-2 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-lotus-core"
                required
              />
              <button
                type="submit"
                className="rounded-full bg-lotus-core hover:bg-lotus-core/80 px-4 py-2 text-sm font-semibold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-lotus-core"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-10 sm:mt-12 pt-6 border-t border-lotus-petal-dark/30 text-center text-xs sm:text-sm text-foreground/50">
          &copy; {new Date().getFullYear()} {settings?.copyright_text || settings?.site_name || 'Earthen Escapes'}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;