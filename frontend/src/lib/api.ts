// src/lib/api.ts
import { PaginatedResponse, BlogPost, Author, Category, Tag } from "@/types/blog";
import { HomePageData, AboutPageData, ContactPageData, ServicesPageData, LegalPageData, SiteSettings, NavigationItem, ContactInfo } from "@/types/wagtail";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.detail || `API error: ${res.status}`);
  }

  return res.json();
}

// --- Pages ---

export async function getHomePage(): Promise<HomePageData> {
  return fetchAPI<HomePageData>("/pages/home/");
}

export async function getAboutPage(): Promise<AboutPageData> {
  return fetchAPI<AboutPageData>("/pages/about/");
}

export async function getContactPage(): Promise<ContactPageData> {
  return fetchAPI<ContactPageData>("/pages/contact/");
}

export async function getServicesPage(): Promise<ServicesPageData> {
  return fetchAPI<ServicesPageData>("/pages/services/");
}

export async function getPrivacyPolicyPage(): Promise<LegalPageData> {
  return fetchAPI<LegalPageData>("/pages/privacy-policy/");
}

export async function getTermsPage(): Promise<LegalPageData> {
  return fetchAPI<LegalPageData>("/pages/terms/");
}

// --- Blog ---

export async function getBlogPosts(params: {
  page?: number;
  category?: string;
  tag?: string;
  author?: string;
  search?: string;
  ordering?: string;
} = {}): Promise<PaginatedResponse<BlogPost>> {
  const query = new URLSearchParams();
  if (params.page) query.set("page", params.page.toString());
  if (params.category) query.set("categories__slug", params.category);
  if (params.tag) query.set("tags__slug", params.tag);
  if (params.author) query.set("author__slug", params.author);
  if (params.search) query.set("search", params.search);
  if (params.ordering) query.set("ordering", params.ordering);

  return fetchAPI<PaginatedResponse<BlogPost>>(`/blog/?${query.toString()}`);
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  return fetchAPI<BlogPost[]>("/blog/featured/");
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  return fetchAPI<BlogPost>(`/blog/${slug}/`);
}

// --- Taxonomy & Authors ---

export async function getAuthors(): Promise<PaginatedResponse<Author>> {
  return fetchAPI<PaginatedResponse<Author>>("/authors/");
}

export async function getAuthor(slug: string): Promise<Author> {
  return fetchAPI<Author>(`/authors/${slug}/`);
}

export async function getCategories(): Promise<PaginatedResponse<Category>> {
  return fetchAPI<PaginatedResponse<Category>>("/categories/");
}

export async function getCategory(slug: string): Promise<Category> {
  return fetchAPI<Category>(`/categories/${slug}/`);
}

export async function getTags(): Promise<PaginatedResponse<Tag>> {
  return fetchAPI<PaginatedResponse<Tag>>("/tags/");
}

export async function getTag(slug: string): Promise<Tag> {
  return fetchAPI<Tag>(`/tags/${slug}/`);
}

// --- Settings & Navigation ---

export async function getSiteSettings(): Promise<SiteSettings> {
  return fetchAPI<SiteSettings>("/settings/");
}

export async function getNavigation(): Promise<NavigationItem[]> {
  return fetchAPI<NavigationItem[]>("/navigation/");
}

export async function getContactInfo(): Promise<ContactInfo> {
  return fetchAPI<ContactInfo>("/contact-info/");
}
