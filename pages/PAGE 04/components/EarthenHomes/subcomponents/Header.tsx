// components/EarthenHomes/subcomponents/Header.tsx
import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Techniques', href: '/earth-building-techniques' },
  { label: 'Design', href: '/earth-sheltered-homes' },
  { label: 'Off-Grid Living', href: '/earthships-off-grid-living' },
  { label: 'Affordable', href: '/affordable-earthen-homes' },
  { label: 'Benefits', href: '/benefits-of-earthen-homes' },
];

/**
 * Site Header (O01)
 * - Sticky with scroll-compact behavior
 * - Mobile drawer for <1024px
 * - Custom SVG logo replaces emoji (resolves M4)
 */
export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-earth-cream/90 backdrop-blur-md shadow-subtle' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Logo />

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-earth-text-secondary hover:text-earth-brown transition-colors relative group py-1"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-earth-green transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-earth-brown text-white text-sm font-medium rounded-pill hover:bg-earth-brown-dark transition-colors focus:outline-none focus:ring-2 focus:ring-earth-brown focus:ring-offset-2"
            >
              Contact Us
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-earth-brown"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div id="mobile-menu" className="lg:hidden bg-earth-cream/95 backdrop-blur-md border-t border-earth-stone">
          <nav className="px-4 py-6 space-y-4" aria-label="Mobile">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block text-base font-medium text-earth-text-secondary hover:text-earth-brown"
                onClick={() => setIsMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-earth-brown text-white text-sm font-medium rounded-pill mt-4"
            >
              Contact Us
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};