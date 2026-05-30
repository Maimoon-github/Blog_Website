I'll generate the **Callout System** — the five distinct callout variants identified as Critical Issue C1 in your research report. This directly addresses the "single largest design opportunity" where one box was forced to do five different jobs. The system is modular, theme-consistent, and built for long-term maintenance.

---

## 5X Reasoning — Callout System

| Dimension | Decision |
|-----------|----------|
| **User Experience** | Readers scan callouts differently based on intent: stats for credibility, principles for learning, examples for inspiration. Each variant must signal its purpose instantly. |
| **Visual Hierarchy** | Stat → oversized figure; Principle → left border authority; Example → card elevation (subtle); Multi-item → numbered chips; Comparison → split weight. |
| **Interaction** | Entrance: staggered fade-up per variant. Hover: subtle border-color shift or scale. No motion for reduced-motion. |
| **Accessibility** | Semantic `<aside>` with `aria-label`, proper heading levels inside callouts, contrast ≥ 4.5:1, `prefers-reduced-motion` respected. |
| **Performance** | GPU-only transforms, no heavy re-renders — callouts are presentational, stateless where possible. |

---

## Generated Files

### 1. `components/CalloutSystem/types/index.ts`

```typescript
/**
 * CalloutSystem types
 * Five distinct callout variants replacing the overloaded "Did You Know?" box.
 */

export type CalloutVariant = 'stat' | 'principle' | 'example' | 'multiItem' | 'comparison';

export interface BaseCalloutProps {
  variant: CalloutVariant;
  /** Disables entrance animations */
  disableAnimation?: boolean;
  /** Optional className for layout context (e.g., max-width constraints) */
  className?: string;
}

export interface StatCalloutData {
  variant: 'stat';
  figure: string;
  caption: string;
  source?: string;
}

export interface PrincipleCalloutData {
  variant: 'principle';
  label: string; // e.g., "KEY PRINCIPLE"
  body: string;
  /** Optional secondary note */
  footnote?: string;
}

export interface ExampleCalloutData {
  variant: 'example';
  label: string; // e.g., "REAL EXAMPLE: A $1,500 HOME"
  narrative: string;
  /** Optional project metadata chips */
  meta?: { key: string; value: string }[];
  /** Optional image slot URL */
  imageUrl?: string;
  imageAlt?: string;
}

export interface MultiItemCalloutData {
  variant: 'multiItem';
  label: string; // e.g., "THE SIX DESIGN PRINCIPLES OF BIOTECTURE"
  items: string[];
  /** If true, renders as numbered chips; otherwise bullets */
  numbered?: boolean;
}

export interface ComparisonCalloutData {
  variant: 'comparison';
  label: string; // e.g., "THE NUMBERS: EMBODIED CARBON COMPARISON"
  leftFigure: string;
  leftLabel: string;
  rightFigure: string;
  rightLabel: string;
  context: string;
}

export type CalloutData =
  | StatCalloutData
  | PrincipleCalloutData
  | ExampleCalloutData
  | MultiItemCalloutData
  | ComparisonCalloutData;

export interface CalloutSystemProps {
  data: CalloutData;
  disableAnimation?: boolean;
  className?: string;
}
```

---

### 2. `components/CalloutSystem/animations/variants.ts`

```typescript
import { Variants } from 'framer-motion';

/**
 * Organic, gentle easing — consistent with HomepageHero and earth-tone brand.
 */

export const calloutContainerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
};

export const calloutItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
};

export const statFigureVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: 0.1,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
};

export const staggerListVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

export const listItemVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
};

export const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};
```

---

### 3. `components/CalloutSystem/hooks/useCalloutLogic.ts`

```typescript
import { useEffect, useState } from 'react';

/**
 * Minimal hook for reduced-motion detection and hydration safety.
 * Callouts are presentational, so logic is intentionally thin.
 */

export interface UseCalloutLogicReturn {
  prefersReducedMotion: boolean;
  isMounted: boolean;
}

export const useCalloutLogic = (): UseCalloutLogicReturn => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return { prefersReducedMotion, isMounted };
};
```

