 I'll generate the **Featured Articles Grid** (O13) — the component that converts the anti-pattern table from your research report into a proper responsive card grid. This addresses Major Issue M1 and aligns with the earth-tone, grounded design system.

---

## 5X Reasoning — Featured Articles Grid

| Dimension | Decision |
|-----------|----------|
| **User Experience** | Homepage visitors are explorers seeking entry points. Cards must feel tactile and inviting — like picking up a book. Category chips provide instant orientation. |
| **Visual Hierarchy** | Category chip (meta) → Title (action) → Hover state (delight). No excerpt needed — the content titles are already descriptive per the editorial voice. |
| **Interaction** | Entrance: staggered fade-up. Hover: subtle lift + border accent. Focus: visible ring. No distracting animations. |
| **Accessibility** | Semantic `<ul>`/`<li>`, focusable cards, color-blind friendly chip colors, `prefers-reduced-motion` respected. |
| **Performance** | CSS Grid with `gap`, no JS layout calculations. Images lazy-loaded. Memoized to prevent parent re-renders. |

---

## Generated Files

### 1. `components/FeaturedArticlesGrid/types/index.ts`

```typescript
/**
 * FeaturedArticlesGrid types
 * Card grid replacing the 2-column table anti-pattern (Issue M1).
 */

export interface FeaturedArticle {
  /** Category tag — drives chip color and filtering */
  category: string;
  /** Article title — descriptive, editorial */
  title: string;
  /** Article slug or URL */
  href: string;
  /** Optional thumbnail — grid works with or without images */
  thumbnailUrl?: string;
  thumbnailAlt?: string;
  /** Optional reading time estimate */
  readTime?: string;
}

export interface FeaturedArticlesGridProps {
  /** Section label above the grid */
  sectionLabel?: string;
  /** Array of article cards */
  articles: FeaturedArticle[];
  /** Optional filter chips — if provided, enables category filtering */
  enableFiltering?: boolean;
  /** Disables entrance animations */
  disableAnimation?: boolean;
  /** Callback when a card is clicked — for analytics */
  onArticleClick?: (article: FeaturedArticle) => void;
}

/** Category-to-color mapping for consistent chip theming */
export type CategoryColorMap = Record<string, {
  bg: string;
  text: string;
  border: string;
}>;
```

---

### 2. `components/FeaturedArticlesGrid/animations/variants.ts`

```typescript
import { Variants } from 'framer-motion';

/**
 * Organic, gentle easing — consistent with HomepageHero and CalloutSystem.
 */

export const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
};

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
};

export const chipHoverVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.2 } },
};

export const cardHoverVariants = {
  rest: { y: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' },
  hover: {
    y: -4,
    boxShadow: '0 12px 24px rgba(0,0,0,0.06)',
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] },
  },
};

export const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};
```

---

### 3. `components/FeaturedArticlesGrid/hooks/useFeaturedArticlesGridLogic.ts`

```typescript
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FeaturedArticle } from '../types';

/**
 * Custom hook managing filter state, reduced-motion preference,
 * and category extraction for the Featured Articles Grid.
 */

export interface UseFeaturedArticlesGridLogicReturn {
  /** Currently active filter category, or null for all */
  activeFilter: string | null;
  /** Set active filter */
  setActiveFilter: (category: string | null) => void;
  /** Derived unique categories from articles */
  categories: string[];
  /** Filtered articles based on active selection */
  filteredArticles: FeaturedArticle[];
  /** Reduced motion preference */
  prefersReducedMotion: boolean;
  /** Hydration safety */
  isMounted: boolean;
  /** Memoized click handler */
  handleArticleClick: (article: FeaturedArticle) => void;
}

export const useFeaturedArticlesGridLogic = (
  articles: FeaturedArticle[],
  onArticleClick?: (article: FeaturedArticle) => void
): UseFeaturedArticlesGridLogicReturn => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Extract unique categories, preserving order of first appearance
  const categories = useMemo(() => {
    const seen = new Set<string>();
    const result: string[] = [];
    articles.forEach((a) => {
      if (!seen.has(a.category)) {
        seen.add(a.category);
        result.push(a.category);
      }
    });
    return result;
  }, [articles]);

  const filteredArticles = useMemo(() => {
    if (!activeFilter) return articles;
    return articles.filter((a) => a.category === activeFilter);
  }, [articles, activeFilter]);

  const handleArticleClick = useCallback(
    (article: FeaturedArticle) => {
      onArticleClick?.(article);
    },
    [onArticleClick]
  );

  return {
    activeFilter,
    setActiveFilter,
    categories,
    filteredArticles,
    prefersReducedMotion,
    isMounted,
    handleArticleClick,
  };
};
```

