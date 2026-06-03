/**
 * Navigation Configuration & Utilities
 * 
 * Central source of truth for all navigation links across the application.
 * Used by: Header, Footer, Breadcrumbs, Sitemap, and dynamically generated menus.
 * 
 * Benefits:
 * - Single source of truth for URL consistency
 * - Easy to maintain and update navigation structure
 * - Enables automatic active link detection
 * - Supports nested navigation for dropdowns
 * - Type-safe navigation throughout the app
 */

/**
 * Navigation item structure with support for nested children
 */
export type NavItem = {
  label: string;
  href: string;
  description?: string;
  icon?: string;
  children?: NavItem[];
  external?: boolean;
};

/**
 * Primary navigation structure (Header nav)
 * Appears in the main navigation menu and mobile menu
 * Order matters - displayed in this order
 */
export const PRIMARY_NAVIGATION: NavItem[] = [
  {
    label: 'Home',
    href: '/',
    description: 'Back to homepage',
  },
  {
    label: 'Blog',
    href: '/blog',
    description: 'Explore our latest articles',
    children: [
      {
        label: 'All Articles',
        href: '/blog',
        description: 'Browse all posts',
      },
      {
        label: 'Categories',
        href: '/blog/categories',
        description: 'Browse by category',
      },
      {
        label: 'Authors',
        href: '/blog/authors',
        description: 'Meet our writers',
      },
      {
        label: 'Tags',
        href: '/blog/tags',
        description: 'Browse by topic',
      },
      {
        label: 'Search',
        href: '/blog/search',
        description: 'Find specific content',
      },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    description: 'What we offer',
  },
  {
    label: 'About',
    href: '/about',
    description: 'Our story and mission',
  },
  {
    label: 'Contact',
    href: '/contact',
    description: 'Get in touch',
  },
];

/**
 * Footer navigation structure
 * Organized by section for better UX in the footer
 */
export const FOOTER_NAVIGATION = {
  /**
   * Quick links section - main pages
   */
  quickLinks: [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Blog',
      href: '/blog',
    },
    {
      label: 'Categories',
      href: '/blog/categories',
    },
    {
      label: 'Authors',
      href: '/blog/authors',
    },
    {
      label: 'Services',
      href: '/services',
    },
    {
      label: 'About',
      href: '/about',
    },
    {
      label: 'Contact',
      href: '/contact',
    },
  ],

  /**
   * Legal/Policy links
   */
  legal: [
    {
      label: 'Privacy Policy',
      href: '/privacy-policy',
    },
    {
      label: 'Terms of Service',
      href: '/terms',
    },
  ],

  /**
   * Social media links - typically external
   */
  social: [
    {
      label: 'Twitter',
      href: 'https://twitter.com/earthenhomes',
      icon: '𝕏',
      external: true,
    },
    {
      label: 'Instagram',
      href: 'https://instagram.com/earthenhomes',
      icon: '📷',
      external: true,
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/company/earthenhomes',
      icon: '🔗',
      external: true,
    },
    {
      label: 'Facebook',
      href: 'https://facebook.com/earthenhomes',
      icon: '📘',
      external: true,
    },
  ],
};

/**
 * Site metadata for head and structured data
 */
export const SITE_CONFIG = {
  name: 'Earthen Homes & Hot Tub Escapes',
  shortName: 'Earthen Homes',
  description:
    'A premium lifestyle portal about organic architecture, eco-friendly living, and romantic hotel getaways featuring in-room hot tubs.',
  url: 'https://earthenhomes.com',
  logo: 'https://earthenhomes.com/logo.svg',
  favicon: '/favicon.ico',
  email: 'hello@earthenhomes.com',
  author: {
    name: 'Earthen Homes Team',
    url: 'https://earthenhomes.com',
  },
  social: {
    twitter: '@earthenhomes',
    instagram: '@earthenhomes',
  },
  keywords: [
    'organic architecture',
    'eco-friendly living',
    'sustainable homes',
    'cob houses',
    'rammed earth',
    'hot tub escapes',
    'romantic getaways',
    'earth building',
  ],
};

/**
 * Utility function to flatten navigation for sitemap generation
 * Recursively extracts all hrefs from navigation structure
 */
export function flattenNavigation(nav: NavItem[]): NavItem[] {
  return nav.flatMap((item) => [
    item,
    ...(item.children ? flattenNavigation(item.children) : []),
  ]);
}

/**
 * Utility function to find active navigation item based on current pathname
 * 
 * @param pathname - Current pathname from usePathname()
 * @param navigation - Navigation array to search through
 * @returns The active NavItem or undefined
 * 
 * @example
 * const pathname = usePathname();
 * const active = findActiveNavItem(pathname, PRIMARY_NAVIGATION);
 */
export function findActiveNavItem(
  pathname: string,
  navigation: NavItem[]
): NavItem | undefined {
  return navigation.find((item) => {
    if (item.href === '/' && pathname === '/') return true;
    if (item.href !== '/' && pathname.startsWith(item.href)) return true;
    if (item.children) {
      return findActiveNavItem(pathname, item.children);
    }
    return false;
  });
}

/**
 * Utility function to detect if a route is active
 * Used in Header/Footer components for styling active links
 * 
 * @param href - The link href to check
 * @param pathname - Current pathname from usePathname()
 * @returns Boolean indicating if the link is active
 * 
 * @example
 * const isActive = isActiveRoute('/blog', pathname);
 * className={isActive ? 'text-blue-600' : 'text-gray-600'}
 */
export function isActiveRoute(href: string, pathname: string): boolean {
  if (href === '/') {
    return pathname === '/';
  }
  return pathname === href || pathname.startsWith(href + '/');
}

/**
 * Get breadcrumb navigation for current route
 * 
 * @param pathname - Current pathname from usePathname()
 * @returns Array of breadcrumb items
 * 
 * @example
 * const breadcrumbs = getBreadcrumbs(pathname);
 * // Returns: [
 * //   { label: 'Home', href: '/' },
 * //   { label: 'Blog', href: '/blog' },
 * //   { label: 'Article Title', href: '/blog/article-title' }
 * // ]
 */
export function getBreadcrumbs(pathname: string): NavItem[] {
  const parts = pathname.split('/').filter(Boolean);
  const breadcrumbs: NavItem[] = [
    {
      label: 'Home',
      href: '/',
    },
  ];

  let currentPath = '';
  for (const part of parts) {
    currentPath += `/${part}`;
    // Convert slug to title (e.g., "my-article" → "My Article")
    const label = part
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    breadcrumbs.push({
      label,
      href: currentPath,
    });
  }

  return breadcrumbs;
}

/**
 * Check if a route requires authentication
 * Used for route protection middleware
 */
export const PROTECTED_ROUTES = [
  '/admin',
  '/dashboard',
  '/account',
];

/**
 * Public routes that don't need special treatment
 */
export const PUBLIC_ROUTES = flattenNavigation(PRIMARY_NAVIGATION)
  .map((item) => item.href)
  .filter((href) => !href.startsWith('http'));