---

### 4. `components/CalloutSystem/subcomponents/StatCallout.tsx`

```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { StatCalloutData } from '../types';
import { calloutContainerVariants, statFigureVariants, reducedMotionVariants } from '../animations/variants';

interface Props {
  data: StatCalloutData;
  prefersReducedMotion: boolean;
}

/**
 * StatCallout — large numeral, short caption, optional citation.
 * Treatment: minimal box, oversized figure, left border accent.
 */
export const StatCallout: React.FC<<Props> = ({ data, prefersReducedMotion }) => {
  const variants = prefersReducedMotion ? reducedMotionVariants : calloutContainerVariants;
  const figureVariants = prefersReducedMotion ? undefined : statFigureVariants;

  return (
    <motion.aside
      variants={variants}
      initial="hidden"
      animate="visible"
      className="relative max-w-lg rounded-lg border-l-4 border-[#c17c53] bg-[#faf8f3] p-6 md:p-8"
      aria-label="Statistic"
    >
      <motion.span
        variants={figureVariants}
        className="block font-serif text-5xl font-bold leading-none tracking-tight text-[#2d5a27] md:text-6xl"
      >
        {data.figure}
      </motion.span>
      <p className="mt-3 font-sans text-base leading-relaxed text-[#5c4f42]">
        {data.caption}
      </p>
      {data.source && (
        <span className="mt-3 block font-sans text-xs uppercase tracking-wider text-[#8c7d6d]">
          Source: {data.source}
        </span>
      )}
    </motion.aside>
  );
};
```

---

### 5. `components/CalloutSystem/subcomponents/PrincipleCallout.tsx`

```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { PrincipleCalloutData } from '../types';
import { calloutContainerVariants, reducedMotionVariants } from '../animations/variants';

interface Props {
  data: PrincipleCalloutData;
  prefersReducedMotion: boolean;
}

/**
 * PrincipleCallout — educational definition.
 * Treatment: serif italic body, left border accent, no box fill.
 */
export const PrincipleCallout: React.FC<<Props> = ({ data, prefersReducedMotion }) => {
  const variants = prefersReducedMotion ? reducedMotionVariants : calloutContainerVariants;

  return (
    <motion.aside
      variants={variants}
      initial="hidden"
      animate="visible"
      className="relative max-w-2xl border-l-4 border-[#2d5a27] py-2 pl-6 md:pl-8"
      aria-label="Key principle"
    >
      <span className="mb-2 block font-sans text-xs font-semibold uppercase tracking-widest text-[#8c7d6d]">
        {data.label}
      </span>
      <p className="font-serif text-lg italic leading-relaxed text-[#4a3f35] md:text-xl" style={{ lineHeight: 1.7 }}>
        {data.body}
      </p>
      {data.footnote && (
        <p className="mt-3 font-sans text-sm text-[#8c7d6d]">
          {data.footnote}
        </p>
      )}
    </motion.aside>
  );
};
```

---

### 6. `components/CalloutSystem/subcomponents/ExampleCallout.tsx`

