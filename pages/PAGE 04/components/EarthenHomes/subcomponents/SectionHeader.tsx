// components/EarthenHomes/subcomponents/SectionHeader.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { fadeInUp } from '../animations/variants';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export const SectionHeader: React.FC<<SectionHeaderProps> = ({ eyebrow, title, subtitle, align = 'center' }) => {
  const { ref, isInView } = useScrollAnimation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : 'hidden'}
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className={`mb-12 lg:mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      {eyebrow && (
        <span className="inline-block text-sm font-semibold tracking-widest uppercase text-earth-green mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-earth-brown mb-4 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-earth-text-secondary max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};