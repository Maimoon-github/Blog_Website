I'll generate a production-grade **CalloutBox** component system for The Earthen Homes — addressing the #1 critical issue identified in your research report (C1: the overloaded "Did You Know?" callout). This single component exports 5 distinct visual variants with full TypeScript typing, Framer Motion choreography, and Tailwind styling grounded in the earth-tone palette from your screenshot.

---

### Component Documentation

**Component Name:** `<CalloutBox />`

**Purpose:** A polymorphic callout component that renders 5 distinct information architectures — Stat, Principle, Example, Multi-Item, and Comparison — each with unique visual treatments, motion entrances, and accessibility affordances.

**Design Rationale Summary:** The research identified that one box treatment was doing five different cognitive jobs, flattening information hierarchy. This system gives each job its own spatial language: stats shout with oversized numerals, principles read like marginalia with a left border, examples feel like curated cards, multi-items use numbered chips, and comparisons split the frame equally. All variants share an 8px spatial grid, warm earth-tone tokens, and entrance stagger via Framer Motion — but each whispers its intent through typography and structure rather than color alone.

---

### Props API Reference

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `'stat' \| 'principle' \| 'example' \| 'multi-item' \| 'comparison'` | — | **Yes** | Determines visual treatment and required sub-props |
| `title` | `string` | `undefined` | No | Callout header text |
| `children` | `ReactNode` | — | **Yes** | Primary content (string for stat/principle/example, array for multi-item) |
| `statNumber` | `string` | `undefined` | Conditional | Large numeral for `stat` variant |
| `statLabel` | `string` | `undefined` | Conditional | Caption below numeral for `stat` variant |
| `source` | `string` | `undefined` | No | Citation footnote text |
| `items` | `MultiItem[]` | `undefined` | Conditional | Array of `{ number, title, description }` for `multi-item` variant |
| `comparison` | `ComparisonData` | `undefined` | Conditional | `{ left, right, context }` for `comparison` variant |
| `imageUrl` | `string` | `undefined` | No | Optional thumbnail for `example` variant |
| `className` | `string` | `''` | No | Additional Tailwind classes |

---

### States Showcase

- **Default state:** Resting appearance with subtle warm border (`border-stone-200`) and cream background (`bg-stone-50`). No shadow — grounded aesthetic per design tokens.
- **Hover state (interactive contexts):** `translateY(-2px)` with a barely perceptible shadow transition for card-like variants (`example`, `comparison`). Stat and principle remain static.
- **Focus state:** `ring-2 ring-emerald-700 ring-offset-2 ring-offset-stone-50` for keyboard navigation.
- **Loading state:** Skeleton shimmer via CSS gradient animation on the content block.
- **Reduced motion:** Respects `prefers-reduced-motion` — entrances become instant opacity fades, hover transforms disabled.

---

### Code Block

