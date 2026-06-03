// Base Wagtail page fields (from core.serializers.BasePageSerializer)
export interface WagtailBasePage {
  id: number;
  title: string;
  slug: string;
  seo_display_title: string;
  search_description: string;
  first_published_at: string;
  last_published_at: string;
}

// Paginated API response wrapper
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// StreamField block — discriminated union on `type`
export type StreamBlock =
  | { type: "paragraph"; value: string }
  | { type: "heading"; value: string }
  | { type: "code"; value: { language: string; code: string } }
  | { type: "quote"; value: { text: string; attribution: string } }
  | { type: "embed"; value: { url: string; html: string } }
  | { type: "image"; value: { url: string; alt: string; width: number; height: number } };
