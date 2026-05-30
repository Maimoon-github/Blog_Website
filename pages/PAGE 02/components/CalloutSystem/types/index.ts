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