import React from 'react';
import { motion } from 'framer-motion';
import { PrincipleCalloutData } from '../types';
import { calloutContainerVariants, reducedMotionVariants } from '../animations/variants';

interface Props {
  data: PrincipleCalloutData;
  prefersReducedMotion: boolean;
}

/**
 * PrincipleCallout — educational definition.
 * Treatment: serif italic body, left border accent, no box fill.
 */
export const PrincipleCallout: React.FC<<Props> = ({ data, prefersReducedMotion }) => {
  const variants = prefersReducedMotion ? reducedMotionVariants : calloutContainerVariants;

  return (
    <motion.aside
      variants={variants}
      initial="hidden"
      animate="visible"
      className="relative max-w-2xl border-l-4 border-[#2d5a27] py-2 pl-6 md:pl-8"
      aria-label="Key principle"
    >
      <span className="mb-2 block font-sans text-xs font-semibold uppercase tracking-widest text-[#8c7d6d]">
        {data.label}
      </span>
      <p className="font-serif text-lg italic leading-relaxed text-[#4a3f35] md:text-xl" style={{ lineHeight: 1.7 }}>
        {data.body}
      </p>
      {data.footnote && (
        <p className="mt-3 font-sans text-sm text-[#8c7d6d]">
          {data.footnote}
        </p>
      )}
    </motion.aside>
  );
};