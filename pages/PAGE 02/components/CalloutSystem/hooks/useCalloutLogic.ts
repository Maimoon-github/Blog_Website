import { useEffect, useState } from 'react';

/**
 * Minimal hook for reduced-motion detection and hydration safety.
 * Callouts are presentational, so logic is intentionally thin.
 */

export interface UseCalloutLogicReturn {
    prefersReducedMotion: boolean;
    isMounted: boolean;
}

export const useCalloutLogic = (): UseCalloutLogicReturn => {
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

    return { prefersReducedMotion, isMounted };
};