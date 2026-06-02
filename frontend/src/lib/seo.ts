/**
 * SEO & Metadata Utilities
 * 
 * Centralized functions for generating consistent metadata across all pages
 * Handles Open Graph, Twitter Cards, structured data, and canonical URLs
 */

import { Metadata, ResolvingMetadata } from 'next';
import { SITE_CONFIG } from './navigation';

export interface PageMetadataProps {
  title: string;
  description: string;
  image?: string;
  author?: string;
  publishedAt?: Date;
  updatedAt?: Date;
  type?: 'article' | 'page' | 'website';
  tags?: string[];
}

/**
 * Generate default/fallback metadata for pages
 * Used as the base for all page metadata
 */
export function getDefaultMetadata(): Metadata {
  return {
    title: {
      default: SITE_CONFIG.name,
      template: `%s | ${SITE_CONFIG.name}`,
    },
    description: SITE_CONFIG.description,
    keywords: SITE_CONFIG.keywords,
    authors: [
      {
        name: SITE_CONFIG.author.name,
        url: SITE_CONFIG.author.url,
      },
    ],
    creator: SITE_CONFIG.author.name,
    metadataBase: new URL(SITE_CONFIG.url),
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: SITE_CONFIG.url,
      siteName: SITE_CONFIG.name,
      description: SITE_CONFIG.description,
      images: [
        {
          url: `${SITE_CONFIG.url}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: SITE_CONFIG.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: SITE_CONFIG.social.twitter,
      creator: SITE_CONFIG.social.twitter,
      description: SITE_CONFIG.description,
      images: [`${SITE_CONFIG.url}/twitter-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: SITE_CONFIG.url,
    },
  };
}

/**
 * Generate metadata for a blog post or article
 * Includes Open Graph and Twitter Card metadata
 * 
 * @param props - Page metadata properties
 * @returns Metadata object for the page
 * 
 * @example
 * export const metadata = getArticleMetadata({
 *   title: 'The Art of Cob Building',
 *   description: 'Learn the ancient technique of cob construction...',
 *   image: '/images/cob-building.jpg',
 *   author: 'John Smith',
 *   publishedAt: new Date('2024-01-15'),
 *   tags: ['architecture', 'sustainable-living'],
 * });
 */
export function getArticleMetadata(props: PageMetadataProps): Metadata {
  const {
    title,
    description,
    image = `${SITE_CONFIG.url}/og-image.jpg`,
    author = SITE_CONFIG.author.name,
    publishedAt,
    updatedAt,
    tags = [],
  } = props;

  const url = `${SITE_CONFIG.url}`;

  return {
    title,
    description,
    authors: author ? [{ name: author }] : undefined,
    keywords: [...SITE_CONFIG.keywords, ...tags],
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      authors: author ? [author] : undefined,
      publishedTime: publishedAt?.toISOString(),
      modifiedTime: updatedAt?.toISOString(),
      tags,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: SITE_CONFIG.social.twitter,
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * Generate metadata for a regular page (not article)
 * Used for about, contact, services, etc.
 * 
 * @param props - Page metadata properties
 * @returns Metadata object for the page
 * 
 * @example
 * export const metadata = getPageMetadata({
 *   title: 'About Us',
 *   description: 'Learn more about Earthen Homes...',
 * });
 */
export function getPageMetadata(props: PageMetadataProps): Metadata {
  const {
    title,
    description,
    image = `${SITE_CONFIG.url}/og-image.jpg`,
  } = props;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: SITE_CONFIG.url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: SITE_CONFIG.url,
    },
  };
}

/**
 * Generate structured data (JSON-LD) for rich snippets
 * Used in <head> for SEO enhancement
 * 
 * @param type - Type of structured data (Article, Organization, BlogPosting, etc.)
 * @param data - Data object to structure
 * @returns JSON-LD structured data string
 * 
 * @example
 * const jsonLd = getStructuredData('Article', {
 *   headline: 'Title',
 *   description: 'Description',
 *   image: 'url',
 *   author: { name: 'Author' },
 *   datePublished: '2024-01-15',
 * });
 */
export function getStructuredData(
  type: string,
  data: Record<string, unknown>
): string {
  const baseStructure = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return JSON.stringify(baseStructure);
}

/**
 * Generate Article structured data
 * 
 * @param props - Article properties
 * @returns JSON-LD string
 */
export function getArticleStructuredData(props: {
  headline: string;
  description: string;
  image?: string;
  author: string;
  datePublished: Date;
  dateModified?: Date;
  url: string;
}): string {
  return getStructuredData('Article', {
    headline: props.headline,
    description: props.description,
    image: props.image || `${SITE_CONFIG.url}/og-image.jpg`,
    author: {
      '@type': 'Person',
      name: props.author,
    },
    datePublished: props.datePublished.toISOString(),
    dateModified: props.dateModified?.toISOString() || props.datePublished.toISOString(),
    url: props.url,
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/logo.svg`,
      },
    },
  });
}

/**
 * Generate Organization structured data for site footer
 * 
 * @returns JSON-LD string
 */
export function getOrganizationStructuredData(): string {
  return getStructuredData('Organization', {
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.svg`,
    description: SITE_CONFIG.description,
    sameAs: [
      `https://twitter.com/${SITE_CONFIG.social.twitter.replace('@', '')}`,
      `https://instagram.com/${SITE_CONFIG.social.instagram.replace('@', '')}`,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: SITE_CONFIG.email,
      contactType: 'Customer Service',
    },
  });
}

/**
 * Generate breadcrumb structured data
 * 
 * @param items - Breadcrumb items with href and label
 * @returns JSON-LD string
 * 
 * @example
 * const crumbs = [
 *   { href: '/', label: 'Home' },
 *   { href: '/blog', label: 'Blog' },
 *   { href: '/blog/article', label: 'Article' }
 * ];
 * const jsonLd = getBreadcrumbStructuredData(crumbs);
 */
export function getBreadcrumbStructuredData(
  items: Array<{ href: string; label: string }>
): string {
  const itemListElement = items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.label,
    item: `${SITE_CONFIG.url}${item.href}`,
  }));

  return getStructuredData('BreadcrumbList', {
    itemListElement,
  });
}

