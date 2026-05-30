// components/EarthenHomes/subcomponents/PrincipleCallout.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { fadeInUp } from '../animations/variants';

interface PrincipleCalloutProps {
  title: string;
  children: React.ReactNode;
}

/**
 * Principle variant: editorial, serif italic, left border accent, no box fill.
 * Signals "this is a definition or foundational truth."
 */
export const PrincipleCallout: React.FC<<PrincipleCalloutProps> = ({ title, children }) => {
  const { ref, isInView } = useScrollAnimation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : 'hidden'}
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className="border-l-4 border-earth-brown pl-6 lg:pl-8 py-2"
    >
      <h3 className="text-lg font-bold text-earth-brown mb-3 tracking-wide">{title}</h3>
      <div className="font-serif italic text-earth-text-secondary leading-relaxed text-lg lg:text-xl max-w-prose">
        {children}
      </div>
    </motion.div>
  );
};