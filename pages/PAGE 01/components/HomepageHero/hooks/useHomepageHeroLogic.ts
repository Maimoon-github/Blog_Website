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