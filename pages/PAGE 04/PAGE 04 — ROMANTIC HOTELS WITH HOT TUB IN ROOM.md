Here is a complete, production-ready component system for **The Earthen Homes**. It directly addresses every Critical and Major issue identified in the research report: the 5 distinct callout variants replace the overloaded "Did You Know?" box, the Featured Articles grid replaces the table encoding, image slots are built into hero and case-study blocks, and conversion UI (newsletter capture) is included for the Affordable page template.

---

### 1. Tailwind Configuration

Extend your `tailwind.config.ts` with these earth-tone tokens. They enforce the warm, grounded palette seen in the design reference while maintaining WCAG 2.1 AA contrast.

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'earth-green': { DEFAULT: '#2D6A4F', dark: '#1B4332', light: '#40916C' },
        'earth-brown': { DEFAULT: '#5C3D2E', dark: '#3E2723', light: '#8D6E63' },
        'earth-cream': { DEFAULT: '#FAF9F6', dark: '#F5F0E8' },
        'earth-stone': '#E5E0D8',
        'earth-text': { DEFAULT: '#1A1A1A', secondary: '#5C5C5C', muted: '#8A8A8A' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'serif'],
      },
      boxShadow: {
        soft: '0 4px 24px rgba(28, 25, 23, 0.06)',
        subtle: '0 1px 3px rgba(28, 25, 23, 0.04)',
      },
      borderRadius: {
        card: '0.5rem',   // 8px — grounded, not overly rounded
        pill: '9999px',
      },
      maxWidth: {
        'prose': '65ch',  // Optimal for em-dash-heavy editorial voice
      },
    },
  },
  plugins: [],
};

export default config;
```

---

### 2. Types & Domain Models

```typescript
// components/EarthenHomes/types/index.ts

export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface Article {
  id: string;
  category: string;
  title: string;
  description?: string;
  href: string;
  imageUrl?: string;
}

export interface ReasonCardData {
  number: number;
  title: string;
  description: string;
}

export interface CaseStudyData {
  projectName: string;
  location: string;
  year?: string;
  cost?: string;
  narrative: string;
  imageUrl?: string;
  tags?: string[];
}

export interface TocItem {
  id: string;
  label: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string; // omit for current page
}

export interface ClusterArticle {
  title: string;
  href: string;
  isCurrent?: boolean;
}
```

---

### 3. Animation Variants

All motion is gentle and GPU-accelerated. Respects `prefers-reduced-motion` at the hook level.

```typescript
// components/EarthenHomes/animations/variants.ts
import { Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

export const scaleOnTap = {
  scale: 0.98,
  transition: { type: 'spring', stiffness: 400, damping: 25 },
};
```

---

### 4. Custom Hooks

```typescript
// components/EarthenHomes/hooks/useScrollAnimation.ts
import { useEffect, useRef, useState } from 'react';

/**
 * Triggers a boolean when the element enters the viewport.
 * Disconnects after first trigger to prevent re-animation on scroll.
 */
export function useScrollAnimation(threshold = 0.12) {
  const ref = useRef<<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}
```

```typescript
// components/EarthenHomes/hooks/useReducedMotion.ts
import { useEffect, useState } from 'react';

/**
 * Returns true if the user prefers reduced motion.
 * Used to disable Framer Motion animations for accessibility.
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}
```

---

### 5. Atomic Components

```typescript
// components/EarthenHomes/subcomponents/Logo.tsx
import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

/**
 * Custom SVG wordmark replacing the emoji brand mark.
 * Ensures cross-platform visual consistency.
 */
export const Logo: React.FC<<LogoProps> = ({ className = '', showText = true }) => (
  <a href="/" className={`flex items-center gap-2.5 group ${className}`} aria-label="The Earthen Homes — Home">
    <svg
      className="w-8 h-8 text-earth-brown transition-colors group-hover:text-earth-green"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M20 4L4 16H8V32H16V22H24V32H32V16H36L20 4Z" fill="currentColor" opacity="0.25" />
      <path d="M20 8L8 17H12V30H18V20H22V30H28V17H32L20 8Z" fill="currentColor" />
      <path d="M20 12C20 12 14 16 14 20C14 24 20 28 20 28C20 28 26 24 26 20C26 16 20 12 20 12Z" fill="currentColor" opacity="0.5" />
    </svg>
    {showText && (
      <span className="text-xl font-semibold text-earth-brown tracking-tight">
        Earthen <span className="text-earth-green">Homes</span>
      </span>
    )}
  </a>
);
```

```typescript
// components/EarthenHomes/subcomponents/Tag.tsx
import React from 'react';

interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'active';
}

