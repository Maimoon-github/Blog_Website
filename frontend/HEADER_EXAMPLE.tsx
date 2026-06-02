/**
 * Header Component - Refactored with Navigation Utilities
 * 
 * This is an example of how to refactor the existing Header to use the new
 * centralized navigation configuration and utilities.
 * 
 * Key improvements:
 * - Uses PRIMARY_NAVIGATION from lib/navigation.ts
 * - Uses isActiveRoute utility for active link detection
 * - Cleaner code structure
 * - Easy to maintain navigation updates
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PRIMARY_NAVIGATION, isActiveRoute } from '@/lib/navigation';

const HeaderExample = () => {
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
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center py-2 px-1 -ml-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-lotus-core"
              aria-label="Home"
            >
              <span className="text-xl sm:text-2xl font-bold gradient-text">
                🌍 Earthen Homes
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {PRIMARY_NAVIGATION.map((item) => {
                const active = isActiveRoute(item.href, pathname);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      px-3 py-2 rounded-lg text-sm font-medium transition-all
                      ${
                        active
                          ? 'text-lotus-core bg-lotus-core/10'
                          : 'text-foreground/70 hover:text-foreground hover:bg-lotus-core/5'
                      }
                    `}
                    title={item.description}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-lotus-core/10"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span
                className={`w-6 h-0.5 bg-foreground transition-all ${
                  isMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-foreground transition-all ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-foreground transition-all ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-lotus-shadow/95 backdrop-blur-sm border-b border-lotus-petal-dark/50">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {PRIMARY_NAVIGATION.map((item) => {
              const active = isActiveRoute(item.href, pathname);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    block px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${
                      active
                        ? 'text-lotus-core bg-lotus-core/10'
                        : 'text-foreground/70 hover:text-foreground hover:bg-lotus-core/5'
                    }
                  `}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </>
  );
};

export default HeaderExample;
