// components/EarthenHomes/subcomponents/ExampleCallout.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { fadeInUp } from '../animations/variants';

interface ExampleCalloutProps {
  title: string;
  children: React.ReactNode;
  imageUrl?: string;
  meta?: { label: string; value: string }[];
}

/**
 * Example variant: real-world case study mini-card.
 * Resolves the anti-pattern of burying case studies as H3+prose.
 */
export const ExampleCallout: React.FC<<ExampleCalloutProps> = ({ title, children, imageUrl, meta }) => {
  const { ref, isInView } = useScrollAnimation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : 'hidden'}
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className="bg-white rounded-card overflow-hidden shadow-soft border border-earth-stone"
    >
      {imageUrl && (
        <div className="h-56 lg:h-64 overflow-hidden">
          <img src={imageUrl} alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
      )}
      <div className="p-6 lg:p-8">
        <h3 className="text-lg font-bold text-earth-brown mb-3">{title}</h3>
        <div className="text-earth-text-secondary leading-relaxed mb-4">{children}</div>
        {meta && meta.length > 0 && (
          <dl className="flex flex-wrap gap-4 text-sm border-t border-earth-stone pt-4">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="text-earth-text-muted uppercase tracking-wider text-xs">{m.label}</dt>
                <dd className="font-semibold text-earth-brown">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </motion.div>
  );
};