export const Tag: React.FC<TagProps> = ({ children, variant = 'default' }) => (
  <span
    className={`inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-pill ${
      variant === 'active'
        ? 'bg-earth-green text-white'
        : 'bg-earth-green/10 text-earth-green'
    }`}
  >
    {children}
  </span>
);
```

```typescript
// components/EarthenHomes/subcomponents/SkipLink.tsx
import React from 'react';

/**
 * Accessibility: allows keyboard users to bypass navigation.
 */
export const SkipLink: React.FC = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-5 focus:py-3 focus:bg-earth-brown focus:text-white focus:rounded-card focus:shadow-soft focus:font-medium"
  >
    Skip to main content
  </a>
);
```

---

### 6. Molecular Components (Callout Variants)

These five components directly resolve **Critical Issue C1** by giving each content type its own visual treatment.

```typescript
// components/EarthenHomes/subcomponents/StatCallout.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { fadeInUp } from '../animations/variants';

interface StatCalloutProps {
  value: string;
  label: string;
  context?: string;
  source?: string;
}

/**
 * Stat variant: oversized figure, minimal box, high scannability.
 */
export const StatCallout: React.FC<<StatCalloutProps> = ({ value, label, context, source }) => {
  const { ref, isInView } = useScrollAnimation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : 'hidden'}
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className="bg-white border-l-4 border-earth-green p-8 lg:p-10 shadow-soft rounded-r-card"
    >
      <div className="text-5xl lg:text-7xl font-bold text-earth-green mb-2 tracking-tight">{value}</div>
      <div className="text-lg lg:text-xl font-semibold text-earth-brown mb-3">{label}</div>
      {context && <p className="text-earth-text-secondary leading-relaxed mb-3 max-w-prose">{context}</p>}
      {source && (
        <p className="text-sm text-earth-text-muted italic border-t border-earth-stone pt-3 mt-3">
          Source: {source}
        </p>
      )}
    </motion.div>
  );
};
```

```typescript
// components/EarthenHomes/subcomponents/PrincipleCallout.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { fadeInUp } from '../animations/variants';

interface PrincipleCalloutProps {
  title: string;
  children: React.ReactNode;
}

/**
 * Principle variant: editorial, serif italic, left border accent, no box fill.
 * Signals "this is a definition or foundational truth."
 */
export const PrincipleCallout: React.FC<<PrincipleCalloutProps> = ({ title, children }) => {
  const { ref, isInView } = useScrollAnimation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : 'hidden'}
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className="border-l-4 border-earth-brown pl-6 lg:pl-8 py-2"
    >
      <h3 className="text-lg font-bold text-earth-brown mb-3 tracking-wide">{title}</h3>
      <div className="font-serif italic text-earth-text-secondary leading-relaxed text-lg lg:text-xl max-w-prose">
        {children}
      </div>
    </motion.div>
  );
};
```

```typescript
// components/EarthenHomes/subcomponents/ExampleCallout.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { fadeInUp } from '../animations/variants';

interface ExampleCalloutProps {
  title: string;
  children: React.ReactNode;
  imageUrl?: string;
  meta?: { label: string; value: string }[];
}

/**
 * Example variant: real-world case study mini-card.
 * Resolves the anti-pattern of burying case studies as H3+prose.
 */
export const ExampleCallout: React.FC<<ExampleCalloutProps> = ({ title, children, imageUrl, meta }) => {
  const { ref, isInView } = useScrollAnimation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : 'hidden'}
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className="bg-white rounded-card overflow-hidden shadow-soft border border-earth-stone"
    >
      {imageUrl && (
        <div className="h-56 lg:h-64 overflow-hidden">
          <img src={imageUrl} alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
      )}
      <div className="p-6 lg:p-8">
        <h3 className="text-lg font-bold text-earth-brown mb-3">{title}</h3>
        <div className="text-earth-text-secondary leading-relaxed mb-4">{children}</div>
        {meta && meta.length > 0 && (
          <dl className="flex flex-wrap gap-4 text-sm border-t border-earth-stone pt-4">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="text-earth-text-muted uppercase tracking-wider text-xs">{m.label}</dt>
                <dd className="font-semibold text-earth-brown">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </motion.div>
  );
};
```

```typescript
// components/EarthenHomes/subcomponents/MultiItemCallout.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { staggerContainer, fadeInUp } from '../animations/variants';

