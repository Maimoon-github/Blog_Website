/**
 * TypeScript interfaces for the HomepageHero component system.
 * Aligned with The Earthen Homes design tokens (earth-tone palette, serif hierarchy).
 */

export interface HeroContent {
    /** Brand mark alt text — logo is decorative but labeled for screen readers */
    brandAlt: string;
    /** Main H1 — editorial, serif, earth-green */
    headline: string;
    /** Subtitle — sans-serif, warm brown, max 2 lines */
    subtitle: string;
    /** Primary CTA label */
    ctaLabel: string;
    /** CTA href — typically scrolls to #featured or /techniques */
    ctaHref: string;
    /** Background image src — earth-sheltered home photography */
    backgroundImage: string;
    /** Optional stat callout for social proof (e.g., "30% of the world...") */
    statCallout?: StatCalloutData;
}

export interface StatCalloutData {
    /** Large numeral — e.g., "30%" */
    figure: string;
    /** Supporting caption — e.g., "of the world's population live in earthen homes" */
    caption: string;
    /** Optional source citation for credibility */
    source?: string;
}

export interface HomepageHeroProps {
    content: HeroContent;
    /** Disables entrance animations for reduced-motion or instant hydration */
    disableAnimation?: boolean;
    /** Callback when CTA is clicked — for analytics or routing */
    onCtaClick?: () => void;
}