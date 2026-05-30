import React from 'react';
import { motion } from 'framer-motion';
import { HomepageHeroProps } from './types';
import {
  containerVariants,
  itemVariants,
  reducedMotionItemVariants,
  ctaHoverVariants,
  arrowHoverVariants,
} from './animations/variants';
import { useHomepageHeroLogic } from './hooks/useHomepageHeroLogic';
import { StatCallout } from './subcomponents/StatCallout';

/**
 * HomepageHero — O02 Page Hero Block
 * 
 * Design decisions derived from research report & screenshot:
 * - Serif H1 for editorial warmth ("Welcome to The Earthen Homes")
 * - Earth-green primary (#2d5a27) on warm cream background
 * - Curved bottom edge implied by overflow-hidden + rounded inner image
 * - No heavy shadows (groundedness brand voice — "elevation: none")
 * - Generous line-height (1.6) for em-dash-heavy editorial voice
 */

export const HomepageHero: React.FC<<HomepageHeroProps> = ({
  content,
  disableAnimation = false,
  onCtaClick,
}) => {
  const { prefersReducedMotion, isMounted, handleCtaClick } = useHomepageHeroLogic();
  const shouldAnimate = !disableAnimation && !prefersReducedMotion && isMounted;

  const activeContainer = shouldAnimate ? containerVariants : undefined;
  const activeItem = shouldAnimate ? itemVariants : reducedMotionItemVariants;

  return (
    <section
      id="hero-section"
      className="relative w-full overflow-hidden bg-[#f5f0e8]"
      aria-labelledby="hero-headline"
    >
      {/* Background image layer — LCP element, eager loaded */}
      <div className="absolute inset-0 z-0">
        <img
          src={content.backgroundImage}
          alt=""
          className="h-full w-full object-cover object-center"
          style={{ opacity: 0.35 }} // Subtle, doesn't compete with text
          loading="eager"
          aria-hidden="true"
        />
        {/* Warm overlay for text legibility without heavy shadow */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f5f0e8]/60 via-[#f5f0e8]/40 to-[#f5f0e8]/90" />
      </div>

      {/* Content layer */}
      <motion.div
        className="relative z-10 mx-auto flex max-w-7xl flex-col items-start justify-center px-6 py-24 md:px-12 md:py-32 lg:py-40"
        variants={activeContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Brand mark — decorative but labeled */}
        <motion.div variants={activeItem} className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#c17c53]">
            {/* SVG earth-strata mark — replaces emoji per research M4 */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-6 w-6 text-white"
              aria-hidden="true"
            >
              <path d="M2 20h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M4 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M8 8h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M10 4h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-sans text-sm font-semibold uppercase tracking-widest text-[#8c7d6d]">
            The Earthen Homes
          </span>
        </motion.div>

        {/* H1 — Editorial serif, earth-green, generous measure */}
        <motion.h1
          id="hero-headline"
          variants={activeItem}
          className="max-w-3xl font-serif text-4xl font-bold leading-[1.15] tracking-tight text-[#2d5a27] md:text-5xl lg:text-6xl"
          style={{ maxWidth: '18ch' }} // ~65-75ch for line-length discipline
        >
          {content.headline}
        </motion.h1>

        {/* Subtitle — Sans-serif, warm brown, max-width for readability */}
        <motion.p
          variants={activeItem}
          className="mt-6 max-w-xl font-sans text-lg leading-relaxed text-[#5c4f42] md:text-xl"
          style={{ lineHeight: 1.65 }}
        >
          {content.subtitle}
        </motion.p>

        {/* CTA — Pill shape, earthy brown, arrow icon */}
        <motion.div variants={activeItem} className="mt-10">
          <motion.a
            href={content.ctaHref}
            onClick={(e) => {
              e.preventDefault();
              handleCtaClick(onCtaClick);
            }}
            className="inline-flex items-center gap-3 rounded-full bg-[#4a3f35] px-8 py-4 font-sans text-sm font-semibold uppercase tracking-wider text-[#faf8f3] transition-colors hover:bg-[#3a322a] focus:outline-none focus:ring-2 focus:ring-[#c17c53] focus:ring-offset-2 focus:ring-offset-[#f5f0e8]"
            variants={ctaHoverVariants}
            initial="rest"
            whileHover="hover"
            animate="rest"
            aria-label={`${content.ctaLabel} — scroll to featured content`}
          >
            <span>{content.ctaLabel}</span>
            <motion.svg
              className="h-4 w-4"
              viewBox="0 0 16 16"
              fill="none"
              variants={arrowHoverVariants}
              aria-hidden="true"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.a>
        </motion.div>

        {/* Optional Stat Callout — only rendered if data provided */}
        {content.statCallout && (
          <StatCallout
            data={content.statCallout}
            prefersReducedMotion={prefersReducedMotion || disableAnimation}
          />
        )}
      </motion.div>

      {/* Curved bottom edge — organic, grounded, no sharp corners */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          className="w-full"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 80V40C240 80 480 0 720 0s480 80 720 40v40H0z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
};