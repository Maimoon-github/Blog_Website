// components/EarthenHomes/subcomponents/NumberedReasonCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { ReasonCardData } from '../types';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface NumberedReasonCardProps {
  data: ReasonCardData;
  index: number;
}

export const NumberedReasonCard: React.FC<<NumberedReasonCardProps> = ({ data, index }) => {
  const { ref, isInView } = useScrollAnimation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex gap-5 lg:gap-6"
    >
      <div className="flex-shrink-0">
        <span className="flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-earth-brown text-white text-xl font-bold">
          {data.number}
        </span>
      </div>
      <div>
        <h3 className="text-xl lg:text-2xl font-bold text-earth-brown mb-3 leading-tight">{data.title}</h3>
        <p className="text-earth-text-secondary leading-relaxed max-w-3xl">{data.description}</p>
      </div>
    </motion.div>
  );
};