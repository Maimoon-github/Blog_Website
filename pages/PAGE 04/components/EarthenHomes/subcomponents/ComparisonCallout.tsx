// components/EarthenHomes/subcomponents/ComparisonCallout.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { fadeInUp } from '../animations/variants';

interface ComparisonCalloutProps {
  left: { value: string; label: string };
  right: { value: string; label: string };
  context: string;
}

/**
 * Comparison variant: split layout, both figures equally weighted.
 * Ideal for embodied carbon comparisons and metric vs. benchmark data.
 */
export const ComparisonCallout: React.FC<<ComparisonCalloutProps> = ({ left, right, context }) => {
  const { ref, isInView } = useScrollAnimation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : 'hidden'}
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className="bg-white rounded-card p-6 lg:p-8 shadow-soft border border-earth-stone"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 mb-6">
        <div className="text-center sm:text-left">
          <div className="text-4xl lg:text-5xl font-bold text-earth-brown mb-1">{left.value}</div>
          <div className="text-sm text-earth-text-secondary">{left.label}</div>
        </div>
        <div className="text-center sm:text-left">
          <div className="text-4xl lg:text-5xl font-bold text-earth-green mb-1">{right.value}</div>
          <div className="text-sm text-earth-text-secondary">{right.label}</div>
        </div>
      </div>
      <p className="text-earth-text-secondary text-sm border-t border-earth-stone pt-4 leading-relaxed">
        {context}
      </p>
    </motion.div>
  );
};