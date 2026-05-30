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