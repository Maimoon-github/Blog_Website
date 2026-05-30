import React from 'react';
import { motion } from 'framer-motion';
import { MultiItemCalloutData } from '../types';
import { staggerListVariants, listItemVariants, reducedMotionVariants } from '../animations/variants';

interface Props {
  data: MultiItemCalloutData;
  prefersReducedMotion: boolean;
}

/**
 * MultiItemCallout — numbered or bulleted list-as-callout.
 * Treatment: numbered chips down the left edge, items spaced.
 */
export const MultiItemCallout: React.FC<<Props> = ({ data, prefersReducedMotion }) => {
  const containerVariants = prefersReducedMotion ? reducedMotionVariants : staggerListVariants;
  const itemVars = prefersReducedMotion ? reducedMotionVariants : listItemVariants;

  return (
    <motion.aside
      className="relative max-w-2xl rounded-lg border border-[#e8e0d4] bg-[#faf8f3] p-6 md:p-8"
      aria-label="List of principles"
    >
      <span className="mb-4 block font-sans text-xs font-semibold uppercase tracking-widest text-[#8c7d6d]">
        {data.label}
      </span>
      <motion.ol
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={data.numbered === false ? 'list-none space-y-3' : 'list-none space-y-4'}
      >
        {data.items.map((item, index) => (
          <motion.li
            key={index}
            variants={itemVars}
            className="flex items-start gap-3"
          >
            {data.numbered !== false && (
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#2d5a27] font-sans text-xs font-bold text-white">
                {index + 1}
              </span>
            )}
            {data.numbered === false && (
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#c17c53]" />
            )}
            <span className="font-sans text-base leading-relaxed text-[#5c4f42]">
              {item}
            </span>
          </motion.li>
        ))}
      </motion.ol>
    </motion.aside>
  );
};