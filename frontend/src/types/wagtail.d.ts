// src/types/wagtail.d.ts

export interface WagtailImage {
  id: number;
  url: string;
  width: number;
  height: number;
  alt: string;
}

export interface StreamFieldBlock {
  id: string | null;
  type: string;
  value: any;
}

export interface SEOMetadata {
  seo_title: string;
  search_description: string;
  canonical_url: string;
  og_title: string;
  og_description: string;
  og_image: string | null;
  og_type: string;
  twitter_title: string;
  twitter_description: string;
  twitter_image: string | null;
  twitter_card: string;
  meta_robots: string;
}

export interface BasePage {
  id: number;
  title: string;
  slug: string;
  seo: SEOMetadata;
  body: StreamFieldBlock[];
}

export interface HomePageData extends BasePage {
  hero_heading: string;
  hero_subheading: string;
  hero_cta_label: string;
  hero_cta_url: string;
  hero_image_url: string | null;
}

export interface AboutPageData extends BasePage {
  intro: string;
}

export interface ContactPageData extends BasePage {
  intro: string;
  form_submission_email: string;
  success_message: string;
}

export interface ServicesPageData extends BasePage {
  intro: string;
}

export interface LegalPageData extends BasePage {
  last_updated: string | null;
  last_published_at: string | null;
}

export interface NavigationItem {
  label: string;
  url: string;
}

export interface SiteSettings {
  site_name: string;
  site_tagline: string;
  logo_url: string | null;
  favicon_url: string | null;
  header_menu: NavigationItem[];
  footer_menu: NavigationItem[];
  facebook_url: string | null;
  twitter_url: string | null;
  instagram_url: string | null;
  github_url: string | null;
  copyright_text: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  google_maps_url: string | null;
}
