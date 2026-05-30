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