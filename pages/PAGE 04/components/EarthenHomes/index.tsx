// components/EarthenHomes/index.tsx
export { EarthenHomesHomepage } from './EarthenHomes';

// Re-export all organisms for page-level composition
export { Header } from './subcomponents/Header';
export { Hero } from './subcomponents/Hero';
export { Footer } from './subcomponents/Footer';
export { SectionHeader } from './subcomponents/SectionHeader';
export { FeaturedArticlesGrid } from './subcomponents/FeaturedArticlesGrid';
export { Breadcrumb } from './subcomponents/Breadcrumb';
export { TableOfContents } from './subcomponents/TableOfContents';
export { RelatedCluster } from './subcomponents/RelatedCluster';
export { NewsletterCapture } from './subcomponents/NewsletterCapture';

// Re-export all callout variants (Critical Issue C1)
export { StatCallout } from './subcomponents/StatCallout';
export { PrincipleCallout } from './subcomponents/PrincipleCallout';
export { ExampleCallout } from './subcomponents/ExampleCallout';
export { MultiItemCallout } from './subcomponents/MultiItemCallout';
export { ComparisonCallout } from './subcomponents/ComparisonCallout';
export { AudienceCallout } from './subcomponents/AudienceCallout';

// Re-export types
export type {
  Article,
  NavItem,
  ReasonCardData,
  CaseStudyData,
  TocItem,
  BreadcrumbItem,
  ClusterArticle,
} from './types';