/**
 * Create a canonical URL for a page
 * Prevents duplicate content issues
 * 
 * @param path - Path of the page
 * @returns Full canonical URL
 * 
 * @example
 * const canonical = getCanonicalUrl('/blog/my-article');
 * // Returns: 'https://earthenhomes.com/blog/my-article'
 */
export function getCanonicalUrl(path: string): string {
  return `${SITE_CONFIG.url}${path}`;
}

/**
 * Generate Open Graph image URL for social sharing
 * Can be customized per page or use default
 * 
 * @param title - Page title for OG image
 * @param path - Page path
 * @returns OG image URL
 */
export function getOpenGraphImage(title: string, path?: string): string {
  // In production, you might use a dynamic OG image service
  // For now, return default OG image
  return `${SITE_CONFIG.url}/og-image.jpg?title=${encodeURIComponent(title)}${
    path ? `&path=${encodeURIComponent(path)}` : ''
  }`;
}

/**
 * Get robots.txt content
 * Define crawlability for search engines
 * 
 * @returns Robots.txt content string
 */
export function getRobotsTxt(): string {
  return `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

Sitemap: ${SITE_CONFIG.url}/sitemap.xml
`;
}

/**
 * Format a date for use in metadata/RSS
 * 
 * @param date - Date object
 * @returns ISO string format
 */
export function formatDateForMetadata(date: Date): string {
  return date.toISOString();
}

/**
 * Generate excerpt from full text
 * Used for meta descriptions
 * 
 * @param text - Full text
 * @param length - Maximum length (default 155)
 * @returns Excerpt
 * 
 * @example
 * const excerpt = generateExcerpt(fullText, 155);
 */
export function generateExcerpt(text: string, length: number = 155): string {
  if (text.length <= length) {
    return text;
  }
  return text.substring(0, length).trim() + '...';
}

/**
 * Validate metadata for SEO best practices
 * 
 * @param metadata - Metadata to validate
 * @returns Validation result with warnings/errors
 */
export function validateMetadata(metadata: PageMetadataProps): {
  valid: boolean;
  warnings: string[];
  errors: string[];
} {
  const warnings: string[] = [];
  const errors: string[] = [];

  // Title validation
  if (!metadata.title) {
    errors.push('Title is required');
  } else if (metadata.title.length < 30) {
    warnings.push('Title should be at least 30 characters');
  } else if (metadata.title.length > 60) {
    warnings.push('Title should be less than 60 characters');
  }

  // Description validation
  if (!metadata.description) {
    errors.push('Description is required');
  } else if (metadata.description.length < 100) {
    warnings.push('Description should be at least 100 characters');
  } else if (metadata.description.length > 160) {
    warnings.push('Description should be less than 160 characters');
  }

  // Image validation for articles
  if (metadata.type === 'article' && !metadata.image) {
    warnings.push('Article should have an image for social sharing');
  }

  return {
    valid: errors.length === 0,
    warnings,
    errors,
  };
}