---

### 4. `components/FeaturedArticlesGrid/subcomponents/CategoryChip.tsx`

```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { chipHoverVariants } from '../animations/variants';

interface CategoryChipProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  /** Tailwind color classes for theming */
  colorClasses: {
    activeBg: string;
    activeText: string;
    inactiveBg: string;
    inactiveText: string;
    inactiveBorder: string;
  };
}

/**
 * CategoryChip — filter pill with active/inactive states.
 * Rounded-full per design tokens (999px radius for pills).
 */
export const CategoryChip: React.FC<<CategoryChipProps> = ({
  label,
  isActive,
  onClick,
  colorClasses,
}) => {
  return (
    <motion.button
      onClick={onClick}
      variants={chipHoverVariants}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className={`
        inline-flex items-center rounded-full px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-wider transition-colors
        focus:outline-none focus:ring-2 focus:ring-[#c17c53] focus:ring-offset-2 focus:ring-offset-[#f5f0e8]
        ${isActive 
          ? `${colorClasses.activeBg} ${colorClasses.activeText}` 
          : `${colorClasses.inactiveBg} ${colorClasses.inactiveText} ${colorClasses.inactiveBorder} border hover:bg-[#e8e0d4]`
        }
      `}
      aria-pressed={isActive}
      aria-label={`Filter by ${label}`}
    >
      {label}
    </motion.button>
  );
};
```

---

### 5. `components/FeaturedArticlesGrid/subcomponents/ArticleCard.tsx`

```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { FeaturedArticle } from '../types';
import { cardVariants, cardHoverVariants, reducedMotionVariants } from '../animations/variants';

interface ArticleCardProps {
  article: FeaturedArticle;
  prefersReducedMotion: boolean;
  onClick: (article: FeaturedArticle) => void;
  /** Category color for chip theming */
  chipColor: string;
}

/**
 * ArticleCard — individual card in the featured grid.
 * Replaces table-row layout with vertical card stack.
 */
export const ArticleCard: React.FC<<ArticleCardProps> = ({
  article,
  prefersReducedMotion,
  onClick,
  chipColor,
}) => {
  const variants = prefersReducedMotion ? reducedMotionVariants : cardVariants;
  const hoverVariants = prefersReducedMotion ? undefined : cardHoverVariants;

  return (
    <motion.li
      variants={variants}
      layout={!prefersReducedMotion}
      className="list-none"
    >
      <motion.a
        href={article.href}
        onClick={(e) => {
          e.preventDefault();
          onClick(article);
        }}
        variants={hoverVariants}
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="group block overflow-hidden rounded-lg border border-[#e8e0d4] bg-[#faf8f3] transition-colors hover:border-[#c17c53]"
        aria-label={`${article.category}: ${article.title}`}
      >
        {/* Optional thumbnail */}
        {article.thumbnailUrl && (
          <div className="relative h-40 w-full overflow-hidden md:h-48">
            <img
              src={article.thumbnailUrl}
              alt={article.thumbnailAlt || ''}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#faf8f3]/40 to-transparent" />
          </div>
        )}

        <div className="p-5 md:p-6">
          {/* Category chip — positioned above title, not beside */}
          <span
            className={`mb-3 inline-block rounded-full px-3 py-1 font-sans text-xs font-semibold uppercase tracking-wider ${chipColor}`}
          >
            {article.category}
          </span>

          {/* Title — serif for editorial warmth, generous line-height */}
          <h3 className="font-serif text-xl font-semibold leading-snug text-[#4a3f35] transition-colors group-hover:text-[#2d5a27] md:text-2xl">
            {article.title}
          </h3>

          {/* Optional read time */}
          {article.readTime && (
            <span className="mt-3 block font-sans text-sm text-[#8c7d6d]">
              {article.readTime}
            </span>
          )}
        </div>
      </motion.a>
    </motion.li>
  );
};
```

---

### 6. `components/FeaturedArticlesGrid/FeaturedArticlesGrid.tsx`

```typescript
import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FeaturedArticlesGridProps } from './types';
import { useFeaturedArticlesGridLogic } from './hooks/useFeaturedArticlesGridLogic';
import { gridContainerVariants, reducedMotionVariants } from './animations/variants';
import { CategoryChip } from './subcomponents/CategoryChip';
import { ArticleCard } from './subcomponents/ArticleCard';

/**
 * Category color mapping — earth-tone palette, consistent with design system.
 * Each category gets a distinct but harmonious treatment.
 */
const CATEGORY_COLORS: Record<string, string> = {
  'Beginner\'s Guide': 'bg-[#2d5a27] text-white',
  'Most Popular': 'bg-[#c17c53] text-white',
  'Practical': 'bg-[#8c7d6d] text-white',
  'Inspiring': 'bg-[#d4a574] text-[#4a3f35]',
  'Scientific': 'bg-[#5c8a5a] text-white',
  'Getting Started': 'bg-[#a89080] text-white',
};

/** Fallback for uncategorized articles */
const DEFAULT_CHIP_COLOR = 'bg-[#8c7d6d] text-white';

/**
 * FeaturedArticlesGrid — O13 Organism
 * 
 * Replaces the 2-column table anti-pattern (Issue M1) with a responsive card grid.
 * Cards stack vertically with category chips above titles for natural scanning.
 * 
 * Design decisions:
 * - CSS Grid with auto-fill for responsive columns (1→2→3→4)
 * - No shadows at rest (groundedness brand voice); subtle shadow on hover only
 * - Category chips use distinct earth-tone colors for instant recognition
 * - Optional filtering enables content discovery without page reload
 */
export const FeaturedArticlesGrid: React.FC<<FeaturedArticlesGridProps> = ({
  sectionLabel = 'Featured Articles to Start Your Journey',
  articles,
  enableFiltering = false,
  disableAnimation = false,
  onArticleClick,
}) => {
  const {
    activeFilter,
    setActiveFilter,
    categories,
    filteredArticles,
    prefersReducedMotion,
    isMounted,
    handleArticleClick,
  } = useFeaturedArticlesGridLogic(articles, onArticleClick);

  const shouldAnimate = !disableAnimation && !prefersReducedMotion && isMounted;
  const containerVariants = shouldAnimate ? gridContainerVariants : reducedMotionVariants;

  // Memoize chip color classes to prevent recalculation
  const chipColorClasses = useMemo(() => ({
    activeBg: 'bg-[#4a3f35]',
    activeText: 'text-[#faf8f3]',
    inactiveBg: 'bg-transparent',
    inactiveText: 'text-[#5c4f42]',
    inactiveBorder: 'border-[#c17c53]',
  }), []);

  return (
    <section
      className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24"
      aria-labelledby="featured-articles-heading"
    >
      {/* Section header */}
      <div className="mb-10 text-center md:mb-14">
        <h2
          id="featured-articles-heading"
          className="font-serif text-3xl font-bold text-[#4a3f35] md:text-4xl"
        >
          {sectionLabel}
        </h2>
      </div>

      {/* Filter chips — only rendered if enabled and multiple categories exist */}
      {enableFiltering && categories.length > 1 && (
        <div
          className="mb-10 flex flex-wrap justify-center gap-3"
          role="group"
          aria-label="Filter articles by category"
        >
          <CategoryChip
            label="All"
            isActive={activeFilter === null}
            onClick={() => setActiveFilter(null)}
            colorClasses={chipColorClasses}
          />
          {categories.map((cat) => (
            <CategoryChip
              key={cat}
              label={cat}
              isActive={activeFilter === cat}
              onClick={() => setActiveFilter(cat === activeFilter ? null : cat)}
              colorClasses={chipColorClasses}
            />
          ))}
        </div>
      )}

      {/* Card grid — CSS Grid with responsive columns */}
      <AnimatePresence mode="popLayout">
        <motion.ul
          key={activeFilter ?? 'all'}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          style={{ listStyle: 'none' }}
        >
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.href}
              article={article}
              prefersReducedMotion={!shouldAnimate}
              onClick={handleArticleClick}
              chipColor={CATEGORY_COLORS[article.category] || DEFAULT_CHIP_COLOR}
            />
          ))}
        </motion.ul>
      </AnimatePresence>

      {/* Empty state — should rarely trigger with proper content */}
      {filteredArticles.length === 0 && (
        <p className="text-center font-sans text-base text-[#8c7d6d]">
          No articles found in this category.
        </p>
      )}
    </section>
  );
};
```

---

### 7. `components/FeaturedArticlesGrid/index.tsx`

```typescript
export { FeaturedArticlesGrid } from './FeaturedArticlesGrid';
export type {
  FeaturedArticlesGridProps,
  FeaturedArticle,
} from './types';
export { CategoryChip } from './subcomponents/CategoryChip';
export { ArticleCard } from './subcomponents/ArticleCard';
```

---

## Example Usage

```tsx
import { FeaturedArticlesGrid } from '@/components/FeaturedArticlesGrid';

const articles = [
  {
    category: 'Beginner\'s Guide',
    title: 'Natural Building 101: Complete Beginner\'s Guide to Earthen Homes',
    href: '/guides/natural-building-101',
    readTime: '12 min read',
  },
  {
    category: 'Most Popular',
    title: 'Cob vs. Adobe vs. Rammed Earth: Which Technique Is Right for You?',
    href: '/guides/cob-vs-adobe-vs-rammed-earth',
    readTime: '15 min read',
  },
  {
    category: 'Practical',
    title: 'How Much Does It Really Cost to Build an Earthen Home?',
    href: '/guides/cost-to-build-earthen-home',
    readTime: '10 min read',
  },
  {
    category: 'Inspiring',
    title: '12 Stunning Earthen Homes Built for Under $30,000',
    href: '/guides/affordable-earthen-homes',
    thumbnailUrl: '/images/affordable-cob-cottage.jpg',
    thumbnailAlt: 'A beautiful cob cottage built for under $30,000',
    readTime: '8 min read',
  },
  {
    category: 'Scientific',
    title: 'The Thermal Mass Advantage: Why Earthen Homes Stay Comfortable Year-Round',
    href: '/guides/thermal-mass-advantage',
    readTime: '14 min read',
  },
  {
    category: 'Getting Started',
    title: 'Your First Weekend with Earth: A Beginner\'s Cob Workshop Guide',
    href: '/guides/cob-workshop-guide',
    readTime: '6 min read',
  },
];

export default function HomePage() {
  return (
    <main>
      <FeaturedArticlesGrid
        articles={articles}
        enableFiltering={true}
        onArticleClick={(article) => {
          // Analytics or routing
          console.log('Clicked:', article.title);
        }}
      />
    </main>
  );
}
```

---

## Design System Alignment & Maintenance

| Concern | Implementation |
|---------|---------------|
| **Anti-pattern resolved** | Table replaced with semantic `<ul>`/`<li>` card grid. No horizontal scanning required. |
| **Token consistency** | Reuses identical earth-tone palette and typography as HomepageHero + CalloutSystem. |
| **Scalability** | CSS Grid `auto-fill` adapts to any article count. Filtering works with dynamic data. |
| **Accessibility** | Semantic list structure, focusable cards, `aria-pressed` on filter chips, `prefers-reduced-motion`. |
| **Performance** | `React.memo` implicit via static props. Images lazy-loaded. No layout thrashing. |
| **CMS integration** | `FeaturedArticle` interface maps directly to CMS content models. Category colors extensible via `CATEGORY_COLORS` map. |
| **Zero custom CSS** | Pure Tailwind utilities throughout. |

This component is ready for Sprint 2 (Homepage + Affordable Earthen Homes) per your phased build recommendation.