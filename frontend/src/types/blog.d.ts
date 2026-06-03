// src/types/blog.d.ts
import { WagtailImage, SEOMetadata, StreamFieldBlock } from "./wagtail";

export interface Author {
  id: number;
  title: string;
  slug: string;
  role: string;
  bio: string;
  photo: WagtailImage | null;
  facebook_url: string;
  twitter_url: string;
  linkedin_url: string;
  website_url: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: WagtailImage | null;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  body: StreamFieldBlock[];
  cover_image_url: string | null;
  cover_image_url_small: string | null;
  featured_image_url: string| null;
  published_date: string;
  updated_date: string | null;
  reading_time: number;
  is_featured: boolean;
  author: Author | null;
  categories: Category[];
  tag_names: string[];
  seo: SEOMetadata;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
