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