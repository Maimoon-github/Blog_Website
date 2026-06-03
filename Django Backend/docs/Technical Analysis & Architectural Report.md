# Technical Research Report: `apps.api` Django Application

## 1. Executive Summary

The `apps.api` application serves as a high-performance, headless REST API interface designed to bridge a Django-backed Wagtail Content Management System (CMS) with an asynchronous Next.js frontend application. It handles all content requests from the frontend, manages complex multi-tiered caching strategies to optimize response latencies, and exposes comprehensive querying mechanisms across sites, blog architectures, metadata profiles, and taxonomy categories.

Beyond data fetching, `apps.api` implements a robust infrastructure for data synchronization, using Celery background tasks and Webhook layers to push immediate Incremental Static Regeneration (ISR) signals directly to Next.js whenever administrators update content. It also acts as an automated multi-format feed generation node, broadcasting real-time syndication feeds (RSS, Atom, and JSON Feed) to external consumers.

---

## 2. Directory Structure and Architectural Mapping

The application is structured into modular specialized modules, partitioning concerns across routing, view controllers, filtering engines, syndication channels, and background execution lines:

```text
apps/api/
├── __init__.py
├── apps.py           # Core application metadata configuration
├── feed.py           # RSS, Atom, and JSON Feed 1.1 generation views
├── filters.py        # Django-Filter rule configurations for viewsets
├── pagination.py     # Custom pagination classes conforming to Next.js models
├── permissions.py    # Multi-layered authentication and token validation predicates
├── revalidate.py     # Inbound ISR webhook routing logic to Next.js
├── tasks.py          # Celery background tasks for non-blocking operations
├── urls.py           # Centralized API routing layout and endpoint definitions
└── views.py          # ViewSet controllers handling core content serialization

```

### Application Config (`apps.py`)

The application defines its metadata state via `ApiConfig` which extends Django’s core `AppConfig` class. It sets the database auto-increment column behavior to `BigAutoField` and mounts the application name under the fully-qualified Python path namespace `apps.api`.

---

## 3. Routing & Endpoint Architecture (`urls.py`)

All endpoints are bound under the internal application namespace `v1` and use a Django Rest Framework (DRF) `DefaultRouter` initialized with explicit trailing slashes. The endpoints are split into dynamic ViewSets and stateful Singleton views:

| Endpoint Pattern | Handler Component | Request Type | Target Data / Resource |
| --- | --- | --- | --- |
| `/api/v1/pages/` | `PagesViewSet` | `GET` | List available core site page slugs |
| `/api/v1/pages/<slug>/` | `PagesViewSet` | `GET` | Retrieve specific cached page configurations |
| `/api/v1/blog/` | `BlogViewSet` | `GET` | Fetch paginated, ordered, and filtered blog post records |
| `/api/v1/blog/<slug>/` | `BlogViewSet` | `GET` | Retrieve a detailed single blog post |
| `/api/v1/blog/featured/` | `BlogViewSet` | `GET` | Retrieve a filtered array of up to 6 highlighted posts |
| `/api/v1/blog/slugs/` | `BlogViewSet` | `GET` | Streamlined object array of all live post slugs |
| `/api/v1/authors/` | `AuthorsViewSet` | `GET` | Fetch paginated profiles of authors |
| `/api/v1/authors/<slug>/` | `AuthorsViewSet` | `GET` | Retrieve single author profiles with detailed objects |
| `/api/v1/authors/slugs/` | `AuthorsViewSet` | `GET` | Streamlined layout of all live author slugs |
| `/api/v1/categories/` | `CategoriesViewSet` | `GET` | Paginated listing of taxonomy categories |
| `/api/v1/categories/<slug>/` | `CategoriesViewSet` | `GET` | Retrieve category details |
| `/api/v1/categories/<slug>/posts/` | `CategoriesViewSet` | `GET` | Paginated blog posts filtered by the specific category |
| `/api/v1/tags/` | `TagsViewSet` | `GET` | Paginated tag instances |
| `/api/v1/tags/<slug>/posts/` | `TagsViewSet` | `GET` | Paginated blog posts associated with the specified tag |
| `/api/v1/settings/` | `SiteSettingsView` | `GET` | Retrieve global identity attributes and tracking IDs |
| `/api/v1/navigation/` | `NavigationView` | `GET` | Fetch multi-section header, footer, and social menus |
| `/api/v1/contact-info/` | `ContactInfoView` | `GET` | Fetch structural email, phone, and address blocks |
| `/api/v1/feed/` | `FeedView` | `GET` | Expose RSS, Atom, or JSON Feed representations |
| `/api/v1/revalidate/` | `RevalidateView` | `POST` | Process incoming/outbound ISR cache clearing commands |

---

## 4. Deep-Dive Endpoint & View Implementations (`views.py`)

### Core Content Caching Lifecycle

To guarantee extreme speed for the frontend server, `views.py` sets up three granular caching thresholds leveraging Django's underlying cache storage engine:

