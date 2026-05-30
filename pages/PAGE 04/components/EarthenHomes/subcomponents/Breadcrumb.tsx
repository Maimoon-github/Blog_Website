// components/EarthenHomes/subcomponents/Breadcrumb.tsx
import React from 'react';
import { BreadcrumbItem } from '../types';

/**
 * Breadcrumb (X08)
 * Required for the 3-click depth rule and SEO structured data.
 */
export const Breadcrumb: React.FC<{ items: BreadcrumbItem[] }> = ({ items }) => (
  <nav aria-label="Breadcrumb" className="py-4">
    <ol className="flex items-center flex-wrap gap-2 text-sm text-earth-text-muted">
      {items.map((item, index) => (
        <li key={index} className="flex items-center gap-2">
          {index > 0 && <span className="text-earth-stone">/</span>}
          {item.href ? (
            <a href={item.href} className="hover:text-earth-brown transition-colors underline-offset-2 hover:underline">
              {item.label}
            </a>
          ) : (
            <span className="text-earth-text-secondary font-medium" aria-current="page">
              {item.label}
            </span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);