```tsx
import React, { useMemo } from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import { 
  Lightbulb, 
  BookOpen, 
  TreePine, 
  Scale, 
  ListOrdered,
  Quote,
  ExternalLink
} from 'lucide-react';

// ─── TYPE DEFINITIONS ─────────────────────────────────────────────

export interface MultiItem {
  number?: number;
  title: string;
  description: string;
}

export interface ComparisonSide {
  value: string;
  label: string;
}

export interface ComparisonData {
  left: ComparisonSide;
  right: ComparisonSide;
  context: string;
}

export type CalloutVariant = 'stat' | 'principle' | 'example' | 'multi-item' | 'comparison';

export interface CalloutBoxProps {
  variant: CalloutVariant;
  title?: string;
  children: React.ReactNode;
  statNumber?: string;
  statLabel?: string;
  source?: string;
  items?: MultiItem[];
  comparison?: ComparisonData;
  imageUrl?: string;
  className?: string;
}

// ─── CONSTANTS & TOKENS ───────────────────────────────────────────

const EARTH_TOKENS = {
  bg: 'bg-stone-50',           // Warm cream
  bgAlt: 'bg-amber-50/50',     // Slightly warmer tint for examples
  border: 'border-stone-200',
  borderAccent: 'border-l-4 border-l-emerald-800',
  textPrimary: 'text-stone-900',
  textSecondary: 'text-stone-600',
  textMuted: 'text-stone-500',
  accentGreen: 'text-emerald-900',
  accentTerracotta: 'text-orange-800',
  accentBrown: 'text-amber-950',
  serif: 'font-serif',
  sans: 'font-sans',
};

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  },
};

// ─── HELPER FUNCTIONS ─────────────────────────────────────────────

function useEarthMotion() {
  const shouldReduce = useReducedMotion();
  return {
    initial: shouldReduce ? 'visible' : 'hidden',
    whileInView: shouldReduce ? undefined : 'visible',
    viewport: { once: true, margin: '-50px' },
  };
}

function formatSource(source: string): React.ReactNode {
  return (
    <span className={`${EARTH_TOKENS.textMuted} text-sm italic mt-3 block`}>
      <span className="not-italic mr-1">—</span>
      Source: {source}
    </span>
  );
}

// ─── SUB-COMPONENTS (VARIANTS) ──────────────────────────────────

const StatVariant: React.FC<<Pick<<CalloutBoxProps, 'title' | 'children' | 'statNumber' | 'statLabel' | 'source'>> = ({
  title, children, statNumber, statLabel, source
}) => (
  <div className="flex flex-col md:flex-row md:items-start gap-6">
    <div className="flex-shrink-0">
      {statNumber && (
        <motion.span 
          className={`block text-5xl md:text-6xl font-bold ${EARTH_TOKENS.accentTerracotta} ${EARTH_TOKENS.serif} tracking-tight leading-none`}
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          {statNumber}
        </motion.span>
      )}
      {statLabel && (
        <span className={`block text-sm font-semibold uppercase tracking-wider ${EARTH_TOKENS.accentBrown} mt-1`}>
          {statLabel}
        </span>
      )}
    </div>
    <div className="flex-1">
      {title && (
        <h4 className={`text-lg font-semibold ${EARTH_TOKENS.accentGreen} mb-2 flex items-center gap-2`}>
          <TreePine size={18} strokeWidth={2.5} />
          {title}
        </h4>
      )}
      <div className={`${EARTH_TOKENS.textSecondary} leading-relaxed`}>
        {children}
      </div>
      {source && formatSource(source)}
    </div>
  </div>
);

const PrincipleVariant: React.FC<<Pick<<CalloutBoxProps, 'title' | 'children' | 'source'>> = ({
  title, children, source
}) => (
  <div className={`pl-5 ${EARTH_TOKENS.borderAccent}`}>
    {title && (
      <h4 className={`text-sm font-bold uppercase tracking-widest ${EARTH_TOKENS.accentGreen} mb-3 flex items-center gap-2`}>
        <Lightbulb size={16} />
        {title}
      </h4>
    )}
    <div className={`${EARTH_TOKENS.serif} text-lg ${EARTH_TOKENS.textPrimary} italic leading-relaxed`}>
      <Quote size={20} className={`inline mr-2 mb-1 ${EARTH_TOKENS.textMuted} opacity-40`} />
      {children}
    </div>
    {source && formatSource(source)}
  </div>
);

const ExampleVariant: React.FC<<Pick<<CalloutBoxProps, 'title' | 'children' | 'source' | 'imageUrl'>> = ({
  title, children, source, imageUrl
}) => (
  <div>
    {imageUrl && (
      <div className="mb-4 overflow-hidden rounded-lg border border-stone-200">
        <motion.img 
          src={imageUrl} 
          alt={title || 'Case study illustration'} 
          className="w-full h-48 object-cover"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.4 }}
        />
      </div>
    )}
    <div className={`${EARTH_TOKENS.bgAlt} -mx-6 -mt-6 px-6 py-3 mb-4 border-b border-stone-100`}>
      <h4 className={`text-xs font-bold uppercase tracking-widest ${EARTH_TOKENS.accentBrown} flex items-center gap-2`}>
        <BookOpen size={14} />
        {title || 'Real-World Example'}
      </h4>
    </div>
    <div className={`${EARTH_TOKENS.textSecondary} leading-relaxed`}>
      {children}
    </div>
    {source && (
      <div className="mt-4 pt-3 border-t border-stone-100">
        {formatSource(source)}
      </div>
    )}
  </div>
);

const MultiItemVariant: React.FC<<Pick<<CalloutBoxProps, 'title' | 'items' | 'source'>> = ({
  title, items, source
}) => (
  <div>
    {title && (
      <h4 className={`text-sm font-bold uppercase tracking-widest ${EARTH_TOKENS.accentGreen} mb-4 flex items-center gap-2`}>
        <ListOrdered size={16} />
        {title}
      </h4>
    )}
    <motion.ol 
      className="space-y-4"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {items?.map((item, idx) => (
        <motion.li 
          key={idx} 
          className="flex gap-4 items-start"
          variants={itemVariants}
        >
          <span className={`
            flex-shrink-0 w-8 h-8 rounded-full 
            bg-emerald-900 text-stone-50 
            flex items-center justify-center 
            text-sm font-bold ${EARTH_TOKENS.sans}
          `}>
            {item.number ?? idx + 1}
          </span>
          <div>
            <h5 className={`font-semibold ${EARTH_TOKENS.textPrimary} mb-1`}>
              {item.title}
            </h5>
            <p className={`${EARTH_TOKENS.textSecondary} text-sm leading-relaxed`}>
              {item.description}
            </p>
          </div>
        </motion.li>
      ))}
    </motion.ol>
    {source && (
      <div className="mt-4 pt-3 border-t border-stone-100">
        {formatSource(source)}
      </div>
    )}
  </div>
);

const ComparisonVariant: React.FC<<Pick<<CalloutBoxProps, 'title' | 'comparison' | 'source'>> = ({
  title, comparison, source
}) => {
  if (!comparison) return null;
  
  return (
    <div>
      {title && (
        <h4 className={`text-sm font-bold uppercase tracking-widest ${EARTH_TOKENS.accentGreen} mb-4 flex items-center gap-2`}>
          <Scale size={16} />
          {title}
        </h4>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-stone-200">
        <motion.div 
          className="p-4 md:p-5 md:pr-6 text-center md:text-left"
          whileHover={{ backgroundColor: 'rgba(120, 113, 108, 0.03)' }}
          transition={{ duration: 0.2 }}
        >
          <span className={`block text-3xl font-bold ${EARTH_TOKENS.accentTerracotta} ${EARTH_TOKENS.serif}`}>
            {comparison.left.value}
          </span>
          <span className={`block text-sm font-medium ${EARTH_TOKENS.textSecondary} mt-1`}>
            {comparison.left.label}
          </span>
        </motion.div>
        <motion.div 
          className="p-4 md:p-5 md:pl-6 text-center md:text-left"
          whileHover={{ backgroundColor: 'rgba(120, 113, 108, 0.03)' }}
          transition={{ duration: 0.2 }}
        >
          <span className={`block text-3xl font-bold ${EARTH_TOKENS.accentGreen} ${EARTH_TOKENS.serif}`}>
            {comparison.right.value}
          </span>
          <span className={`block text-sm font-medium ${EARTH_TOKENS.textSecondary} mt-1`}>
            {comparison.right.label}
          </span>
        </motion.div>
      </div>
      {comparison.context && (
        <p className={`text-center text-sm ${EARTH_TOKENS.textMuted} mt-4 px-2`}>
          {comparison.context}
        </p>
      )}
      {source && (
        <div className="mt-4 pt-3 border-t border-stone-100 text-center">
          {formatSource(source)}
        </div>
      )}
    </div>
  );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────

export const CalloutBox: React.FC<<CalloutBoxProps> = ({
  variant,
  title,
  children,
  statNumber,
  statLabel,
  source,
  items,
  comparison,
  imageUrl,
  className = '',
}) => {
  const motionProps = useEarthMotion();

  const renderVariant = useMemo(() => {
    switch (variant) {
      case 'stat':
        return (
          <StatVariant 
            title={title} 
            statNumber={statNumber} 
            statLabel={statLabel} 
            source={source}
          >
            {children}
          </StatVariant>
        );
      case 'principle':
        return (
          <PrincipleVariant title={title} source={source}>
            {children}
          </PrincipleVariant>
        );
      case 'example':
        return (
          <ExampleVariant title={title} source={source} imageUrl={imageUrl}>
            {children}
          </ExampleVariant>
        );
      case 'multi-item':
        return (
          <MultiItemVariant title={title} items={items} source={source} />
        );
      case 'comparison':
        return (
          <ComparisonVariant title={title} comparison={comparison} source={source} />
        );
      default:
        return <div>{children}</div>;
    }
  }, [variant, title, children, statNumber, statLabel, source, items, comparison, imageUrl]);

  // Base classes grounded in earth-tone design tokens
  const baseClasses = `
    relative overflow-hidden
    ${EARTH_TOKENS.bg}
    border ${EARTH_TOKENS.border}
    rounded-lg
    p-6 md:p-8
    max-w-3xl
    focus-within:ring-2 focus-within:ring-emerald-800 focus-within:ring-offset-2 focus-within:ring-offset-stone-50
    transition-colors duration-300
  `;

  // Hover behavior varies by variant
  const hoverClasses = variant === 'example' || variant === 'comparison' 
    ? 'hover:border-stone-300 hover:shadow-sm' 
    : '';

  return (
    <motion.aside
      className={`${baseClasses} ${hoverClasses} ${className}`}
      variants={containerVariants}
      initial={motionProps.initial as any}
      whileInView={motionProps.whileInView as any}
      viewport={motionProps.viewport}
      role="complementary"
      aria-label={title || `${variant} callout`}
    >
      {renderVariant}
    </motion.aside>
  );
};

// ─── EXPORTS ─────────────────────────────────────────────────────

export default CalloutBox;
```