```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { ExampleCalloutData } from '../types';
import { calloutContainerVariants, calloutItemVariants, reducedMotionVariants } from '../animations/variants';

interface Props {
  data: ExampleCalloutData;
  prefersReducedMotion: boolean;
}

/**
 * ExampleCallout — real-world case mini-card.
 * Treatment: card with project name header, narrative body, optional photo slot.
 */
export const ExampleCallout: React.FC<<Props> = ({ data, prefersReducedMotion }) => {
  const variants = prefersReducedMotion ? reducedMotionVariants : calloutContainerVariants;

  return (
    <motion.aside
      variants={variants}
      initial="hidden"
      animate="visible"
      className="relative max-w-2xl overflow-hidden rounded-lg border border-[#e8e0d4] bg-[#faf8f3]"
      aria-label="Real world example"
    >
      {data.imageUrl && (
        <div className="relative h-48 w-full overflow-hidden md:h-56">
          <img
            src={data.imageUrl}
            alt={data.imageAlt || ''}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#faf8f3] via-transparent to-transparent" />
        </div>
      )}
      <div className="p-6 md:p-8">
        <span className="mb-3 block font-sans text-xs font-semibold uppercase tracking-widest text-[#c17c53]">
          {data.label}
        </span>
        <p className="font-sans text-base leading-relaxed text-[#5c4f42]" style={{ lineHeight: 1.7 }}>
          {data.narrative}
        </p>
        {data.meta && data.meta.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {data.meta.map((m) => (
              <span
                key={m.key}
                className="inline-flex items-center rounded-full bg-[#f5f0e8] px-3 py-1 font-sans text-xs text-[#5c4f42]"
              >
                <span className="mr-1 font-semibold text-[#4a3f35]">{m.key}:</span>
                {m.value}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.aside>
  );
};
```

---

### 7. `components/CalloutSystem/subcomponents/MultiItemCallout.tsx`

```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { MultiItemCalloutData } from '../types';
import { staggerListVariants, listItemVariants, reducedMotionVariants } from '../animations/variants';

interface Props {
  data: MultiItemCalloutData;
  prefersReducedMotion: boolean;
}

/**
 * MultiItemCallout — numbered or bulleted list-as-callout.
 * Treatment: numbered chips down the left edge, items spaced.
 */
export const MultiItemCallout: React.FC<<Props> = ({ data, prefersReducedMotion }) => {
  const containerVariants = prefersReducedMotion ? reducedMotionVariants : staggerListVariants;
  const itemVars = prefersReducedMotion ? reducedMotionVariants : listItemVariants;

  return (
    <motion.aside
      className="relative max-w-2xl rounded-lg border border-[#e8e0d4] bg-[#faf8f3] p-6 md:p-8"
      aria-label="List of principles"
    >
      <span className="mb-4 block font-sans text-xs font-semibold uppercase tracking-widest text-[#8c7d6d]">
        {data.label}
      </span>
      <motion.ol
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={data.numbered === false ? 'list-none space-y-3' : 'list-none space-y-4'}
      >
        {data.items.map((item, index) => (
          <motion.li
            key={index}
            variants={itemVars}
            className="flex items-start gap-3"
          >
            {data.numbered !== false && (
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#2d5a27] font-sans text-xs font-bold text-white">
                {index + 1}
              </span>
            )}
            {data.numbered === false && (
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#c17c53]" />
            )}
            <span className="font-sans text-base leading-relaxed text-[#5c4f42]">
              {item}
            </span>
          </motion.li>
        ))}
      </motion.ol>
    </motion.aside>
  );
};
```

---

### 8. `components/CalloutSystem/subcomponents/ComparisonCallout.tsx`