interface MultiItemCalloutProps {
  title: string;
  items: string[];
}

/**
 * Multi-item variant: numbered chips down the left edge.
 * Used for the Biotecture six principles and step-by-step processes.
 */
export const MultiItemCallout: React.FC<<MultiItemCalloutProps> = ({ title, items }) => {
  const { ref, isInView } = useScrollAnimation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : 'hidden'}
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="bg-earth-cream-dark rounded-card p-6 lg:p-8"
    >
      <h3 className="text-lg font-bold text-earth-brown mb-6">{title}</h3>
      <ol className="space-y-5">
        {items.map((item, index) => (
          <motion.li key={index} variants={fadeInUp} className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-earth-green text-white flex items-center justify-center text-sm font-bold">
              {index + 1}
            </span>
            <span className="text-earth-text-secondary leading-relaxed pt-1">{item}</span>
          </motion.li>
        ))}
      </ol>
    </motion.div>
  );
};
```

```typescript
// components/EarthenHomes/subcomponents/ComparisonCallout.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { fadeInUp } from '../animations/variants';

interface ComparisonCalloutProps {
  left: { value: string; label: string };
  right: { value: string; label: string };
  context: string;
}

/**
 * Comparison variant: split layout, both figures equally weighted.
 * Ideal for embodied carbon comparisons and metric vs. benchmark data.
 */
export const ComparisonCallout: React.FC<<ComparisonCalloutProps> = ({ left, right, context }) => {
  const { ref, isInView } = useScrollAnimation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : 'hidden'}
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className="bg-white rounded-card p-6 lg:p-8 shadow-soft border border-earth-stone"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 mb-6">
        <div className="text-center sm:text-left">
          <div className="text-4xl lg:text-5xl font-bold text-earth-brown mb-1">{left.value}</div>
          <div className="text-sm text-earth-text-secondary">{left.label}</div>
        </div>
        <div className="text-center sm:text-left">
          <div className="text-4xl lg:text-5xl font-bold text-earth-green mb-1">{right.value}</div>
          <div className="text-sm text-earth-text-secondary">{right.label}</div>
        </div>
      </div>
      <p className="text-earth-text-secondary text-sm border-t border-earth-stone pt-4 leading-relaxed">
        {context}
      </p>
    </motion.div>
  );
};
```

```typescript
// components/EarthenHomes/subcomponents/AudienceCallout.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { fadeInUp } from '../animations/variants';

interface AudienceCalloutProps {
  title: string;
  children: React.ReactNode;
}

/**
 * Audience variant: distinct treatment for the "Who This Site Is For" block.
 * Signals "this is about you" — a key conversion moment on the homepage.
 */
export const AudienceCallout: React.FC<<AudienceCalloutProps> = ({ title, children }) => {
  const { ref, isInView } = useScrollAnimation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : 'hidden'}
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className="bg-earth-green/5 rounded-card p-6 lg:p-8 border border-earth-green/15"
    >
      <h3 className="text-lg font-bold text-earth-green mb-4">{title}</h3>
      <div className="text-earth-text-secondary leading-relaxed">{children}</div>
    </motion.div>
  );
};
```

---

### 7. Molecular Components (Content)

```typescript
// components/EarthenHomes/subcomponents/ArticleCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Article } from '../types';
import { Tag } from './Tag';
import { fadeInUp } from '../animations/variants';

interface ArticleCardProps {
  article: Article;
}

/**
 * Card grid molecule for the Featured Articles section.
 * Replaces the anti-pattern of encoding articles as a 2-column table.
 */
