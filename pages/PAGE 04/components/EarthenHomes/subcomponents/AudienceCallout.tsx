// components/EarthenHomes/subcomponents/AudienceCallout.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { fadeInUp } from '../animations/variants';

interface AudienceCalloutProps {
  title: string;
  children: React.ReactNode;
}

/**
 * Audience variant: distinct treatment for the "Who This Site Is For" block.
 * Signals "this is about you" — a key conversion moment on the homepage.
 */
export const AudienceCallout: React.FC<<AudienceCalloutProps> = ({ title, children }) => {
  const { ref, isInView } = useScrollAnimation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : 'hidden'}
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className="bg-earth-green/5 rounded-card p-6 lg:p-8 border border-earth-green/15"
    >
      <h3 className="text-lg font-bold text-earth-green mb-4">{title}</h3>
      <div className="text-earth-text-secondary leading-relaxed">{children}</div>
    </motion.div>
  );
};