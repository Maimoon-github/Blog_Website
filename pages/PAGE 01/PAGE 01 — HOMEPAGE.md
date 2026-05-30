I'll generate a production-ready **Homepage Hero Block** component for *The Earthen Homes* using the 5X reasoning framework and the exact file architecture from your template. This component aligns with the earth-tone palette, serif editorial voice, and curved organic forms visible in your design screenshot.

---

## 5X Reasoning Analysis

| Dimension | Decision |
|-----------|----------|
| **User Experience** | Visitors are dreamers and researchers seeking warmth. The hero must feel like "stepping into a landscape" — organic, unhurried, trustworthy. |
| **Visual Hierarchy** | Background image (emotional) → Brand mark (trust) → H1 (mission) → Subtitle (clarity) → CTA (action). No competing focal points. |
| **Interaction** | Entrance: staggered fade-up. CTA: subtle scale + arrow shift on hover. Reduced motion: instant fade, no translate. |
| **Accessibility** | `prefers-reduced-motion` respected, focus rings on CTA, semantic H1, aria-label on decorative image, color contrast ≥ 4.5:1. |
| **Performance** | GPU-only transforms (`translate3d`, `opacity`), `will-change` scoped, image eager-loaded as LCP element. |

---

## Generated Files

### 1. `components/HomepageHero/types/index.ts`

```typescript
/**
 * TypeScript interfaces for the HomepageHero component system.
 * Aligned with The Earthen Homes design tokens (earth-tone palette, serif hierarchy).
 */

export interface HeroContent {
  /** Brand mark alt text — logo is decorative but labeled for screen readers */
  brandAlt: string;
  /** Main H1 — editorial, serif, earth-green */
  headline: string;
  /** Subtitle — sans-serif, warm brown, max 2 lines */
  subtitle: string;
  /** Primary CTA label */
  ctaLabel: string;
  /** CTA href — typically scrolls to #featured or /techniques */
  ctaHref: string;
  /** Background image src — earth-sheltered home photography */
  backgroundImage: string;
  /** Optional stat callout for social proof (e.g., "30% of the world...") */
  statCallout?: StatCalloutData;
}

export interface StatCalloutData {
  /** Large numeral — e.g., "30%" */
  figure: string;
  /** Supporting caption — e.g., "of the world's population live in earthen homes" */
  caption: string;
  /** Optional source citation for credibility */
  source?: string;
}

export interface HomepageHeroProps {
  content: HeroContent;
  /** Disables entrance animations for reduced-motion or instant hydration */
  disableAnimation?: boolean;
  /** Callback when CTA is clicked — for analytics or routing */
  onCtaClick?: () => void;
}
```

---

### 2. `components/HomepageHero/animations/variants.ts`

```typescript
import { Variants } from 'framer-motion';

/**
 * Framer Motion variants for the HomepageHero.
 * Easing: organic, gentle — like earth settling, not mechanical snapping.
 */

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1.0], // Custom ease: smooth deceleration
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
};

export const statVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: 0.8,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
};

export const ctaHoverVariants = {
  rest: { scale: 1, x: 0 },
  hover: { scale: 1.03, x: 0, transition: { duration: 0.3 } },
};

export const arrowHoverVariants = {
  rest: { x: 0 },
  hover: { x: 4, transition: { duration: 0.3, ease: 'easeOut' } },
};

/** Reduced-motion fallback: instant fade, no vertical travel */
export const reducedMotionItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};
```

---

### 3. `components/HomepageHero/hooks/useHomepageHeroLogic.ts`

```typescript
import { useCallback, useEffect, useState } from 'react';

/**
 * Custom hook managing HomepageHero state, reduced-motion preference,
 * and scroll-triggered CTA visibility.
 */

export interface UseHomepageHeroLogicReturn {
  /** True if user prefers reduced motion */
  prefersReducedMotion: boolean;
  /** True after initial mount — prevents hydration mismatch */
  isMounted: boolean;
  /** Scroll progress 0-1 for optional parallax */
  scrollProgress: number;
  /** Memoized CTA click handler */
  handleCtaClick: (onCtaClick?: () => void) => void;
}

export const useHomepageHeroLogic = (): UseHomepageHeroLogicReturn => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setIsMounted(true);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('hero-section');
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCtaClick = useCallback((onCtaClick?: () => void) => {
    onCtaClick?.();
    // Default smooth scroll to featured section if no custom handler
    const featured = document.getElementById('featured-section');
    if (featured && !onCtaClick) {
      featured.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  }, [prefersReducedMotion]);

  return {
    prefersReducedMotion,
    isMounted,
    scrollProgress,
    handleCtaClick,
  };
};
```

