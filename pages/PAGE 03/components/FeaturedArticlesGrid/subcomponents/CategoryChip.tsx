import React from 'react';
import { motion } from 'framer-motion';
import { chipHoverVariants } from '../animations/variants';

interface CategoryChipProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  /** Tailwind color classes for theming */
  colorClasses: {
    activeBg: string;
    activeText: string;
    inactiveBg: string;
    inactiveText: string;
    inactiveBorder: string;
  };
}

/**
 * CategoryChip — filter pill with active/inactive states.
 * Rounded-full per design tokens (999px radius for pills).
 */
export const CategoryChip: React.FC<<CategoryChipProps> = ({
  label,
  isActive,
  onClick,
  colorClasses,
}) => {
  return (
    <motion.button
      onClick={onClick}
      variants={chipHoverVariants}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className={`
        inline-flex items-center rounded-full px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-wider transition-colors
        focus:outline-none focus:ring-2 focus:ring-[#c17c53] focus:ring-offset-2 focus:ring-offset-[#f5f0e8]
        ${isActive 
          ? `${colorClasses.activeBg} ${colorClasses.activeText}` 
          : `${colorClasses.inactiveBg} ${colorClasses.inactiveText} ${colorClasses.inactiveBorder} border hover:bg-[#e8e0d4]`
        }
      `}
      aria-pressed={isActive}
      aria-label={`Filter by ${label}`}
    >
      {label}
    </motion.button>
  );
};