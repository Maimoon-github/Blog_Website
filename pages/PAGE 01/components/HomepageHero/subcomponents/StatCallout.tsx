import React from 'react';
import { motion } from 'framer-motion';
import { statVariants } from '../animations/variants';
import { StatCalloutData } from '../types';

interface StatCalloutProps {
  data: StatCalloutData;
  prefersReducedMotion: boolean;
}

/**
 * StatCallout — extracted as independent molecule per research Finding 1.
 * Large numeral treatment for high-value data (e.g., "30% of world population").
 * Visual treatment: minimal box, oversized figure, left border accent in earth terracotta.
 */
export const StatCallout: React.FC<<StatCalloutProps> = ({
  data,
  prefersReducedMotion,
}) => {
  const variants = prefersReducedMotion ? undefined : statVariants;

  return (
    <motion.aside
      variants={variants}
      initial="hidden"
      animate="visible"
      className="relative mt-8 max-w-md rounded-lg border-l-4 border-[#c17c53] bg-[#faf8f3] p-6 shadow-sm"
      aria-label="Key statistic"
    >
      <div className="flex flex-col gap-1">
        <span className="font-serif text-4xl font-semibold leading-none tracking-tight text-[#2d5a27] md:text-5xl">
          {data.figure}
        </span>
        <p className="mt-2 font-sans text-base leading-relaxed text-[#5c4f42]">
          {data.caption}
        </p>
        {data.source && (
          <span className="mt-2 font-sans text-xs uppercase tracking-wider text-[#8c7d6d]">
            Source: {data.source}
          </span>
        )}
      </div>
    </motion.aside>
  );
};