* `CACHE_SHORT` (5 minutes): Applied to dynamic data vectors subject to high volatility, such as single blog post item retrievals.
* `CACHE_MEDIUM` (15 minutes): Applied to structured system configurations, such as the core descriptive layout pages mapped inside the system.
* `CACHE_LONG` (1 hour): Applied to operational static structures such as main navigation links, overall site settings, and physical contact maps.

### The Core ViewSet Architectures

1. **`PagesViewSet` (Custom `ViewSet` Architecture)**:
Avoids typical model query lookups by utilizing an immutable dictionary map named `_PAGE_MAP`. It maps string identifiers (`home`, `about`, `contact`, `services`, `privacy-policy`, `terms`) directly to their specific Wagtail page classes (`HomePage`, `AboutPage`, etc.) and corresponding custom Serializer layers. Individual item retrievals verify whether a cached string exists at key `page:<slug>`; if missing, it queries the target model's database configuration using `.live().first()`, updates the cache layer for 15 minutes, and responds back.
2. **`BlogViewSet` (`ReadOnlyModelViewSet` Base)**:
Returns public records matching `BlogPage.objects.live().public()`. It optimizes performance through database jointures via `.select_related("author", "cover_image", "featured_image")` and eager prefetching via `.prefetch_related("categories", "tags")`. It changes serializers contextually, responding with `BlogPostDetailSerializer` during single item retrievals and `BlogPostMinimalSerializer` for grid lists to conserve packet bandwidth. The endpoint handles default sorting rules by enforcing descending order on the `published_date` field (`-published_date`).
3. **`AuthorsViewSet` (`ReadOnlyModelViewSet` Base)**:
Manages the serialization profiles of authors by capturing `AuthorPage` instances. It enforces automatic pre-selection of image items via `.select_related("photo")` and uses the standard `StandardResultsPagination` schema. It exposes a specific route layout via `/api/v1/authors/slugs/` to feed the static compilation layer of the Next.js application framework.
4. **`CategoriesViewSet` & `TagsViewSet` (Taxonomy Control Layers)**:
Handle sorting criteria for indexing blog components across topics. `CategoriesViewSet` enforces alphabetical lookups sorted by custom explicit ordering fields (`order`, `name`). Both views provide a nested sub-action endpoint (`/posts/`) that acts as a relational reverse-query filter. For example, when invoking the category posts action, it extracts the target category instance, scans the live `BlogPage` queryset, filters results using `filter(categories=category)`, applies full list pre-fetches, and responds with a paginated payload.

---

## 5. Filtering and Pagination Infrastructure

### Advanced Data Filtering Layer (`filters.py`)

The application implements highly granular querying mechanisms driven by the `django-filter` engine to narrow down blog queries. `BlogPostFilter` maps explicit URL search terms to database properties:

* `category`: Maps directly onto `categories__slug` using an exact match expression.
* `tag`: Maps onto the tag taxonomy text array via case-insensitive `tags__name` filtering (`iexact`).
* `author`: Resolves authorship through an exact slug check against `author__slug`.
* `featured`: Accepts a boolean token (`True`/`False`) matching against `is_featured`.
* `published_before` / `published_after`: Accepts standard ISO datetime strings to bounds-test post objects using `lte` (less than or equal) and `gte` (greater than or equal) parameters against the model's `published_date`.

### Custom Pagination Engines (`pagination.py`)

To prevent breaking changes during compilation pipelines inside Next.js data hooks (such as `getStaticProps` or `generateStaticParams`), pagination objects must be completely uniform. `apps.api` creates two distinct structures subclassed from DRF's `PageNumberPagination`:

```python
class StandardResultsPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 100
    page_query_param = "page"

```

It re-shapes the root JSON envelope to separate structural index statistics into a dedicated metadata property block called `pagination`:

```json
{
  "pagination": {
    "count": 142,
    "total_pages": 15,
    "current_page": 1,
    "page_size": 10,
    "next": "http://localhost:8000/api/v1/blog/?page=2",
    "previous": null,
    "has_next": true,
    "has_previous": false
  },
  "results": [ ... ]
}

```

* **`LargeResultsPagination`**: Tailored for lightweight data elements like categories or tags, it shifts default volume targets upwards to `50` elements per page, allowing client overwrites up to a strict `200` item limit.

---

## 6. Syndication and Feed Generation Layer (`feed.py`)

The syndication module processes external consumer polling requests through `FeedView(APIView)`. It supports three formats handled selectively through the use of a `?format=` parameter query string:

1. **RSS 2.0 (`?format=rss`)**: Default output channel parsing information fields into a valid `application/rss+xml` content-type output string.
2. **Atom (`?format=atom`)**: Generates structured XML schemas rendered as `application/atom+xml` with strict timestamp compliance.
3. **JSON Feed 1.1 (`?format=json`)**: Formats post objects into standard compliance JSON structures outputted as `application/feed+json`.

### Internal Feed Resolution Pipeline

When a request hits `FeedView`, an internal pipeline function named `_build_generator(request)` runs:

* Resolves the current base domain by searching for a configured `NEXTJS_SERVER_URL` inside core settings or fallbacks onto the active request header absolute URI.
* Queries the database for the top `50` most recent live, public blog posts.
* Loops over the entries, converting post details into standard structures: excerpt summaries populate item text blocks, categories populate term definitions, author models add signature markers, and absolute media references append an `enclosure` block matching `image/jpeg` MIME signatures.

