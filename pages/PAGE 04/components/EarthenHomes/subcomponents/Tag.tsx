// components/EarthenHomes/subcomponents/Tag.tsx
import React from 'react';

interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'active';
}

export const Tag: React.FC<TagProps> = ({ children, variant = 'default' }) => (
  <span
    className={`inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-pill ${
      variant === 'active'
        ? 'bg-earth-green text-white'
        : 'bg-earth-green/10 text-earth-green'
    }`}
  >
    {children}
  </span>
);