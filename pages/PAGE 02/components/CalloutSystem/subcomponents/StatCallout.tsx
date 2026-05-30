import React from 'react';
import { motion } from 'framer-motion';
import { StatCalloutData } from '../types';
import { calloutContainerVariants, statFigureVariants, reducedMotionVariants } from '../animations/variants';

interface Props {
  data: StatCalloutData;
  prefersReducedMotion: boolean;
}

/**
 * StatCallout — large numeral, short caption, optional citation.
 * Treatment: minimal box, oversized figure, left border accent.
 */
export const StatCallout: React.FC<<Props> = ({ data, prefersReducedMotion }) => {
  const variants = prefersReducedMotion ? reducedMotionVariants : calloutContainerVariants;
  const figureVariants = prefersReducedMotion ? undefined : statFigureVariants;

  return (
    <motion.aside
      variants={variants}
      initial="hidden"
      animate="visible"
      className="relative max-w-lg rounded-lg border-l-4 border-[#c17c53] bg-[#faf8f3] p-6 md:p-8"
      aria-label="Statistic"
    >
      <motion.span
        variants={figureVariants}
        className="block font-serif text-5xl font-bold leading-none tracking-tight text-[#2d5a27] md:text-6xl"
      >
        {data.figure}
      </motion.span>
      <p className="mt-3 font-sans text-base leading-relaxed text-[#5c4f42]">
        {data.caption}
      </p>
      {data.source && (
        <span className="mt-3 block font-sans text-xs uppercase tracking-wider text-[#8c7d6d]">
          Source: {data.source}
        </span>
      )}
    </motion.aside>
  );
};