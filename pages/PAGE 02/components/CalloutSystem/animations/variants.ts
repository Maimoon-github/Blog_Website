import { Variants } from 'framer-motion';

/**
 * Organic, gentle easing — consistent with HomepageHero and earth-tone brand.
 */

export const calloutContainerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1.0],
        },
    },
};

export const calloutItemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1.0],
        },
    },
};

export const statFigureVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.7,
            delay: 0.1,
            ease: [0.25, 0.1, 0.25, 1.0],
        },
    },
};

export const staggerListVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.15,
        },
    },
};

export const listItemVariants: Variants = {
    hidden: { opacity: 0, x: -12 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1.0],
        },
    },
};

export const reducedMotionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
};