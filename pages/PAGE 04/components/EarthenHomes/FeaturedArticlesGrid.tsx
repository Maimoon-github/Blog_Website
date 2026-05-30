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