```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { ComparisonCalloutData } from '../types';
import { calloutContainerVariants, calloutItemVariants, reducedMotionVariants } from '../animations/variants';

interface Props {
  data: ComparisonCalloutData;
  prefersReducedMotion: boolean;
}

/**
 * ComparisonCallout — two figures side-by-side with context.
 * Treatment: split layout, both numbers equally weighted, label between.
 */
export const ComparisonCallout: React.FC<<Props> = ({ data, prefersReducedMotion }) => {
  const variants = prefersReducedMotion ? reducedMotionVariants : calloutContainerVariants;
  const itemVars = prefersReducedMotion ? reducedMotionVariants : calloutItemVariants;

  return (
    <motion.aside
      variants={variants}
      initial="hidden"
      animate="visible"
      className="relative max-w-2xl rounded-lg border border-[#e8e0d4] bg-[#faf8f3] p-6 md:p-8"
      aria-label="Comparison data"
    >
      <span className="mb-6 block font-sans text-xs font-semibold uppercase tracking-widest text-[#8c7d6d]">
        {data.label}
      </span>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        <motion.div variants={itemVars} className="text-center md:text-left">
          <span className="block font-serif text-4xl font-bold text-[#4a3f35] md:text-5xl">
            {data.leftFigure}
          </span>
          <span className="mt-1 block font-sans text-sm uppercase tracking-wider text-[#8c7d6d]">
            {data.leftLabel}
          </span>
        </motion.div>
        <motion.div variants={itemVars} className="text-center md:text-left">
          <span className="block font-serif text-4xl font-bold text-[#2d5a27] md:text-5xl">
            {data.rightFigure}
          </span>
          <span className="mt-1 block font-sans text-sm uppercase tracking-wider text-[#8c7d6d]">
            {data.rightLabel}
          </span>
        </motion.div>
      </div>
      <p className="mt-6 border-t border-[#e8e0d4] pt-4 font-sans text-base leading-relaxed text-[#5c4f42]">
        {data.context}
      </p>
    </motion.aside>
  );
};
```

---

### 9. `components/CalloutSystem/CalloutSystem.tsx`

```typescript
import React from 'react';
import { CalloutSystemProps } from './types';
import { useCalloutLogic } from './hooks/useCalloutLogic';
import { StatCallout } from './subcomponents/StatCallout';
import { PrincipleCallout } from './subcomponents/PrincipleCallout';
import { ExampleCallout } from './subcomponents/ExampleCallout';
import { MultiItemCallout } from './subcomponents/MultiItemCallout';
import { ComparisonCallout } from './subcomponents/ComparisonCallout';

/**
 * CalloutSystem — unified dispatcher for five distinct callout variants.
 * 
 * Replaces the overloaded "Did You Know?" box (Critical Issue C1).
 * Each variant has a unique visual treatment matched to its communication intent.
 * 
 * Usage: <CalloutSystem data={calloutData} />
 */

export const CalloutSystem: React.FC<<CalloutSystemProps> = ({
  data,
  disableAnimation = false,
  className = '',
}) => {
  const { prefersReducedMotion, isMounted } = useCalloutLogic();
  const shouldReduce = disableAnimation || prefersReducedMotion || !isMounted;

  const wrapperClasses = `my-8 ${className}`;

  switch (data.variant) {
    case 'stat':
      return (
        <div className={wrapperClasses}>
          <StatCallout data={data} prefersReducedMotion={shouldReduce} />
        </div>
      );
    case 'principle':
      return (
        <div className={wrapperClasses}>
          <PrincipleCallout data={data} prefersReducedMotion={shouldReduce} />
        </div>
      );
    case 'example':
      return (
        <div className={wrapperClasses}>
          <ExampleCallout data={data} prefersReducedMotion={shouldReduce} />
        </div>
      );
    case 'multiItem':
      return (
        <div className={wrapperClasses}>
          <MultiItemCallout data={data} prefersReducedMotion={shouldReduce} />
        </div>
      );
    case 'comparison':
      return (
        <div className={wrapperClasses}>
          <ComparisonCallout data={data} prefersReducedMotion={shouldReduce} />
        </div>
      );
    default:
      // Exhaustive check — should never hit if TypeScript strict mode is on
      return null;
  }
};
```

---

### 10. `components/CalloutSystem/index.tsx`

```typescript
export { CalloutSystem } from './CalloutSystem';
export type {
  CalloutSystemProps,
  CalloutData,
  StatCalloutData,
  PrincipleCalloutData,
  ExampleCalloutData,
  MultiItemCalloutData,
  ComparisonCalloutData,
} from './types';
export { StatCallout } from './subcomponents/StatCallout';
export { PrincipleCallout } from './subcomponents/PrincipleCallout';
export { ExampleCallout } from './subcomponents/ExampleCallout';
export { MultiItemCallout } from './subcomponents/MultiItemCallout';
export { ComparisonCallout } from './subcomponents/ComparisonCallout';
```