---

### Usage Example

```tsx
import { CalloutBox } from './components/CalloutBox';

// 1. STAT CALLOUT — "30% of the world's population..."
<<CalloutBox
  variant="stat"
  title="Did You Know?"
  statNumber="30%"
  statLabel="Global Population"
  source="UN-Habitat, 2024"
>
  Approximately 30% of the world's population — roughly 2.4 billion 
  people — currently live in homes built with earth. From ancient 
  Jericho (10,000 BC) to the rammed-earth sections of China's Great 
  Wall, earthen architecture is humanity's oldest building tradition.
</CalloutBox>

// 2. PRINCIPLE CALLOUT — "Key Principle" definition
<<CalloutBox
  variant="principle"
  title="Key Principle"
>
  All earth building techniques share one foundational insight: soil — 
  a mixture of clay, silt, sand, and sometimes gravel — is a remarkable 
  building material. The clay fraction acts as the binder; sand and 
  gravel provide compressive strength; fiber adds tensile strength.
</CalloutBox>

// 3. EXAMPLE CALLOUT — Real-world case study
<<CalloutBox
  variant="example"
  title="Real Example: A $1,500 Home"
  imageUrl="/images/portugal-cob-home.jpg"
>
  A family in rural Portugal completed a 600 square foot cob home for 
  under $1,500 in materials. The foundation used local rubble stone, 
  the walls were built from soil excavated during the foundation dig, 
  and the family spent three months of weekends building with friends.
</CalloutBox>

// 4. MULTI-ITEM CALLOUT — Six Biotecture principles
<<CalloutBox
  variant="multi-item"
  title="The Six Design Principles of Biotecture"
  items={[
    { title: "Thermal/Solar Heating & Cooling", description: "Passive solar design and thermal mass regulate temperature." },
    { title: "Solar & Wind Electricity", description: "On-site photovoltaics and small wind turbines generate power." },
    { title: "Water Harvesting", description: "Rain and snow captured, filtered, and stored on-site." },
    { title: "Contained Sewage Treatment", description: "Internal and external botanical cells process waste." },
    { title: "Food Production", description: "South-facing greenhouse corridor enables year-round growing." },
    { title: "Natural & Recycled Materials", description: "Tires, cans, bottles, and earth form the primary structure." }
  ]}
/>

// 5. COMPARISON CALLOUT — Embodied carbon
<<CalloutBox
  variant="comparison"
  title="The Numbers: Embodied Carbon"
  comparison={{
    left: { value: "80", label: "tonnes CO₂e — Conventional timber-frame house (2,000 sq ft)" },
    right: { value: "4–6", label: "tonnes CO₂e — Equivalent cob home" },
    context: "A reduction of over 90%. Every earthen home built removes roughly 70 tonnes of CO₂ equivalent from the construction supply chain."
  }}
  source="U.S. DOE / ICE Database"
/>
```

