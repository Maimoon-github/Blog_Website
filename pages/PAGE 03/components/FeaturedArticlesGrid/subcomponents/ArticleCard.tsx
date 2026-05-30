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