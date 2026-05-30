// components/EarthenHomes/subcomponents/Hero.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * Page Hero (O02)
 * - Full-bleed image with gradient overlay for text legibility
 * - Curved bottom SVG transition (avoids clip-path perf issues)
 * - Split-color heading matching the design reference
 */
export const Hero: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-earth-cream-dark">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-earth-sheltered.jpg"
          alt="Modern earth-sheltered home with curved green roof and large glass facade"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-earth-cream/95 via-earth-cream/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40 w-full">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
            <span className="text-earth-green">Welcome to The</span>
            <br />
            <span className="text-earth-brown">Earthen Homes</span>
          </h1>
          <p className="text-lg sm:text-xl text-earth-text-secondary mb-8 max-w-lg leading-relaxed">
            Your Complete Guide to Natural, Sustainable Earth-Based Living
          </p>
          <a
            href="#explore"
            className="inline-flex items-center gap-2 px-6 py-3 bg-earth-brown text-white font-medium rounded-pill hover:bg-earth-brown-dark transition-all hover:gap-3 focus:outline-none focus:ring-2 focus:ring-earth-brown focus:ring-offset-2"
          >
            Learn More
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Curved Bottom Edge */}
      <div className="absolute bottom-0 left-0 right-0 leading-none">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block" preserveAspectRatio="none">
          <path d="M0 100L1440 100L1440 50C1440 50 1200 0 720 0C240 0 0 50 0 50L0 100Z" fill="#FAF9F6" />
        </svg>
      </div>
    </section>
  );
};