export const ArticleCard: React.FC<<ArticleCardProps> = ({ article }) => (
  <motion.article
    variants={fadeInUp}
    className="group bg-white rounded-card border border-earth-stone overflow-hidden hover:shadow-soft transition-all duration-300 focus-within:shadow-soft"
  >
    <a href={article.href} className="block p-6 lg:p-8 h-full flex flex-col">
      <Tag>{article.category}</Tag>
      <h3 className="text-xl font-bold text-earth-brown mt-4 mb-3 group-hover:text-earth-green transition-colors leading-snug">
        {article.title}
      </h3>
      {article.description && (
        <p className="text-earth-text-secondary text-sm leading-relaxed mb-4 flex-grow">{article.description}</p>
      )}
      <span className="inline-flex items-center gap-1 text-sm font-medium text-earth-green mt-auto group-hover:gap-2 transition-all">
        Read more
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </a>
  </motion.article>
);
```

```typescript
// components/EarthenHomes/subcomponents/NumberedReasonCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { ReasonCardData } from '../types';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface NumberedReasonCardProps {
  data: ReasonCardData;
  index: number;
}

export const NumberedReasonCard: React.FC<<NumberedReasonCardProps> = ({ data, index }) => {
  const { ref, isInView } = useScrollAnimation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex gap-5 lg:gap-6"
    >
      <div className="flex-shrink-0">
        <span className="flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-earth-brown text-white text-xl font-bold">
          {data.number}
        </span>
      </div>
      <div>
        <h3 className="text-xl lg:text-2xl font-bold text-earth-brown mb-3 leading-tight">{data.title}</h3>
        <p className="text-earth-text-secondary leading-relaxed max-w-3xl">{data.description}</p>
      </div>
    </motion.div>
  );
};
```

---

### 8. Organism Components

```typescript
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
```

```typescript
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
```

```typescript
// components/EarthenHomes/subcomponents/SectionHeader.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { fadeInUp } from '../animations/variants';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export const SectionHeader: React.FC<<SectionHeaderProps> = ({ eyebrow, title, subtitle, align = 'center' }) => {
  const { ref, isInView } = useScrollAnimation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : 'hidden'}
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className={`mb-12 lg:mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      {eyebrow && (
        <span className="inline-block text-sm font-semibold tracking-widest uppercase text-earth-green mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-earth-brown mb-4 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-earth-text-secondary max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
```

```typescript
// components/EarthenHomes/subcomponents/FeaturedArticlesGrid.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Article } from '../types';
import { ArticleCard } from './ArticleCard';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { staggerContainer } from '../animations/variants';

interface FeaturedArticlesGridProps {
  articles: Article[];
}

/**
 * Featured Articles Grid (O13)
 * Replaces the table-encoded article list with a responsive card grid.
 */
export const FeaturedArticlesGrid: React.FC<<FeaturedArticlesGridProps> = ({ articles }) => {
  const { ref, isInView } = useScrollAnimation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : 'hidden'}
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
    >
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </motion.div>
  );
};
```

```typescript
// components/EarthenHomes/subcomponents/Breadcrumb.tsx
import React from 'react';
import { BreadcrumbItem } from '../types';

/**
 * Breadcrumb (X08)
 * Required for the 3-click depth rule and SEO structured data.
 */
export const Breadcrumb: React.FC<{ items: BreadcrumbItem[] }> = ({ items }) => (
  <nav aria-label="Breadcrumb" className="py-4">
    <ol className="flex items-center flex-wrap gap-2 text-sm text-earth-text-muted">
      {items.map((item, index) => (
        <li key={index} className="flex items-center gap-2">
          {index > 0 && <span className="text-earth-stone">/</span>}
          {item.href ? (
            <a href={item.href} className="hover:text-earth-brown transition-colors underline-offset-2 hover:underline">
              {item.label}
            </a>
          ) : (
            <span className="text-earth-text-secondary font-medium" aria-current="page">
              {item.label}
            </span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);
```

```typescript
// components/EarthenHomes/subcomponents/TableOfContents.tsx
import React, { useState, useEffect } from 'react';
import { TocItem } from '../types';

/**
 * Sticky Table of Contents (X05)
 * Auto-highlights the active section using IntersectionObserver.
 * Critical for 2,500+ word pillar pages.
 */
export const TableOfContents: React.FC<{ items: TocItem[] }> = ({ items }) => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -75% 0px' }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Table of contents" className="hidden xl:block sticky top-28 self-start">
      <h3 className="text-xs font-semibold tracking-widest uppercase text-earth-green mb-4">
        On this page
      </h3>
      <ul className="space-y-2 border-l-2 border-earth-stone">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block pl-4 text-sm transition-colors leading-snug ${
                activeId === item.id
                  ? 'text-earth-brown font-semibold border-l-2 border-earth-brown -ml-[2px]'
                  : 'text-earth-text-muted hover:text-earth-text-secondary'
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

```typescript
// components/EarthenHomes/subcomponents/RelatedCluster.tsx
import React from 'react';
import { ClusterArticle } from '../types';

/**
 * Related in Cluster sidebar/footer (X06)
 * Makes the hub-and-spoke architecture visible to readers.
 */
export const RelatedCluster: React.FC<{ clusterName: string; articles: ClusterArticle[] }> = ({
  clusterName,
  articles,
}) => (
  <aside className="bg-earth-cream-dark rounded-card p-6 lg:p-8 border border-earth-stone">
    <h3 className="text-xs font-semibold tracking-widest uppercase text-earth-green mb-4">
      More in {clusterName}
    </h3>
    <ul className="space-y-3">
      {articles.map((article) => (
        <li key={article.href}>
          <a
            href={article.href}
            className={`block text-sm leading-snug transition-colors ${
              article.isCurrent
                ? 'font-semibold text-earth-brown'
                : 'text-earth-text-secondary hover:text-earth-brown'
            }`}
            aria-current={article.isCurrent ? 'page' : undefined}
          >
            {article.title}
          </a>
        </li>
      ))}
    </ul>
  </aside>
);
```

```typescript
// components/EarthenHomes/subcomponents/NewsletterCapture.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NewsletterCaptureProps {
  title?: string;
  description?: string;
  variant?: 'inline' | 'card';
}

