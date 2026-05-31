// src/components/Footer.tsx
import Link from 'next/link';

const Footer = () => {
  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/services', label: 'Services' },
  ];

  const legalLinks = [
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ];

  return (
    <footer className="bg-lotus-shadow/50 border-t border-lotus-petal-dark/50 mt-auto">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold gradient-text">Earthen Escapes</h3>
            <p className="text-sm text-foreground/70">
              Organic architecture, eco‑living & romantic hot tub getaways.
            </p>
            <div className="flex space-x-4 text-lotus-light">
              {/* Social Icons (replace with actual links) */}
              <a href="#" aria-label="Twitter" className="hover:text-white transition">🐦</a>
              <a href="#" aria-label="Instagram" className="hover:text-white transition">📷</a>
              <a href="#" aria-label="GitHub" className="hover:text-white transition">💻</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-lotus-light">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground/70 hover:text-lotus-light transition text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-lotus-light">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground/70 hover:text-lotus-light transition text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter (optional) */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-lotus-light">Stay Updated</h4>
            <p className="text-sm text-foreground/70 mb-3">
              Get the latest articles and offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-lg bg-lotus-void/60 border border-lotus-petal-dark/50 text-sm focus:outline-none focus:ring-2 focus:ring-lotus-core"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-lotus-core hover:bg-lotus-core/80 text-white text-sm font-medium transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-lotus-petal-dark/30 text-center text-sm text-foreground/50">
          &copy; {new Date().getFullYear()} Earthen Escapes. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;