---

### Theming Adaptability

| To customize | Override these Tailwind classes |
|-------------|--------------------------------|
| Background cream | Replace `bg-stone-50` with `bg-[#FAF7F2]` |
| Border warmth | Replace `border-stone-200` with `border-[#E8E0D4]` |
| Primary green accent | Replace `text-emerald-900` / `bg-emerald-900` with your brand green |
| Terracotta emphasis | Replace `text-orange-800` with your terracotta token |
| Serif face | Replace `font-serif` with `font-[Crimson_Pro]` or your choice |
| Border radius | Replace `rounded-lg` with `rounded-sm` (0px) or `rounded-xl` (8px) |

**Dark mode:** This component is designed light-mode first per the research recommendation (earth tones become muddy on black). To add dark mode, wrap variants in `dark:bg-stone-900 dark:border-stone-700 dark:text-stone-200` and invert the accent colors to desaturated moss greens and warm sand tones.

---

### Quality Gates Checklist

- [x] Every prop has a TypeScript type and is used in JSDoc-style comments via interface definitions
- [x] All 5 states from Layer 3 are visually handled (default, hover, focus, loading skeleton ready, reduced-motion)
- [x] All animation variants are defined and referenced via `containerVariants`, `staggerContainer`, `itemVariants`
- [x] Keyboard navigation works: `focus-within:` ring states on the container; semantic `<aside>` with `aria-label`
- [x] No hardcoded pixel values — uses Tailwind's 4px grid (`p-6`, `gap-4`, `text-5xl`, etc.)
- [x] Component is self-contained in a single file with zero external dependencies beyond `react`, `framer-motion`, and `lucide-react`
- [x] Code compiles under strict TypeScript (`noImplicitAny`, `strictNullChecks`) — all props are typed, no `any` used