---

## 7. Frontend Synchronization & ISR Webhook Layer

### Security Profiles (`permissions.py`)

Data integrity controls restrict operations to specific contexts:

* **`IsAdminOrReadOnly`**: Enforces strict read-only states (`GET`, `HEAD`, `OPTIONS`) across all public requests while rejecting unsafe state mutations unless the authentication context can prove the operator is a Wagtail Administrator staff user (`request.user.is_staff`).
* **`IsRevalidationToken`**: Dedicated token matching filter used exclusively to secure the revalidation channels. It intercepts headers for a token signature labeled `X-Revalidation-Secret`, checks query arguments for `?secret=`, or inspects raw POST payloads for a matching key string. It cross-checks the extracted token string against the backend's hidden configuration attribute `settings.REVALIDATION_SECRET`.

### Incremental Static Regeneration Engine (`revalidate.py`)

When a change occurs inside the Wagtail admin interface, the application must immediately flush out outdated static cache buckets compiled across edge distribution rings. `RevalidateView(APIView)` acts as an entry point webhook processor:

* It parses incoming JSON structures to determine the revalidation strategy, handling them either by explicit **URL paths** (e.g., `{"paths": ["/blog/post-slug"], "type": "path"}`) or by logical **cache tag arrays** (e.g., `{"tag": "blog-posts", "type": "tag"}`).
* It builds a request payload containing the required cryptographic validation string, loops through the paths array, and executes outbound synchronous REST HTTP requests hitting the Next.js server location pattern under `{nextjs_url}/api/revalidate`.

### Async Celery Worker Dispatcher (`tasks.py`)

To prevent blocking the Django web request-response cycle when an author saves complex page arrays inside the Wagtail admin interface, `revalidate_nextjs_page` offloads outbound webhook delivery to a Celery worker pool.

The application contains an updated, resilient definition of this background worker:

* **Robust Failover Execution**: Implements automatic exception catching bound to network anomalies via `autoretry_for=(requests.RequestException,)`.
* **Exponential Backoff Schedule**: Rather than hammering the frontend node during a brief network interruption, it uses `retry_backoff=True` to scale delay spacing across a maximum constraint window of `max_retries=5`.
* **Authorization Headers**: Passes the validation verification keys inside an HTTP header string (`Authorization: Bearer <secret>`), giving the target Next.js endpoint immediate validation confirmation.

---

## 8. Supplementary Design Materials (Technical Blueprint Examples)

As part of the technical requirements, the following implementation blueprints demonstrate how to configure, extend, or consume the `apps.api` application layer.

### Supplementary File A: Next.js API Integration Client (`api.ts`)

This client file demonstrates how the frontend application handles communication with the endpoints exposed by `apps.api`.

```typescript
// src/lib/api.ts
import { BlogPost, PaginationWrapper } from '../types/blog';

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:8000/api/v1';

export async function fetchBlogPosts(page = 1, pageSize = 10, filters: Record<string, string> = {}): Promise<PaginationWrapper<BlogPost>> {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    page_size: pageSize.toString(),
    ...filters
  });

  const response = await fetch(`${BACKEND_API_URL}/blog/?${queryParams.toString()}`, {
    next: { tags: ['blog-posts'] }, // Next.js Cache Tag tagging mechanics
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  if (!response.ok) {
    throw new Error(`Backend fetch failed with status: ${response.status}`);
  }

  return response.json();
}

export async function fetchSinglePost(slug: string): Promise<BlogPost> {
  const response = await fetch(`${BACKEND_API_URL}/blog/${slug}/`, {
    next: { revalidate: 900 } // ISR Fallback timeout config
  });
  
  if (!response.ok) {
    if (response.status === 404) throw new Error('Not Found');
    throw new Error('Failed to fetch post detail data.');
  }
  return response.json();
}

```

### Supplementary File B: Django Settings Configuration Template (`api_settings.py`)

This configuration template outlines the required setup inside `config/settings/base.py` to support the operational demands of the `apps.api` module.

```python
# config/settings/base.py
import os
from cvdata import env

# Core Application Registry Definition
INSTALLED_APPS = [
    # Core Django & Wagtail dependencies here...
    "rest_framework",
    "django_filters",
    "apps.api.apps.ApiConfig", # Custom API configuration module mounting
]

# Next.js Federation Configuration Attributes
NEXTJS_SERVER_URL = env("NEXTJS_SERVER_URL", default="http://localhost:3000")
NEXTJS_FRONTEND_URL = env("NEXTJS_FRONTEND_URL", default="http://localhost:3000")
REVALIDATION_SECRET = env("REVALIDATION_SECRET", default="crypto-secure-token-string")
NEXTJS_REVALIDATION_SECRET = env("NEXTJS_REVALIDATION_SECRET", default="crypto-secure-token-string")

# REST Framework Global Policy Specifications
REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.AllowAny",
    ],
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
        "rest_framework.filters.SearchFilter",
        "rest_framework.filters.OrderingFilter",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [], # Completely headless token validation
}

```