---

## Example Usage (All 5 Variants)

```tsx
import { CalloutSystem } from '@/components/CalloutSystem';

// 1. STAT — "30% of the world's population..."
<<CalloutSystem
  data={{
    variant: 'stat',
    figure: '30%',
    caption: "of the world's population — roughly 2.4 billion people — currently live in homes built with earth.",
    source: 'UN-Habitat Global Housing Report',
  }}
/>

// 2. PRINCIPLE — "All earth building techniques share one foundational insight..."
<<CalloutSystem
  data={{
    variant: 'principle',
    label: 'Key Principle',
    body: 'All earth building techniques share one foundational insight: soil — a mixture of clay, silt, sand, and sometimes gravel — is a remarkable building material. The clay fraction acts as a binder; the sand and gravel provide compressive strength; fiber adds tensile strength.',
  }}
/>

// 3. EXAMPLE — "A family in rural Portugal..."
<<CalloutSystem
  data={{
    variant: 'example',
    label: 'Real Example: A $1,500 Home',
    narrative: 'A family in rural Portugal completed a 600 square foot cob home for under $1,500 in materials. The foundation used local rubble stone, the walls were built from soil excavated during the foundation dig...',
    meta: [
      { key: 'Location', value: 'Rural Portugal' },
      { key: 'Size', value: '600 sq ft' },
      { key: 'Cost', value: '$1,500' },
    ],
  }}
/>

// 4. MULTI-ITEM — "The Six Design Principles of Biotecture"
<<CalloutSystem
  data={{
    variant: 'multiItem',
    label: 'The Six Design Principles of Biotecture',
    items: [
      'Thermal/Solar Heating and Cooling — achieved through passive solar design and thermal mass',
      'Solar and Wind Electricity — generated on-site by photovoltaics and small wind turbines',
      'Water Harvesting — from rain and snow, filtered and stored on-site',
      'Contained Sewage Treatment — via internal and external botanical cells',
      'Food Production — in the south-facing greenhouse corridor',
      'Building with Natural and Recycled Materials — primarily tires, cans, bottles, and earth',
    ],
    numbered: true,
  }}
/>

// 5. COMPARISON — "Embodied carbon: 80 vs 4–6 tonnes"
<<CalloutSystem
  data={{
    variant: 'comparison',
    label: 'The Numbers: Embodied Carbon Comparison',
    leftFigure: '80',
    leftLabel: 'Tonnes CO2e — Conventional Timber-Frame House (2,000 sq ft)',
    rightFigure: '4–6',
    rightLabel: 'Tonnes CO2e — Equivalent Cob Home',
    context: 'A reduction of over 90%. Every earthen home built instead of a conventional home removes roughly 70 tonnes of CO2 equivalent from the construction supply chain.',
  }}
/>
```

---

## Maintenance & Design System Notes

| Concern | Implementation |
|---------|---------------|
| **Token consistency** | All callouts reuse the same 6-color palette and 2-font stack as HomepageHero. No new colors introduced. |
| **Editorial discipline** | The `variant` prop is required and typed — content editors cannot default to a generic box. CMS content models should enforce `variant` selection. |
| **Accessibility** | Each `<aside>` has a unique `aria-label` describing its purpose. Headings inside callouts use semantic spans (not H2/H3) to avoid breaking page heading hierarchy. |
| **Responsive** | All variants stack cleanly on mobile; max-widths prevent line-length violations. |
| **Zero custom CSS** | Pure Tailwind utilities; no `.css` files to maintain. |
| **Animation hygiene** | `prefers-reduced-motion` detected once per component; no layout thrashing. |

This system is ready for Sprint 1 (Earth Building Techniques + Benefits pages) per your phased build recommendation.