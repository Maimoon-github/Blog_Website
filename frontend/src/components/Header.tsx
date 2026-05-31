'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Detect scroll for sticky background effect
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/search', label: 'Search' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          hasScrolled
            ? 'glassmorphism shadow-lg backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            {/* Logo – touch‑friendly tap area */}
            <Link
              href="/"
              className="flex items-center py-2 px-1 -ml-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-lotus-core"
              aria-label="Home"
            >
              <span className="text-xl sm:text-2xl font-bold gradient-text whitespace-nowrap">
                Earthen Escapes
              </span>
            </Link>

            {/* Desktop Navigation – hidden on mobile */}
            <nav className="hidden lg:block">
              <ul className="flex space-x-1 md:space-x-2 lg:space-x-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-lotus-core ${
                        pathname === link.href
                          ? 'text-lotus-light bg-lotus-core/10 border-b-2 border-lotus-core'
                          : 'text-foreground/80 hover:text-lotus-light hover:bg-lotus-core/5'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Menu Button – touch‑optimised (min 44px) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg focus:outline-none focus:ring-2 focus:ring-lotus-core transition-colors hover:bg-lotus-core/10"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              <svg
                className="w-6 h-6 text-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay – full screen, touch‑optimised */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden bg-lotus-void/95 backdrop-blur-lg animate-in fade-in duration-300"
          onClick={() => setIsMenuOpen(false)} // close on background tap
        >
          <div className="flex flex-col items-center justify-center h-full px-4">
            <nav className="w-full max-w-sm">
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block w-full text-center py-4 px-6 rounded-xl text-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-lotus-core ${
                        pathname === link.href
                          ? 'bg-lotus-core/20 text-lotus-light'
                          : 'text-foreground/80 hover:bg-lotus-core/10 hover:text-lotus-light'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="mt-8 w-11 h-11 rounded-full bg-lotus-core/20 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-lotus-core"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;