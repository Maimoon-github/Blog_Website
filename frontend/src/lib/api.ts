import type { BlogListResponse, BlogPostDetail, BlogPostListItem, Author, Category, Tag } from "@/types/blog";
import type { PaginatedResponse } from "@/types/wagtail";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function apiFetch<T>(
  path: string,
  options?: RequestInit & { revalidate?: number | false }
): Promise<T> {
  const { revalidate = 60, ...rest } = options ?? {};
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    next: revalidate === false ? { revalidate: 0 } : { revalidate },
    ...rest,
  });

  if (!res.ok) {
    throw new ApiError(res.status, `API error ${res.status}: ${path}`);
  }

  return res.json() as Promise<T>;
}

// ─── Blog ────────────────────────────────────────────────────────────────────

export async function getBlogList(params?: {
  page?: number;
  page_size?: number;
  category?: string;
  tag?: string;
  author?: number;
}): Promise<BlogListResponse> {
  const query = new URLSearchParams();
  if (params?.page) query.set("page", String(params.page));
  if (params?.page_size) query.set("page_size", String(params.page_size));
  if (params?.category) query.set("category", params.category);
  if (params?.tag) query.set("tag", params.tag);
  if (params?.author) query.set("author", String(params.author));
  const qs = query.toString() ? `?${query.toString()}` : "";
  return apiFetch<BlogListResponse>(`/api/blog/${qs}`);
}

export async function getBlogPost(slug: string): Promise<BlogPostDetail> {
  return apiFetch<BlogPostDetail>(`/api/blog/${slug}/`);
}

/** Used in generateStaticParams for SSG */
export async function getBlogSlugs(): Promise<string[]> {
  return apiFetch<string[]>(`/api/blog/params/`, { revalidate: false });
}

// ─── Authors ─────────────────────────────────────────────────────────────────

export async function getAuthors(): Promise<PaginatedResponse<Author>> {
  return apiFetch<PaginatedResponse<Author>>(`/api/authors/`);
}

export async function getAuthor(id: number): Promise<Author> {
  return apiFetch<Author>(`/api/authors/${id}/`);
}

// ─── Taxonomy ────────────────────────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  return apiFetch<Category[]>(`/api/categories/`);
}

export async function getTags(): Promise<Tag[]> {
  return apiFetch<Tag[]>(`/api/tags/`);
}

// ─── Search ──────────────────────────────────────────────────────────────────

export async function searchPosts(query: string): Promise<BlogPostListItem[]> {
  return apiFetch<BlogPostListItem[]>(`/api/search/?q=${encodeURIComponent(query)}`, {
    revalidate: false,
  });
}