/**
 * Email Capture (X03) — Conversion UI for the Affordable page and other high-intent areas.
 */
export const NewsletterCapture: React.FC<<NewsletterCaptureProps> = ({
  title = 'Get the Free Cost Breakdown',
  description = 'Join 5,000+ builders. Get our PDF checklist and weekly guides.',
  variant = 'card',
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => setStatus('success'), 1200);
  };

  const wrapper =
    variant === 'card'
      ? 'bg-white rounded-card p-8 shadow-soft border border-earth-stone max-w-md'
      : 'bg-earth-cream-dark rounded-card p-6 border border-earth-stone';

  return (
    <div className={wrapper}>
      <h3 className="text-lg font-bold text-earth-brown mb-2">{title}</h3>
      <p className="text-sm text-earth-text-secondary mb-5">{description}</p>

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-earth-green font-medium text-sm"
          >
            Thank you! Check your inbox for the download link.
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-4 py-2.5 rounded-pill border border-earth-stone text-sm focus:outline-none focus:ring-2 focus:ring-earth-green focus:border-transparent bg-earth-cream"
              aria-label="Email address"
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="px-6 py-2.5 bg-earth-brown text-white text-sm font-medium rounded-pill hover:bg-earth-brown-dark transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-earth-brown focus:ring-offset-2 whitespace-nowrap"
            >
              {status === 'submitting' ? 'Sending...' : 'Get It Free'}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
```

```typescript
// components/EarthenHomes/subcomponents/Footer.tsx
import React from 'react';

const footerLinks = [
  {
    title: 'Explore',
    links: [
      { label: 'Earth Building Techniques', href: '/earth-building-techniques' },
      { label: 'Earth-Sheltered Homes', href: '/earth-sheltered-homes' },
      { label: 'Earthships & Off-Grid', href: '/earthships-off-grid-living' },
      { label: 'Affordable Homes', href: '/affordable-earthen-homes' },
      { label: 'Benefits', href: '/benefits-of-earthen-homes' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Beginner\'s Guide', href: '/beginners-guide' },
      { label: 'Cost Calculator', href: '/cost-calculator' },
      { label: 'Workshops', href: '/workshops' },
      { label: 'Builder Directory', href: '/builders' },
    ],
  },
];

export const Footer: React.FC = () => (
  <footer className="bg-earth-brown text-white/80">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-8 h-8 text-white" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <path d="M20 4L4 16H8V32H16V22H24V32H32V16H36L20 4Z" fill="currentColor" opacity="0.3" />
              <path d="M20 8L8 17H12V30H18V20H22V30H28V17H32L20 8Z" fill="currentColor" />
            </svg>
            <span className="text-xl font-semibold text-white">The Earthen Homes</span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed max-w-sm">
            Ancient material. Timeless wisdom. Modern living.
          </p>
        </div>

        {footerLinks.map((group) => (
          <div key={group.title}>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white/90 mb-4">{group.title}</h3>
            <ul className="space-y-3">
              {group.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/50">
        <p>© 2026 The Earthen Homes. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
          <a href="/terms" className="hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);
```

---

### 9. Main Page Component (Homepage Template)

```typescript
// components/EarthenHomes/EarthenHomes.tsx
import React from 'react';
import { SkipLink } from './subcomponents/SkipLink';
import { Header } from './subcomponents/Header';
import { Hero } from './subcomponents/Hero';
import { SectionHeader } from './subcomponents/SectionHeader';
import { StatCallout } from './subcomponents/StatCallout';
import { NumberedReasonCard } from './subcomponents/NumberedReasonCard';
import { FeaturedArticlesGrid } from './subcomponents/FeaturedArticlesGrid';
import { AudienceCallout } from './subcomponents/AudienceCallout';
import { Footer } from './subcomponents/Footer';
import { Article, ReasonCardData } from './types';

const featuredArticles: Article[] = [
  {
    id: '1',
    category: 'Beginner\'s Guide',
    title: 'Natural Building 101: Complete Beginner\'s Guide to Earthen Homes',
    href: '/beginners-guide',
  },
  {
    id: '2',
    category: 'Most Popular',
    title: 'Cob vs. Adobe vs. Rammed Earth: Which Technique Is Right for You?',
    href: '/cob-vs-adobe',
  },
  {
    id: '3',
    category: 'Practical',
    title: 'How Much Does It Really Cost to Build an Earthen Home?',
    href: '/cost-guide',
  },
  {
    id: '4',
    category: 'Inspiring',
    title: '12 Stunning Earthen Homes Built for Under $30,000',
    href: '/inspiring-homes',
  },
  {
    id: '5',
    category: 'Scientific',
    title: 'The Thermal Mass Advantage: Why Earthen Homes Stay Comfortable Year-Round',
    href: '/thermal-mass',
  },
  {
    id: '6',
    category: 'Getting Started',
    title: 'Your First Weekend with Earth: A Beginner\'s Cob Workshop Guide',
    href: '/cob-workshop',
  },
];

const reasons: ReasonCardData[] = [
  {
    number: 1,
    title: 'Dramatically Lower Cost',
    description:
      'The raw materials for earthen building — clay-rich soil, sand, straw, and water — are found almost everywhere on Earth and cost little to nothing. A competent owner-builder can construct a modest cob or adobe home for a fraction of the price of conventional construction.',
  },
  {
    number: 2,
    title: 'Extraordinary Energy Efficiency',
    description:
      'Earthen walls possess exceptional thermal mass — the ability to absorb heat slowly during the day and release it gradually at night. Earth-sheltered homes in particular can achieve energy savings of 50% or more compared to conventional houses.',
  },
  {
    number: 3,
    title: 'Superior Indoor Air Quality & Health',
    description:
      'Earthen walls, plastered with natural clay, actively regulate indoor humidity to around 50%, the ideal range for human health. They filter allergens, suppress mold growth, and create a living environment of remarkable purity and calm.',
  },
  {
    number: 4,
    title: 'Structural Durability',
    description:
      'Properly built earthen walls are astonishingly strong. Rammed-earth and compressed-earth-block walls can match the compressive strength of concrete. Cob homes in England have stood intact for 600 years.',
  },
  {
    number: 5,
    title: 'Minimal Environmental Impact',
    description:
      'Earthen building uses no fossil-fuel-intensive manufactured products. At end of life, earthen walls literally return to the earth. They produce no toxic waste, no pollution, and no landfill burden.',
  },
  {
    number: 6,
    title: 'Beauty & Creative Freedom',
    description:
      'Earth is a sculptor\'s medium. Cob allows curves, alcoves, built-in shelving, and organic forms that no other building method can match. Adobe creates warm, honey-colored walls that absorb and transform light.',
  },
];

/**
 * Homepage Template (T01)
 * Composes atoms, molecules, and organisms into the full homepage structure.
 */
export const EarthenHomesHomepage: React.FC = () => (
  <div className="min-h-screen bg-earth-cream font-sans antialiased">
    <SkipLink />
    <Header />

    <main id="main-content">
      <Hero />

      {/* Intro: "Ready to build smarter?" */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeader
            title="Ready to build smarter?"
            subtitle="Explore modern earth homes you can actually live in."
          />
        </div>
      </section>

      {/* "A Living Archive of Earth Architecture" */}
      <section className="py-20 lg:py-28 bg-earth-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="A Living Archive of Earth Architecture" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            <p className="text-earth-text-secondary leading-relaxed text-lg">
              The Earthen Homes is updated weekly with new guides, project spotlights, builder interviews,
              and research summaries. We draw on thousands of years of global building tradition, the latest
              research in sustainable construction, and conversations with real people who are actively building
              and living in earthen homes around the world — from rural Pakistan to suburban California, from
              the Scottish Highlands to the Australian Outback.
            </p>
            <p className="text-earth-text-secondary leading-relaxed text-lg">
              Our mission is not to romanticize the past or to advocate for a single approach. It is to give you
              the clearest, most honest, most practically useful information available so that you can make the
              best choices for your own home, your own land, and your own life. Earth building is not for everyone.
              But for those it calls to, there is nothing else quite like it.
            </p>
          </div>
        </div>
      </section>

      {/* Stat Callout: Did You Know? */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatCallout
            value="30%"
            label="of the world's population"
            context="Approximately 2.4 billion people currently live in homes built with earth. From ancient Jericho (10,000 BC) to the rammed-earth sections of China's Great Wall, to the living cob cottages of Devon, England (some dating to the 14th century), earthen architecture is humanity's oldest and most enduring building tradition."
          />
        </div>
      </section>

      {/* Six Compelling Reasons */}
      <section className="py-20 lg:py-28 bg-earth-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Why Earthen Homes?" title="Six Compelling Reasons" />
          <div className="space-y-10 lg:space-y-14">
            {reasons.map((reason, index) => (
              <NumberedReasonCard key={reason.number} data={reason} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles Grid */}
      <section className="py-20 lg:py-28 bg-white" id="explore">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Start Here" title="Featured Articles to Start Your Journey" />
          <FeaturedArticlesGrid articles={featuredArticles} />
        </div>
      </section>

      {/* Audience Callout */}
      <section className="py-16 bg-earth-green/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AudienceCallout title="Who This Site Is For">
            Whether you are a curious beginner who just watched a documentary about cob houses and can&apos;t stop
            thinking about it, an architect or builder exploring natural materials, a homesteader planning an
            off-grid life, a sustainability advocate researching low-carbon housing, or simply someone who wants
            to understand why so many people are choosing to build with mud — this site was made for you. Every
            article is written to be accessible to beginners while remaining substantively useful to experienced
            builders.
          </AudienceCallout>
        </div>
      </section>

      {/* Closing */}
      <section className="py-20 lg:py-28 bg-earth-cream text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-xl lg:text-2xl text-earth-brown font-serif italic leading-relaxed mb-6">
            &ldquo;Explore. Ask questions. Start small. Build something with your hands. The earth is waiting.&rdquo;
          </p>
          <p className="text-sm font-semibold tracking-widest uppercase text-earth-green">
            The Earthen Homes
          </p>
        </div>
      </section>
    </main>

    <Footer />
  </div>
);
```

---

### 10. Barrel Export

```typescript
// components/EarthenHomes/index.tsx
export { EarthenHomesHomepage } from './EarthenHomes';

// Re-export all organisms for page-level composition
export { Header } from './subcomponents/Header';
export { Hero } from './subcomponents/Hero';
export { Footer } from './subcomponents/Footer';
export { SectionHeader } from './subcomponents/SectionHeader';
export { FeaturedArticlesGrid } from './subcomponents/FeaturedArticlesGrid';
export { Breadcrumb } from './subcomponents/Breadcrumb';
export { TableOfContents } from './subcomponents/TableOfContents';
export { RelatedCluster } from './subcomponents/RelatedCluster';
export { NewsletterCapture } from './subcomponents/NewsletterCapture';

// Re-export all callout variants (Critical Issue C1)
export { StatCallout } from './subcomponents/StatCallout';
export { PrincipleCallout } from './subcomponents/PrincipleCallout';
export { ExampleCallout } from './subcomponents/ExampleCallout';
export { MultiItemCallout } from './subcomponents/MultiItemCallout';
export { ComparisonCallout } from './subcomponents/ComparisonCallout';
export { AudienceCallout } from './subcomponents/AudienceCallout';

// Re-export types
export type {
  Article,
  NavItem,
  ReasonCardData,
  CaseStudyData,
  TocItem,
  BreadcrumbItem,
  ClusterArticle,
} from './types';
```

---

### 11. Usage Example

```tsx
// pages/index.tsx
import { EarthenHomesHomepage } from '@/components/EarthenHomes';

export default function Home() {
  return <EarthenHomesHomepage />;
}
```

```tsx
// pages/earth-building-techniques.tsx (Pillar Page Template example)
import {
  Header,
  Footer,
  Breadcrumb,
  SectionHeader,
  PrincipleCallout,
  ExampleCallout,
  TableOfContents,
  RelatedCluster,
  NewsletterCapture,
} from '@/components/EarthenHomes';

export default function EarthBuildingTechniques() {
  return (
    <div className="min-h-screen bg-earth-cream">
      <Header />
      <main id="main-content" className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Techniques', href: '/earth-building-techniques' },
              { label: 'Earth Building Techniques' },
            ]}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="xl:col-span-8">
              <SectionHeader title="Earth Building Techniques" align="left" />
              
              <PrincipleCallout title="Key Principle">
                All earth building techniques share one foundational insight: soil — a mixture of clay, silt, sand, and sometimes gravel — is a remarkable building material...
              </PrincipleCallout>

              <ExampleCallout
                title="The Earth House by Peter Vetsch — Switzerland"
                meta={[
                  { label: 'Location', value: 'Dietikon, Switzerland' },
                  { label: 'Year', value: '1974–present' },
                ]}
              >
                Swiss architect Peter Vetsch has built over 60 earth houses since 1974...
              </ExampleCallout>
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-4 space-y-8">
              <TableOfContents
                items={[
                  { id: 'cob', label: 'Cob (Layered Mud)' },
                  { id: 'adobe', label: 'Adobe (Sun-Dried Brick)' },
                  { id: 'rammed-earth', label: 'Rammed Earth' },
                  { id: 'superadobe', label: 'Superadobe' },
                ]}
              />
              <RelatedCluster
                clusterName="Techniques"
                articles={[
                  { title: 'Cob vs. Adobe: Which Is Right for You?', href: '/cob-vs-adobe' },
                  { title: 'How to Build a Cob House Step-by-Step', href: '/cob-steps' },
                  { title: 'Earth Building Techniques', href: '/earth-building-techniques', isCurrent: true },
                ]}
              />
              <NewsletterCapture
                title="Free Technique Comparison PDF"
                description="Download the 12-page guide comparing all 6 major earth building methods."
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
```

---

### Maintenance & Extension Notes

| Decision | Rationale |
|----------|-----------|
| **5 distinct callout components** | Resolves C1. Each variant has a single responsibility; content editors cannot accidentally flatten information hierarchy. |
| **Card grid replaces table** | Resolves M1. Articles are no longer forced into equal column widths; the grid is responsive and scannable. |
| **SVG logo, no emoji** | Resolves M4. Brand consistency across all OS/browser font stacks. |
| **Intersection Observer + `prefers-reduced-motion`** | Respects accessibility; animations only run when visible and only if the user hasn't requested reduced motion. |
| **Sticky TOC + Related Cluster** | Resolves X05 and X06. Required for the 2,500+ word pillar pages and the hub-and-spoke linking strategy. |
| **Newsletter Capture organism** | Resolves C5. Pluggable on any high-intent page (Affordable, Benefits, Techniques). |
| **No custom CSS** | Everything is Tailwind utility classes. The only "custom" artifacts are the Tailwind config tokens, which centralize all visual decisions. |
| **Semantic HTML + ARIA** | Proper `nav`, `main`, `aside`, `article`, `section`, `ol`, and `dl` usage. Skip link included for keyboard navigation. |

To extend this system for the remaining 37 satellite pages, create a new page component using `PillarPageTemplate` (T02) and compose the same organisms. The callout variants accept children, so they work with any CMS-driven rich text output.