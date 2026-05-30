/**
 * FeaturedArticlesGrid types
 * Card grid replacing the 2-column table anti-pattern (Issue M1).
 */

export interface FeaturedArticle {
    /** Category tag — drives chip color and filtering */
    category: string;
    /** Article title — descriptive, editorial */
    title: string;
    /** Article slug or URL */
    href: string;
    /** Optional thumbnail — grid works with or without images */
    thumbnailUrl?: string;
    thumbnailAlt?: string;
    /** Optional reading time estimate */
    readTime?: string;
}

export interface FeaturedArticlesGridProps {
    /** Section label above the grid */
    sectionLabel?: string;
    /** Array of article cards */
    articles: FeaturedArticle[];
    /** Optional filter chips — if provided, enables category filtering */
    enableFiltering?: boolean;
    /** Disables entrance animations */
    disableAnimation?: boolean;
    /** Callback when a card is clicked — for analytics */
    onArticleClick?: (article: FeaturedArticle) => void;
}

/** Category-to-color mapping for consistent chip theming */
export type CategoryColorMap = Record<string, {
    bg: string;
    text: string;
    border: string;
}>;