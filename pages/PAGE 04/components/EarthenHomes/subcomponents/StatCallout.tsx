// components/EarthenHomes/subcomponents/StatCallout.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { fadeInUp } from '../animations/variants';

interface StatCalloutProps {
  value: string;
  label: string;
  context?: string;
  source?: string;
}

/**
 * Stat variant: oversized figure, minimal box, high scannability.
 */
export const StatCallout: React.FC<<StatCalloutProps> = ({ value, label, context, source }) => {
  const { ref, isInView } = useScrollAnimation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : 'hidden'}
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className="bg-white border-l-4 border-earth-green p-8 lg:p-10 shadow-soft rounded-r-card"
    >
      <div className="text-5xl lg:text-7xl font-bold text-earth-green mb-2 tracking-tight">{value}</div>
      <div className="text-lg lg:text-xl font-semibold text-earth-brown mb-3">{label}</div>
      {context && <p className="text-earth-text-secondary leading-relaxed mb-3 max-w-prose">{context}</p>}
      {source && (
        <p className="text-sm text-earth-text-muted italic border-t border-earth-stone pt-3 mt-3">
          Source: {source}
        </p>
      )}
    </motion.div>
  );
};