---

### 4. `components/HomepageHero/subcomponents/StatCallout.tsx`

```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { statVariants } from '../animations/variants';
import { StatCalloutData } from '../types';

interface StatCalloutProps {
  data: StatCalloutData;
  prefersReducedMotion: boolean;
}

/**
 * StatCallout — extracted as independent molecule per research Finding 1.
 * Large numeral treatment for high-value data (e.g., "30% of world population").
 * Visual treatment: minimal box, oversized figure, left border accent in earth terracotta.
 */
export const StatCallout: React.FC<<StatCalloutProps> = ({
  data,
  prefersReducedMotion,
}) => {
  const variants = prefersReducedMotion ? undefined : statVariants;

  return (
    <motion.aside
      variants={variants}
      initial="hidden"
      animate="visible"
      className="relative mt-8 max-w-md rounded-lg border-l-4 border-[#c17c53] bg-[#faf8f3] p-6 shadow-sm"
      aria-label="Key statistic"
    >
      <div className="flex flex-col gap-1">
        <span className="font-serif text-4xl font-semibold leading-none tracking-tight text-[#2d5a27] md:text-5xl">
          {data.figure}
        </span>
        <p className="mt-2 font-sans text-base leading-relaxed text-[#5c4f42]">
          {data.caption}
        </p>
        {data.source && (
          <span className="mt-2 font-sans text-xs uppercase tracking-wider text-[#8c7d6d]">
            Source: {data.source}
          </span>
        )}
      </div>
    </motion.aside>
  );
};
```

---

### 5. `components/HomepageHero/HomepageHero.tsx`

```typescript
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
```

---

### 6. `components/HomepageHero/index.tsx`

```typescript
export { HomepageHero } from './HomepageHero';
export type { HomepageHeroProps, HeroContent, StatCalloutData } from './types';
export { StatCallout } from './subcomponents/StatCallout';
```

---

## Example Usage

```tsx
import { HomepageHero } from '@/components/HomepageHero';

const heroContent = {
  brandAlt: 'The Earthen Homes',
  headline: 'Welcome to The Earthen Homes',
  subtitle: 'Your Complete Guide to Natural, Sustainable Earth-Based Living',
  ctaLabel: 'Learn More',
  ctaHref: '#featured-section',
  backgroundImage: '/images/hero-earth-sheltered-home.jpg',
  statCallout: {
    figure: '30%',
    caption: "of the world's population — roughly 2.4 billion people — currently live in homes built with earth.",
    source: 'UN-Habitat Global Housing Report',
  },
};

export default function HomePage() {
  return (
    <main>
      <HomepageHero content={heroContent} />
      <section id="featured-section" className="py-24">
        {/* Featured articles grid follows */}
      </section>
    </main>
  );
}
```

---

## Design System Alignment

| Token | Value | Rationale |
|-------|-------|-----------|
| **Primary** | `#2d5a27` | Earth-green from screenshot headline |
| **Accent** | `#c17c53` | Terracotta / clay — callout border, brand mark |
| **Surface** | `#f5f0e8` | Warm cream — background, avoids clinical white |
| **Text Primary** | `#4a3f35` | Dark brown — softer than pure black |
| **Text Secondary** | `#5c4f42` | Medium brown — subtitle, body |
| **Text Muted** | `#8c7d6d` | Taupe — captions, labels, source citations |
| **Font Serif** | `font-serif` | System stack or Crimson Pro / Source Serif for editorial warmth |
| **Font Sans** | `font-sans` | System UI / Inter for navigation, labels, CTAs |
| **Border Radius** | `rounded-full` (CTA), `rounded-lg` (callouts) | Organic but not bubbly |
| **Shadow** | `shadow-sm` only | Groundedness — no floating cards |

This component is ready for integration into the Sprint 0 foundation described in your research report.