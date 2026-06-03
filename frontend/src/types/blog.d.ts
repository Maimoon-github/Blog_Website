import type { WagtailBasePage, StreamBlock, PaginatedResponse } from "./wagtail";

// Taxonomy
export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

// Author
export interface Author {
  id: number;
  name: string;
  bio: string;
  image_url: string | null;
  twitter_handle: string;
  website: string;
}

// Blog List Item (lightweight — for PostCard)
export interface BlogPostListItem extends WagtailBasePage {
  intro: string;
  hero_image_url: string | null;
  author_name: string | null;
  published_at: string;
  reading_time_minutes: number;
  categories: Pick<Category, "id" | "name" | "slug">[];
  tags: Pick<Tag, "id" | "name" | "slug">[];
}

// Blog Detail (full — for post page)
export interface BlogPostDetail extends WagtailBasePage {
  intro: string;
  body: StreamBlock[];
  hero_image_url: string | null;
  author: Author | null;
  categories: Category[];
  tags: Tag[];
  reading_time_minutes: number;
  published_at: string;
  related_posts: BlogPostListItem[];
}

// API response wrapper
export type BlogListResponse = PaginatedResponse<BlogPostListItem>;
