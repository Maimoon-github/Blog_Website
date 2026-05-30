// components/EarthenHomes/subcomponents/MultiItemCallout.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { staggerContainer, fadeInUp } from '../animations/variants';

interface MultiItemCalloutProps {
  title: string;
  items: string[];
}

/**
 * Multi-item variant: numbered chips down the left edge.
 * Used for the Biotecture six principles and step-by-step processes.
 */
export const MultiItemCallout: React.FC<<MultiItemCalloutProps> = ({ title, items }) => {
  const { ref, isInView } = useScrollAnimation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : 'hidden'}
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="bg-earth-cream-dark rounded-card p-6 lg:p-8"
    >
      <h3 className="text-lg font-bold text-earth-brown mb-6">{title}</h3>
      <ol className="space-y-5">
        {items.map((item, index) => (
          <motion.li key={index} variants={fadeInUp} className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-earth-green text-white flex items-center justify-center text-sm font-bold">
              {index + 1}
            </span>
            <span className="text-earth-text-secondary leading-relaxed pt-1">{item}</span>
          </motion.li>
        ))}
      </ol>
    </motion.div>
  );
};
