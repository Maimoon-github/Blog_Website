import React from 'react';
import { motion } from 'framer-motion';
import { ExampleCalloutData } from '../types';
import { calloutContainerVariants, calloutItemVariants, reducedMotionVariants } from '../animations/variants';

interface Props {
  data: ExampleCalloutData;
  prefersReducedMotion: boolean;
}

/**
 * ExampleCallout — real-world case mini-card.
 * Treatment: card with project name header, narrative body, optional photo slot.
 */
export const ExampleCallout: React.FC<<Props> = ({ data, prefersReducedMotion }) => {
  const variants = prefersReducedMotion ? reducedMotionVariants : calloutContainerVariants;

  return (
    <motion.aside
      variants={variants}
      initial="hidden"
      animate="visible"
      className="relative max-w-2xl overflow-hidden rounded-lg border border-[#e8e0d4] bg-[#faf8f3]"
      aria-label="Real world example"
    >
      {data.imageUrl && (
        <div className="relative h-48 w-full overflow-hidden md:h-56">
          <img
            src={data.imageUrl}
            alt={data.imageAlt || ''}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#faf8f3] via-transparent to-transparent" />
        </div>
      )}
      <div className="p-6 md:p-8">
        <span className="mb-3 block font-sans text-xs font-semibold uppercase tracking-widest text-[#c17c53]">
          {data.label}
        </span>
        <p className="font-sans text-base leading-relaxed text-[#5c4f42]" style={{ lineHeight: 1.7 }}>
          {data.narrative}
        </p>
        {data.meta && data.meta.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {data.meta.map((m) => (
              <span
                key={m.key}
                className="inline-flex items-center rounded-full bg-[#f5f0e8] px-3 py-1 font-sans text-xs text-[#5c4f42]"
              >
                <span className="mr-1 font-semibold text-[#4a3f35]">{m.key}:</span>
                {m.value}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.aside>
  );
};