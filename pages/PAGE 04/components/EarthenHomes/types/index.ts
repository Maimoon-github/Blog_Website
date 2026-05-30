// components/EarthenHomes/types/index.ts

export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface Article {
  id: string;
  category: string;
  title: string;
  description?: string;
  href: string;
  imageUrl?: string;
}

export interface ReasonCardData {
  number: number;
  title: string;
  description: string;
}

export interface CaseStudyData {
  projectName: string;
  location: string;
  year?: string;
  cost?: string;
  narrative: string;
  imageUrl?: string;
  tags?: string[];
}

export interface TocItem {
  id: string;
  label: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string; // omit for current page
}

export interface ClusterArticle {
  title: string;
  href: string;
  isCurrent?: boolean;
}