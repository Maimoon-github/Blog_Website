// components/EarthenHomes/subcomponents/Logo.tsx
import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

/**
 * Custom SVG wordmark replacing the emoji brand mark.
 * Ensures cross-platform visual consistency.
 */
export const Logo: React.FC<<LogoProps> = ({ className = '', showText = true }) => (
  <a href="/" className={`flex items-center gap-2.5 group ${className}`} aria-label="The Earthen Homes — Home">
    <svg
      className="w-8 h-8 text-earth-brown transition-colors group-hover:text-earth-green"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M20 4L4 16H8V32H16V22H24V32H32V16H36L20 4Z" fill="currentColor" opacity="0.25" />
      <path d="M20 8L8 17H12V30H18V20H22V30H28V17H32L20 8Z" fill="currentColor" />
      <path d="M20 12C20 12 14 16 14 20C14 24 20 28 20 28C20 28 26 24 26 20C26 16 20 12 20 12Z" fill="currentColor" opacity="0.5" />
    </svg>
    {showText && (
      <span className="text-xl font-semibold text-earth-brown tracking-tight">
        Earthen <span className="text-earth-green">Homes</span>
      </span>
    )}
  </a>
);