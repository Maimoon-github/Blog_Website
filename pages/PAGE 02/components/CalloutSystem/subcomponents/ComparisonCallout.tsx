import React from 'react';
import { motion } from 'framer-motion';
import { ComparisonCalloutData } from '../types';
import { calloutContainerVariants, calloutItemVariants, reducedMotionVariants } from '../animations/variants';

interface Props {
  data: ComparisonCalloutData;
  prefersReducedMotion: boolean;
}

/**
 * ComparisonCallout — two figures side-by-side with context.
 * Treatment: split layout, both numbers equally weighted, label between.
 */
export const ComparisonCallout: React.FC<<Props> = ({ data, prefersReducedMotion }) => {
  const variants = prefersReducedMotion ? reducedMotionVariants : calloutContainerVariants;
  const itemVars = prefersReducedMotion ? reducedMotionVariants : calloutItemVariants;

  return (
    <motion.aside
      variants={variants}
      initial="hidden"
      animate="visible"
      className="relative max-w-2xl rounded-lg border border-[#e8e0d4] bg-[#faf8f3] p-6 md:p-8"
      aria-label="Comparison data"
    >
      <span className="mb-6 block font-sans text-xs font-semibold uppercase tracking-widest text-[#8c7d6d]">
        {data.label}
      </span>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        <motion.div variants={itemVars} className="text-center md:text-left">
          <span className="block font-serif text-4xl font-bold text-[#4a3f35] md:text-5xl">
            {data.leftFigure}
          </span>
          <span className="mt-1 block font-sans text-sm uppercase tracking-wider text-[#8c7d6d]">
            {data.leftLabel}
          </span>
        </motion.div>
        <motion.div variants={itemVars} className="text-center md:text-left">
          <span className="block font-serif text-4xl font-bold text-[#2d5a27] md:text-5xl">
            {data.rightFigure}
          </span>
          <span className="mt-1 block font-sans text-sm uppercase tracking-wider text-[#8c7d6d]">
            {data.rightLabel}
          </span>
        </motion.div>
      </div>
      <p className="mt-6 border-t border-[#e8e0d4] pt-4 font-sans text-base leading-relaxed text-[#5c4f42]">
        {data.context}
      </p>
    </motion.aside>
  );
};