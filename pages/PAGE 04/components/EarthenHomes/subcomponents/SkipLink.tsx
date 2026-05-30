// components/EarthenHomes/subcomponents/SkipLink.tsx
import React from 'react';

/**
 * Accessibility: allows keyboard users to bypass navigation.
 */
export const SkipLink: React.FC = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-5 focus:py-3 focus:bg-earth-brown focus:text-white focus:rounded-card focus:shadow-soft focus:font-medium"
  >
    Skip to main content
  </a>
);