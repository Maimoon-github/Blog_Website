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