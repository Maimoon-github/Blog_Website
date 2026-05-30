// components/EarthenHomes/subcomponents/TableOfContents.tsx
import React, { useState, useEffect } from 'react';
import { TocItem } from '../types';

/**
 * Sticky Table of Contents (X05)
 * Auto-highlights the active section using IntersectionObserver.
 * Critical for 2,500+ word pillar pages.
 */
export const TableOfContents: React.FC<{ items: TocItem[] }> = ({ items }) => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -75% 0px' }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Table of contents" className="hidden xl:block sticky top-28 self-start">
      <h3 className="text-xs font-semibold tracking-widest uppercase text-earth-green mb-4">
        On this page
      </h3>
      <ul className="space-y-2 border-l-2 border-earth-stone">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block pl-4 text-sm transition-colors leading-snug ${
                activeId === item.id
                  ? 'text-earth-brown font-semibold border-l-2 border-earth-brown -ml-[2px]'
                  : 'text-earth-text-muted hover:text-earth-text-secondary'
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};