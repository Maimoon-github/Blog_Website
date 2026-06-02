/**
 * Site Layout - (site) Route Group
 * 
 * Optional layout for marketing and legal pages.
 * Can be used for slightly different styling or behavior from the blog section.
 * Currently acts as a pass-through but provides structure for future customization.
 * 
 * Routes included:
 * - /about
 * - /contact
 * - /services
 * - /privacy-policy
 * - /terms
 */

import React from 'react';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Optional: Add site-specific styles, metadata, or providers here */}
      {children}
    </>
  );
}
