# Dual-Stack File & Folder Hierarchy
## Next.js 14+ App Router Frontend + Django + Wagtail CMS Backend
### Professional Blogging Website

> **Scope:** Pages, layouts, routing, configuration, API, and CMS integration files only.  
> UI component files are excluded throughout.  
> Both project roots are independently structured and can live in a monorepo or as separate repositories.

---

## Table of Contents

1. [Repository Root](#1-repository-root)
2. [Frontend — Next.js 14+ App Router (`frontend/`)](#2-frontend--nextjs-14-app-router-frontend)
   - [Route Map Reference](#21-route-map-reference)
   - [Top-Level Configuration](#22-top-level-configuration)
   - [src/ Directory Tree](#23-src-directory-tree)
   - [Route Group (site) — Static Site Pages](#24-route-group-site--static-site-pages)
   - [Route Group (blog) — Blog Domain Routes](#25-route-group-blog--blog-domain-routes)
   - [API Routes](#26-api-routes)
   - [Library & Type Utilities](#27-library--type-utilities)
3. [Backend — Django + Wagtail CMS (`backend/`)](#3-backend--django--wagtail-cms-backend)
   - [Domain App Map Reference](#31-domain-app-map-reference)
   - [Project Configuration Layer](#32-project-configuration-layer)
   - [App: `core/`](#33-app-core)
   - [App: `pages/`](#34-app-pages)
   - [App: `blog/`](#35-app-blog)
   - [App: `categories/`](#36-app-categories)
   - [App: `tags/`](#37-app-tags)
   - [App: `authors/`](#38-app-authors)
   - [App: `search/`](#39-app-search)
4. [Annotated Full Trees](#4-annotated-full-trees)
   - [Frontend Complete Tree](#41-frontend-complete-tree)
   - [Backend Complete Tree](#42-backend-complete-tree)

---

## 1. Repository Root

```
blogging-platform/
├── frontend/          # Next.js 14+ App Router project root
├── backend/           # Django + Wagtail CMS project root
├── .gitignore
└── README.md
```

---

## 2. Frontend — Next.js 14+ App Router (`frontend/`)

### 2.1 Route Map Reference

| URL Path              | Route Group  | Segment Path                              | Type     |
|-----------------------|--------------|-------------------------------------------|----------|
| `/`                   | `(site)`     | `(site)/page.tsx`                         | Static   |
| `/about`              | `(site)`     | `(site)/about/page.tsx`                   | Static   |
| `/services`           | `(site)`     | `(site)/services/page.tsx`                | Static   |
| `/contact`            | `(site)`     | `(site)/contact/page.tsx`                 | Static   |
| `/privacy-policy`     | `(site)`     | `(site)/privacy-policy/page.tsx`          | Static   |
| `/terms`              | `(site)`     | `(site)/terms/page.tsx`                   | Static   |
| `/blog`               | `(blog)`     | `(blog)/blog/page.tsx`                    | Dynamic  |
| `/blog/[slug]`        | `(blog)`     | `(blog)/blog/[slug]/page.tsx`             | Dynamic  |
| `/categories`         | `(blog)`     | `(blog)/categories/page.tsx`              | Dynamic  |
| `/categories/[slug]`  | `(blog)`     | `(blog)/categories/[slug]/page.tsx`       | Dynamic  |
| `/tags`               | `(blog)`     | `(blog)/tags/page.tsx`                    | Dynamic  |
| `/tags/[slug]`        | `(blog)`     | `(blog)/tags/[slug]/page.tsx`             | Dynamic  |
| `/authors`            | `(blog)`     | `(blog)/authors/page.tsx`                 | Dynamic  |
| `/authors/[slug]`     | `(blog)`     | `(blog)/authors/[slug]/page.tsx`          | Dynamic  |
| `/search`             | `(blog)`     | `(blog)/search/page.tsx`                  | Dynamic  |

---

### 2.2 Top-Level Configuration

```
frontend/
├── next.config.ts          # Next.js config — image domains, rewrites, env, CORS headers
├── tsconfig.json           # TypeScript compiler options, path aliases (@/*)
├── tailwind.config.ts      # Tailwind CSS — content paths, theme extensions, plugins
├── postcss.config.js       # PostCSS — required by Tailwind
├── middleware.ts            # Edge middleware — handles revalidation tokens, auth guards
├── .env.local              # Local env vars (NEXT_PUBLIC_API_URL, etc.) — gitignored
├── .env.example            # Documented env var template committed to repo
├── package.json
└── src/                    # All application source lives inside src/
```

---

### 2.3 `src/` Directory Tree

```
src/
├── app/                    # Next.js App Router root — all routes defined here
│   ├── layout.tsx          # Root shell layout — <html>, <body>, global providers, fonts
│   ├── not-found.tsx       # Global 404 page — catches unmatched routes at root level
│   ├── error.tsx           # Global error boundary — wraps all route segments
│   ├── loading.tsx         # Root-level Suspense fallback (rare; route-level preferred)
│   ├── sitemap.ts          # Dynamic XML sitemap — fetches slugs from Wagtail API
│   ├── robots.ts           # robots.txt generation — allow/disallow rules + sitemap URL
│   ├── manifest.ts         # Web app manifest — PWA metadata (name, icons, theme)
│   ├── opengraph-image.tsx # Default OG image — ImageResponse for root-level shares
│   │
│   ├── (site)/             # Route group — static marketing/site pages
│   │   └── ...             # See §2.4
│   │
│   ├── (blog)/             # Route group — all blog-domain dynamic routes
│   │   └── ...             # See §2.5
│   │
│   └── api/                # Next.js API route handlers (server-side, no UI)
│       └── ...             # See §2.6
│
├── lib/                    # Shared data-fetching and utility modules
│   └── ...                 # See §2.7
│
└── types/                  # Global TypeScript type declarations
    └── ...                 # See §2.7
```

---

### 2.4 Route Group `(site)` — Static Site Pages

```
src/app/(site)/
│
├── layout.tsx              # (site) layout — marketing shell: global nav, footer, analytics
│                           # Separate root layout from (blog) — different header/nav style
│
├── page.tsx                # Route: /  — Homepage; generateMetadata, JSON-LD WebSite schema
│
├── about/
│   └── page.tsx            # Route: /about — About page; static metadata export
│
├── services/
│   └── page.tsx            # Route: /services — Services page; static metadata export
│
├── contact/
│   ├── page.tsx            # Route: /contact — Contact page; static metadata export
│   └── loading.tsx         # Suspense fallback while contact form JS hydrates
│
├── privacy-policy/
│   └── page.tsx            # Route: /privacy-policy — Legal page; noindex robots meta
│
└── terms/
    └── page.tsx            # Route: /terms — Terms of service; noindex robots meta
```

---

### 2.5 Route Group `(blog)` — Blog Domain Routes

```
src/app/(blog)/
│
├── layout.tsx              # (blog) layout — blog shell: sidebar, tag cloud, reading progress
│                           # Separate root layout from (site) — dedicated blog chrome
│
├── blog/
│   ├── page.tsx            # Route: /blog — Post listing index; ISR revalidate, pagination meta
│   ├── loading.tsx         # Suspense skeleton for post list fetch
│   ├── error.tsx           # Error boundary for blog listing failures
│   ├── opengraph-image.tsx # OG image for /blog index share card
│   └── [slug]/
│       ├── page.tsx        # Route: /blog/[slug] — Single post; generateStaticParams,
│       │                   #   generateMetadata (title, OG, Twitter card, canonical)
│       ├── loading.tsx     # Per-post Suspense skeleton (skeleton article layout)
│       ├── error.tsx       # 404/500 boundary for missing or errored post slugs
│       └── opengraph-image.tsx  # Per-post dynamic OG image via ImageResponse (post title + image)
│
├── categories/
│   ├── page.tsx            # Route: /categories — Category index; lists all categories
│   ├── loading.tsx         # Suspense fallback for category list
│   └── [slug]/
│       ├── page.tsx        # Route: /categories/[slug] — Posts filtered by category;
│       │                   #   generateStaticParams, generateMetadata
│       └── loading.tsx     # Per-category Suspense skeleton
│
├── tags/
│   ├── page.tsx            # Route: /tags — Tag cloud index; all tags with post counts
│   ├── loading.tsx         # Suspense fallback for tag index
│   └── [slug]/
│       ├── page.tsx        # Route: /tags/[slug] — Posts filtered by tag;
│       │                   #   generateStaticParams, generateMetadata
│       └── loading.tsx     # Per-tag Suspense skeleton
│
├── authors/
│   ├── page.tsx            # Route: /authors — Author directory listing
│   ├── loading.tsx         # Suspense fallback for author list
│   └── [slug]/
│       ├── page.tsx        # Route: /authors/[slug] — Author profile + their posts;
│       │                   #   generateStaticParams, generateMetadata, Person JSON-LD
│       └── loading.tsx     # Per-author Suspense skeleton
│
└── search/
    ├── page.tsx            # Route: /search — Full-text search results; ?q= query param,
    │                       #   force-dynamic (never cached), generateMetadata with query
    └── loading.tsx         # Suspense skeleton while search results are streamed
```

---

### 2.6 API Routes

```
src/app/api/
│
├── revalidate/
│   └── route.ts            # POST /api/revalidate — On-demand ISR revalidation webhook;
│                           #   validates secret token, calls revalidatePath/revalidateTag
│
├── search/
│   └── route.ts            # GET /api/search?q=... — Proxies full-text search to Django;
│                           #   edge-compatible, adds caching headers
│
└── feed/
    └── route.ts            # GET /api/feed — RSS 2.0 / Atom XML feed for blog posts;
                            #   returns Response with Content-Type: application/xml
```

---

### 2.7 Library & Type Utilities

```
src/lib/
│
├── wagtail.ts              # Wagtail API client — typed fetch wrappers for all endpoints:
│                           #   getPage(), getPages(), getPost(), getPosts(),
│                           #   getCategory(), getTag(), getAuthor(), search()
│
├── api.ts                  # Generic fetch utility — base URL, error handling, cache config,
│                           #   TypeScript generics: apiFetch<T>(url, options)
│
├── seo.ts                  # SEO helpers — buildMetadata(), buildJsonLd(), canonicalUrl(),
│                           #   ArticleJsonLd, BreadcrumbJsonLd, PersonJsonLd builders
│
└── constants.ts            # Site-wide constants — SITE_URL, SITE_NAME, API_BASE, etc.

src/types/
│
├── wagtail.d.ts            # Wagtail API response types — WagtailPage, WagtailImage,
│                           #   PaginatedResponse<T>, WagtailAPIField
│
├── blog.d.ts               # Blog domain types — Post, Category, Tag, Author, SearchResult
│
└── seo.d.ts                # SEO types — JsonLdArticle, JsonLdPerson, OpenGraphMeta
```

---

## 3. Backend — Django + Wagtail CMS (`backend/`)

### 3.1 Domain App Map Reference

| Django App    | Wagtail Domain             | Mirrors Frontend Routes              |
|---------------|----------------------------|--------------------------------------|
| `core`        | Site config, base models   | Global/shared (layout, settings)     |
| `pages`       | Static site pages          | `/`, `/about`, `/services`, `/contact`, `/privacy-policy`, `/terms` |
| `blog`        | Blog posts                 | `/blog`, `/blog/[slug]`              |
| `categories`  | Post categories (Snippet)  | `/categories`, `/categories/[slug]`  |
| `tags`        | Post tags (Snippet)        | `/tags`, `/tags/[slug]`              |
| `authors`     | Author profiles (Snippet)  | `/authors`, `/authors/[slug]`        |
| `search`      | Full-text search endpoint  | `/search`                            |

---

### 3.2 Project Configuration Layer

```
backend/
│
├── manage.py               # Django management entry point
│
├── config/                 # Django project package (replaces default projectname/)
│   ├── __init__.py
│   ├── settings/
│   │   ├── __init__.py
│   │   ├── base.py         # Shared settings — INSTALLED_APPS, MIDDLEWARE, TEMPLATES,
│   │   │                   #   WAGTAIL_SITE_NAME, REST_FRAMEWORK defaults, AUTH_USER_MODEL
│   │   ├── development.py  # Dev overrides — DEBUG=True, SQLite or local Postgres,
│   │   │                   #   CORS_ALLOW_ALL_ORIGINS=True, wagtail.search.backends.database
│   │   └── production.py   # Prod overrides — SECRET_KEY from env, ALLOWED_HOSTS,
│   │                       #   WhiteNoise, Postgres, Redis cache, Elasticsearch search backend
│   │
│   ├── urls.py             # Root URL configuration — mounts all app URL modules +
│   │                       #   Wagtail admin + Wagtail API v2 router + wagtail.urls catch-all
│   │
│   ├── wsgi.py             # WSGI entry point — Gunicorn/uWSGI production server
│   └── asgi.py             # ASGI entry point — Daphne/Uvicorn for async (optional)
│
├── requirements/
│   ├── base.txt            # Core deps: Django, Wagtail, DRF, psycopg2, Pillow
│   ├── development.txt     # Dev deps: django-debug-toolbar, pytest-django, factory-boy
│   └── production.txt      # Prod deps: gunicorn, whitenoise, sentry-sdk, redis
│
├── Dockerfile              # Multi-stage build — builder + runtime stages
├── docker-compose.yml      # Local dev stack — Django, Postgres, Redis
└── .env.example            # Env var template — SECRET_KEY, DATABASE_URL, WAGTAIL_*, etc.
```

---

### 3.3 App: `core/`

Shared infrastructure — base page model, custom image model, global settings, API router.

```
backend/core/
│
├── __init__.py
│
├── models.py               # AbstractBasePage — shared SEO fields (seo_description,
│                           #   og_image, canonical_url) inherited by all page models;
│                           #   CustomImage extends AbstractImage (adds alt_text field);
│                           #   CustomRendition extends AbstractRendition
│
├── serializers.py          # BasePageSerializer — shared DRF fields for all page types:
│                           #   id, title, slug, seo_title, search_description, og_image_url
│
├── api.py                  # Wagtail API v2 router setup — registers all endpoint viewsets:
│                           #   PagesAPIViewSet, ImagesAPIViewSet, DocumentsAPIViewSet;
│                           #   WagtailAPIRouter("wagtailapi") instance exported for urls.py
│
├── urls.py                 # Core URL includes — mounts /api/v2/ (Wagtail API router),
│                           #   /cms/ (Wagtail admin), /django-admin/ (Django admin)
│
├── wagtail_hooks.py        # Global Wagtail admin hooks — custom admin menu items,
│                           #   construct_main_menu, register_admin_urls (analytics, etc.)
│
├── permissions.py          # DRF custom permissions — IsWagtailEditor, IsAdminOrReadOnly
│
├── pagination.py           # DRF pagination classes — StandardResultsSetPagination (20/page),
│                           #   LargeResultsSetPagination (100/page) for API consumers
│
└── migrations/
    └── 0001_initial.py     # CustomImage + CustomRendition + AbstractBasePage migrations
```

---

### 3.4 App: `pages/`

Static site pages — mirrors `(site)` route group: `/`, `/about`, `/services`, `/contact`, `/privacy-policy`, `/terms`.

```
backend/pages/
│
├── __init__.py
│
├── models.py               # Wagtail page models for all static site pages:
│                           #
│                           #   HomePage(AbstractBasePage)
│                           #     — hero_title, hero_subtitle, hero_cta_text, hero_cta_url
│                           #     — featured_posts M2M to BlogPage
│                           #     — parent_page_types = ["wagtailcore.Page"]
│                           #     — subpage_types = [AboutPage, ServicesPage, ...]
│                           #
│                           #   AboutPage(AbstractBasePage)
│                           #     — body StreamField, team_members StreamField
│                           #     — parent_page_types = ["pages.HomePage"]
│                           #
│                           #   ServicesPage(AbstractBasePage)
│                           #     — intro RichTextField, services_list StreamField
│                           #     — parent_page_types = ["pages.HomePage"]
│                           #
│                           #   ContactPage(AbstractBasePage)
│                           #     — email, phone, address, form_id CharField
│                           #     — parent_page_types = ["pages.HomePage"]
│                           #
│                           #   PrivacyPolicyPage(AbstractBasePage)
│                           #     — body RichTextField, last_updated DateField
│                           #     — parent_page_types = ["pages.HomePage"]
│                           #
│                           #   TermsPage(AbstractBasePage)
│                           #     — body RichTextField, last_updated DateField
│                           #     — parent_page_types = ["pages.HomePage"]
│
├── serializers.py          # DRF serializers per page type:
│                           #   HomePageSerializer, AboutPageSerializer,
│                           #   ServicesPageSerializer, ContactPageSerializer,
│                           #   PrivacyPolicyPageSerializer, TermsPageSerializer
│                           #   — all extend BasePageSerializer from core
│
├── views.py                # DRF APIView subclasses (non-Wagtail custom endpoints):
│                           #   HomePageAPIView — GET /api/pages/home/
│                           #   StaticPageAPIView — GET /api/pages/<slug>/
│                           #   — fetches live Wagtail pages by slug + page type
│
├── urls.py                 # pages URL patterns — included in config/urls.py:
│                           #   path("api/pages/", include("pages.urls"))
│                           #   GET api/pages/home/ → HomePageAPIView
│                           #   GET api/pages/<slug>/ → StaticPageAPIView
│
├── wagtail_hooks.py        # Wagtail admin customizations for static pages:
│                           #   register_admin_menu_item — "Pages" shortcut
│                           #   after_publish_page — cache invalidation signal for static pages
│                           #   construct_page_chooser_queryset — filter to pages app types
│
└── migrations/
    ├── 0001_initial.py     # HomePage, AboutPage, ServicesPage initial migration
    └── 0002_contact_legal.py  # ContactPage, PrivacyPolicyPage, TermsPage
```

---

### 3.5 App: `blog/`

Blog posts — mirrors `(blog)` routes: `/blog`, `/blog/[slug]`.

```
backend/blog/
│
├── __init__.py
│
├── models.py               # Blog domain models:
│                           #
│                           #   BlogIndexPage(AbstractBasePage)
│                           #     — intro RichTextField
│                           #     — subpage_types = ["blog.BlogPage"]
│                           #     — parent_page_types = ["pages.HomePage"]
│                           #     — def get_context() → paginated BlogPage children
│                           #
│                           #   BlogPage(AbstractBasePage)
│                           #     — intro CharField(max_length=300)
│                           #     — body StreamField (heading, paragraph, image, code, quote, embed)
│                           #     — hero_image FK → CustomImage
│                           #     — author FK → authors.Author (null=True)
│                           #     — categories M2M → categories.Category (through model)
│                           #     — tags M2M → tags.Tag (through model)
│                           #     — reading_time_minutes IntegerField (auto-computed)
│                           #     — parent_page_types = ["blog.BlogIndexPage"]
│                           #     — subpage_types = []
│                           #     — search_fields: intro, body, author__name
│                           #     — api_fields: intro, body, hero_image_url, author, categories, tags
│
├── serializers.py          # Blog DRF serializers:
│                           #   BlogPageListSerializer — lightweight (title, slug, intro,
│                           #     hero_image_url, author_name, published_at, reading_time)
│                           #   BlogPageDetailSerializer — full (all api_fields, body blocks,
│                           #     related_posts, categories, tags, author detail)
│                           #   BlogIndexPageSerializer — wraps paginated list response
│
├── views.py                # DRF ViewSets / APIViews:
│                           #   BlogPostListAPIView — GET /api/blog/
│                           #     — live(), order_by("-first_published_at"), pagination,
│                           #     — filterable by ?category=, ?tag=, ?author=
│                           #   BlogPostDetailAPIView — GET /api/blog/<slug>/
│                           #     — retrieves single live BlogPage by slug
│                           #   BlogStaticParamsAPIView — GET /api/blog/params/
│                           #     — returns all slugs for generateStaticParams in Next.js
│
├── urls.py                 # blog URL patterns:
│                           #   GET api/blog/ → BlogPostListAPIView
│                           #   GET api/blog/params/ → BlogStaticParamsAPIView
│                           #   GET api/blog/<slug>/ → BlogPostDetailAPIView
│
├── wagtail_hooks.py        # Blog admin hooks:
│                           #   after_publish_page — triggers /api/revalidate on BlogPage publish
│                           #     via requests.post() with revalidation token (ISR on-demand)
│                           #   register_rich_text_features — custom rich text extensions
│                           #   construct_explorer_page_queryset — scope explorer to blog pages
│
└── migrations/
    ├── 0001_initial.py     # BlogIndexPage + BlogPage initial schema
    └── 0002_reading_time.py   # reading_time_minutes computed field
```

---

### 3.6 App: `categories/`

Post categories — mirrors `/categories`, `/categories/[slug]`.

```
backend/categories/
│
├── __init__.py
│
├── models.py               # Category content models:
│                           #
│                           #   @register_snippet
│                           #   Category(models.Model)
│                           #     — name CharField(max_length=100, unique=True)
│                           #     — slug AutoSlugField(populate_from="name")
│                           #     — description RichTextField(blank=True)
│                           #     — cover_image FK → CustomImage (null=True)
│                           #     — seo_title, seo_description CharField
│                           #     — panels = [FieldPanel("name"), FieldPanel("description"),
│                           #                 FieldPanel("cover_image")]
│                           #     — search_fields = [index.SearchField("name")]
│                           #     — class Meta: ordering = ["name"], verbose_name_plural = "Categories"
│
├── serializers.py          # Category DRF serializers:
│                           #   CategoryListSerializer — id, name, slug, post_count (annotated)
│                           #   CategoryDetailSerializer — full fields + cover_image_url
│
├── views.py                # DRF APIViews:
│                           #   CategoryListAPIView — GET /api/categories/
│                           #     — all categories annotated with post_count, ordered by name
│                           #   CategoryDetailAPIView — GET /api/categories/<slug>/
│                           #     — single category + paginated posts in that category
│                           #   CategoryStaticParamsAPIView — GET /api/categories/params/
│                           #     — all category slugs for generateStaticParams
│
├── urls.py                 # categories URL patterns:
│                           #   GET api/categories/ → CategoryListAPIView
│                           #   GET api/categories/params/ → CategoryStaticParamsAPIView
│                           #   GET api/categories/<slug>/ → CategoryDetailAPIView
│
└── wagtail_hooks.py        # Wagtail admin hooks for Category snippet:
                            #   SnippetViewSet (Wagtail 5+) — icon="folder-open",
                            #     list_display=["name","slug","post_count_display"],
                            #     search_fields=["name"]
                            #   register_snippet(CategoryViewSet)

    migrations/
    └── 0001_initial.py     # Category model initial migration
```

---

### 3.7 App: `tags/`

Post tags — mirrors `/tags`, `/tags/[slug]`.

```
backend/tags/
│
├── __init__.py
│
├── models.py               # Tag content models:
│                           #
│                           #   @register_snippet
│                           #   Tag(models.Model)
│                           #     — name CharField(max_length=80, unique=True)
│                           #     — slug AutoSlugField(populate_from="name")
│                           #     — description TextField(blank=True)
│                           #     — seo_title, seo_description CharField
│                           #     — panels = [FieldPanel("name"), FieldPanel("description")]
│                           #     — class Meta: ordering = ["name"]
│                           #
│                           #   Note: Uses Django's own tagging rather than django-taggit
│                           #   to maintain full Wagtail snippet admin control and
│                           #   custom API field exposure (slug, SEO fields)
│
├── serializers.py          # Tag DRF serializers:
│                           #   TagListSerializer — id, name, slug, post_count (annotated)
│                           #   TagDetailSerializer — full fields + paginated posts
│
├── views.py                # DRF APIViews:
│                           #   TagListAPIView — GET /api/tags/
│                           #     — all tags with post_count annotation, ordered by name
│                           #   TagDetailAPIView — GET /api/tags/<slug>/
│                           #     — single tag + paginated posts bearing that tag
│                           #   TagStaticParamsAPIView — GET /api/tags/params/
│                           #     — all tag slugs for generateStaticParams
│
├── urls.py                 # tags URL patterns:
│                           #   GET api/tags/ → TagListAPIView
│                           #   GET api/tags/params/ → TagStaticParamsAPIView
│                           #   GET api/tags/<slug>/ → TagDetailAPIView
│
└── wagtail_hooks.py        # Wagtail admin hooks for Tag snippet:
                            #   TagViewSet(SnippetViewSet) — icon="tag",
                            #     list_display=["name","slug"],
                            #     search_fields=["name"]
                            #   register_snippet(TagViewSet)

    migrations/
    └── 0001_initial.py     # Tag model initial migration
```

---

### 3.8 App: `authors/`

Author profiles — mirrors `/authors`, `/authors/[slug]`.

```
backend/authors/
│
├── __init__.py
│
├── models.py               # Author content models:
│                           #
│                           #   @register_snippet
│                           #   Author(models.Model)
│                           #     — name CharField(max_length=150)
│                           #     — slug AutoSlugField(populate_from="name", unique=True)
│                           #     — bio RichTextField(blank=True)
│                           #     — photo FK → CustomImage (null=True)
│                           #     — email EmailField(blank=True)
│                           #     — website URLField(blank=True)
│                           #     — twitter_handle CharField(max_length=50, blank=True)
│                           #     — linkedin_url URLField(blank=True)
│                           #     — seo_title, seo_description CharField
│                           #     — panels = [FieldPanel("name"), FieldPanel("bio"),
│                           #                 FieldPanel("photo"), FieldPanel("email"),
│                           #                 MultiFieldPanel([social fields], "Social Links")]
│                           #     — search_fields = [index.SearchField("name"), index.SearchField("bio")]
│
├── serializers.py          # Author DRF serializers:
│                           #   AuthorListSerializer — id, name, slug, photo_url, post_count
│                           #   AuthorDetailSerializer — full fields + paginated posts,
│                           #     includes social links for JSON-LD Person schema on frontend
│
├── views.py                # DRF APIViews:
│                           #   AuthorListAPIView — GET /api/authors/
│                           #     — all authors with post_count annotation, ordered by name
│                           #   AuthorDetailAPIView — GET /api/authors/<slug>/
│                           #     — single author profile + paginated post list
│                           #   AuthorStaticParamsAPIView — GET /api/authors/params/
│                           #     — all author slugs for generateStaticParams
│
├── urls.py                 # authors URL patterns:
│                           #   GET api/authors/ → AuthorListAPIView
│                           #   GET api/authors/params/ → AuthorStaticParamsAPIView
│                           #   GET api/authors/<slug>/ → AuthorDetailAPIView
│
└── wagtail_hooks.py        # Wagtail admin hooks for Author snippet:
                            #   AuthorViewSet(SnippetViewSet) — icon="user",
                            #     list_display=["name","slug","email"],
                            #     search_fields=["name","email"]
                            #   register_snippet(AuthorViewSet)

    migrations/
    └── 0001_initial.py     # Author model initial migration
```

---

### 3.9 App: `search/`

Full-text search — mirrors `/search` route.

```
backend/search/
│
├── __init__.py
│
├── views.py                # Search DRF APIViews:
│                           #   SearchAPIView — GET /api/search/?q=<query>&type=<type>&page=<n>
│                           #     — uses Wagtail search backend (database / Elasticsearch)
│                           #     — searches BlogPage.objects.live().search(q)
│                           #     — optional ?type= filter: post | category | author | all
│                           #     — returns paginated SearchResult list with type discriminator
│                           #     — adds ?q= to response for frontend state reconstruction
│
├── serializers.py          # Search result serializers:
│                           #   SearchResultSerializer — polymorphic: title, slug, type,
│                           #     excerpt (truncated intro/bio), published_at, thumbnail_url
│
└── urls.py                 # search URL patterns:
                            #   GET api/search/ → SearchAPIView
                            #   (no migrations — no models, only querysets on existing models)
```

---

## 4. Annotated Full Trees

### 4.1 Frontend Complete Tree

```
frontend/
├── next.config.ts                         # Next.js config — images, rewrites, headers
├── tsconfig.json                          # TS config — strict, @/* path alias → src/*
├── tailwind.config.ts                     # Tailwind — content glob, theme, plugins
├── postcss.config.js                      # PostCSS — Tailwind + autoprefixer
├── middleware.ts                          # Edge — revalidation auth, redirect guards
├── .env.local                             # [gitignored] NEXT_PUBLIC_API_URL, etc.
├── .env.example                           # [committed] Env var documentation template
├── package.json
└── src/
    ├── app/
    │   ├── layout.tsx                     # Root <html><body> shell, font vars, providers
    │   ├── not-found.tsx                  # Global 404 — unmatched routes
    │   ├── error.tsx                      # Global error boundary
    │   ├── loading.tsx                    # Root Suspense fallback
    │   ├── sitemap.ts                     # → /sitemap.xml (dynamic, fetches all slugs)
    │   ├── robots.ts                      # → /robots.txt
    │   ├── manifest.ts                    # → /manifest.webmanifest (PWA)
    │   ├── opengraph-image.tsx            # → default OG image (ImageResponse)
    │   │
    │   ├── (site)/                        # ─── Route Group: static site pages ───
    │   │   ├── layout.tsx                 # (site) root layout — marketing nav/footer
    │   │   ├── page.tsx                   # /  ← Homepage
    │   │   ├── about/
    │   │   │   └── page.tsx               # /about
    │   │   ├── services/
    │   │   │   └── page.tsx               # /services
    │   │   ├── contact/
    │   │   │   ├── page.tsx               # /contact
    │   │   │   └── loading.tsx            # /contact Suspense
    │   │   ├── privacy-policy/
    │   │   │   └── page.tsx               # /privacy-policy (noindex)
    │   │   └── terms/
    │   │       └── page.tsx               # /terms (noindex)
    │   │
    │   ├── (blog)/                        # ─── Route Group: blog domain ───
    │   │   ├── layout.tsx                 # (blog) root layout — blog nav, sidebar
    │   │   ├── blog/
    │   │   │   ├── page.tsx               # /blog ← Post index, ISR revalidate
    │   │   │   ├── loading.tsx            # /blog Suspense skeleton
    │   │   │   ├── error.tsx              # /blog error boundary
    │   │   │   ├── opengraph-image.tsx    # /blog OG image
    │   │   │   └── [slug]/
    │   │   │       ├── page.tsx           # /blog/[slug] ← Post detail, generateStaticParams
    │   │   │       ├── loading.tsx        # /blog/[slug] skeleton
    │   │   │       ├── error.tsx          # /blog/[slug] boundary
    │   │   │       └── opengraph-image.tsx # Per-post dynamic OG image
    │   │   ├── categories/
    │   │   │   ├── page.tsx               # /categories ← Category index
    │   │   │   ├── loading.tsx            # /categories Suspense
    │   │   │   └── [slug]/
    │   │   │       ├── page.tsx           # /categories/[slug] ← Filtered posts
    │   │   │       └── loading.tsx        # /categories/[slug] Suspense
    │   │   ├── tags/
    │   │   │   ├── page.tsx               # /tags ← Tag cloud index
    │   │   │   ├── loading.tsx            # /tags Suspense
    │   │   │   └── [slug]/
    │   │   │       ├── page.tsx           # /tags/[slug] ← Filtered posts
    │   │   │       └── loading.tsx        # /tags/[slug] Suspense
    │   │   ├── authors/
    │   │   │   ├── page.tsx               # /authors ← Author directory
    │   │   │   ├── loading.tsx            # /authors Suspense
    │   │   │   └── [slug]/
    │   │   │       ├── page.tsx           # /authors/[slug] ← Profile + posts, Person JSON-LD
    │   │   │       └── loading.tsx        # /authors/[slug] Suspense
    │   │   └── search/
    │   │       ├── page.tsx               # /search ← force-dynamic, ?q= param
    │   │       └── loading.tsx            # /search Suspense skeleton
    │   │
    │   └── api/
    │       ├── revalidate/
    │       │   └── route.ts               # POST /api/revalidate — ISR webhook
    │       ├── search/
    │       │   └── route.ts               # GET /api/search — proxy to Django search
    │       └── feed/
    │           └── route.ts               # GET /api/feed — RSS/Atom XML feed
    │
    ├── lib/
    │   ├── wagtail.ts                     # Typed Wagtail API client — all fetch helpers
    │   ├── api.ts                         # Base fetch utility — apiFetch<T>()
    │   ├── seo.ts                         # buildMetadata(), JSON-LD builders
    │   └── constants.ts                   # SITE_URL, SITE_NAME, API_BASE, CACHE_TAGS
    │
    └── types/
        ├── wagtail.d.ts                   # Wagtail response types — WagtailPage, etc.
        ├── blog.d.ts                      # Blog domain types — Post, Category, Tag, Author
        └── seo.d.ts                       # SEO types — JsonLd*, OpenGraphMeta
```

---

### 4.2 Backend Complete Tree

```
backend/
├── manage.py                              # Django CLI entry point
├── Dockerfile                             # Multi-stage: builder + runtime
├── docker-compose.yml                     # Local: Django + Postgres + Redis
├── .env.example                           # Env var template (committed)
│
├── requirements/
│   ├── base.txt                           # Django, Wagtail, DRF, psycopg2, Pillow
│   ├── development.txt                    # debug-toolbar, pytest-django, factory-boy
│   └── production.txt                     # gunicorn, whitenoise, sentry-sdk, redis
│
├── config/                                # Django project package
│   ├── __init__.py
│   ├── settings/
│   │   ├── __init__.py
│   │   ├── base.py                        # INSTALLED_APPS, MIDDLEWARE, REST_FRAMEWORK,
│   │   │                                  #   WAGTAIL_SITE_NAME, WAGTAILIMAGES_IMAGE_MODEL,
│   │   │                                  #   WAGTAILAPI_LIMIT_MAX, CORS_ALLOWED_ORIGINS
│   │   ├── development.py                 # DEBUG=True, SQLite/local PG, all-origins CORS,
│   │   │                                  #   WAGTAILSEARCH_BACKENDS → database backend
│   │   └── production.py                  # SECRET_KEY from env, ALLOWED_HOSTS, HTTPS,
│   │                                      #   WhiteNoise, WAGTAILSEARCH → Elasticsearch
│   ├── urls.py                            # ROOT_URLCONF — includes:
│   │                                      #   core.urls (api/v2/, /cms/, /django-admin/)
│   │                                      #   pages.urls  → api/pages/
│   │                                      #   blog.urls   → api/blog/
│   │                                      #   categories.urls → api/categories/
│   │                                      #   tags.urls   → api/tags/
│   │                                      #   authors.urls → api/authors/
│   │                                      #   search.urls → api/search/
│   │                                      #   wagtail.urls (catch-all — must be last)
│   ├── wsgi.py                            # Gunicorn/uWSGI WSGI application
│   └── asgi.py                            # Uvicorn/Daphne ASGI application
│
├── core/                                  # ─── App: core ───
│   ├── __init__.py
│   ├── models.py                          # AbstractBasePage, CustomImage, CustomRendition
│   ├── serializers.py                     # BasePageSerializer (shared fields)
│   ├── api.py                             # WagtailAPIRouter — pages/images/documents endpoints
│   ├── urls.py                            # /api/v2/, /cms/, /django-admin/
│   ├── permissions.py                     # IsWagtailEditor, IsAdminOrReadOnly
│   ├── pagination.py                      # StandardResultsSetPagination (20), Large (100)
│   ├── wagtail_hooks.py                   # Global admin hooks, menu items
│   └── migrations/
│       └── 0001_initial.py               # CustomImage + AbstractBasePage
│
├── pages/                                 # ─── App: pages (site routes) ───
│   ├── __init__.py
│   ├── models.py                          # HomePage, AboutPage, ServicesPage,
│   │                                      #   ContactPage, PrivacyPolicyPage, TermsPage
│   ├── serializers.py                     # Per-page-type DRF serializers
│   ├── views.py                           # HomePageAPIView, StaticPageAPIView
│   ├── urls.py                            # api/pages/home/, api/pages/<slug>/
│   ├── wagtail_hooks.py                   # Publish hooks, page chooser filters
│   └── migrations/
│       ├── 0001_initial.py               # HomePage, AboutPage, ServicesPage
│       └── 0002_contact_legal.py         # ContactPage, PrivacyPolicyPage, TermsPage
│
├── blog/                                  # ─── App: blog (/blog, /blog/[slug]) ───
│   ├── __init__.py
│   ├── models.py                          # BlogIndexPage, BlogPage (StreamField body,
│   │                                      #   hero_image, author FK, categories M2M, tags M2M)
│   ├── serializers.py                     # BlogPageListSerializer, BlogPageDetailSerializer
│   ├── views.py                           # BlogPostListAPIView, BlogPostDetailAPIView,
│   │                                      #   BlogStaticParamsAPIView
│   ├── urls.py                            # api/blog/, api/blog/params/, api/blog/<slug>/
│   ├── wagtail_hooks.py                   # after_publish_page → ISR revalidation webhook
│   └── migrations/
│       ├── 0001_initial.py               # BlogIndexPage + BlogPage
│       └── 0002_reading_time.py          # reading_time_minutes field
│
├── categories/                            # ─── App: categories (/categories, /categories/[slug]) ───
│   ├── __init__.py
│   ├── models.py                          # Category snippet (name, slug, description,
│   │                                      #   cover_image, seo fields)
│   ├── serializers.py                     # CategoryListSerializer, CategoryDetailSerializer
│   ├── views.py                           # CategoryListAPIView, CategoryDetailAPIView,
│   │                                      #   CategoryStaticParamsAPIView
│   ├── urls.py                            # api/categories/, api/categories/params/,
│   │                                      #   api/categories/<slug>/
│   ├── wagtail_hooks.py                   # CategoryViewSet(SnippetViewSet) — register_snippet
│   └── migrations/
│       └── 0001_initial.py               # Category model
│
├── tags/                                  # ─── App: tags (/tags, /tags/[slug]) ───
│   ├── __init__.py
│   ├── models.py                          # Tag snippet (name, slug, description, seo fields)
│   ├── serializers.py                     # TagListSerializer, TagDetailSerializer
│   ├── views.py                           # TagListAPIView, TagDetailAPIView,
│   │                                      #   TagStaticParamsAPIView
│   ├── urls.py                            # api/tags/, api/tags/params/, api/tags/<slug>/
│   ├── wagtail_hooks.py                   # TagViewSet(SnippetViewSet) — register_snippet
│   └── migrations/
│       └── 0001_initial.py               # Tag model
│
├── authors/                               # ─── App: authors (/authors, /authors/[slug]) ───
│   ├── __init__.py
│   ├── models.py                          # Author snippet (name, slug, bio, photo,
│   │                                      #   email, website, social links, seo fields)
│   ├── serializers.py                     # AuthorListSerializer, AuthorDetailSerializer
│   ├── views.py                           # AuthorListAPIView, AuthorDetailAPIView,
│   │                                      #   AuthorStaticParamsAPIView
│   ├── urls.py                            # api/authors/, api/authors/params/,
│   │                                      #   api/authors/<slug>/
│   ├── wagtail_hooks.py                   # AuthorViewSet(SnippetViewSet) — register_snippet
│   └── migrations/
│       └── 0001_initial.py               # Author model
│
└── search/                                # ─── App: search (/search) ───
    ├── __init__.py
    ├── views.py                           # SearchAPIView — GET /api/search/?q=&type=&page=
    │                                      #   Wagtail search backend, polymorphic results
    ├── serializers.py                     # SearchResultSerializer — polymorphic output
    └── urls.py                            # api/search/ → SearchAPIView
                                           # (no models.py — no DB models, querysets only)
```

---

## Design Decisions & Conventions

### Frontend

| Decision | Rationale |
|---|---|
| `(site)` and `(blog)` as separate root layouts | Different chrome: marketing nav vs. blog sidebar; Next.js allows multiple `<html><body>` trees via route groups |
| `opengraph-image.tsx` per dynamic segment | Per-post/per-author OG images via `ImageResponse` without an API route; cached at build + on-demand |
| `force-dynamic` on `/search` | Search results must never be cached; ISR would return stale query results |
| `generateStaticParams` on all `[slug]` routes | Pre-renders all known slugs at build time; new slugs handled by ISR fallback blocking |
| `src/lib/wagtail.ts` as the API boundary | Single import point for all backend calls; swap implementation without touching page files |
| Separate `sitemap.ts` at root `app/` | Aggregates slugs from all domains (pages + blog + categories + tags + authors) into one sitemap |

### Backend

| Decision | Rationale |
|---|---|
| One Django app per domain | Clean separation; each app owns its models, serializers, views, URLs, and hooks |
| `AbstractBasePage` in `core` | DRY shared SEO fields; all page models inherit without duplication |
| `CustomImage` in `core` | Centralised `alt_text` and rendition control; referenced via `WAGTAILIMAGES_IMAGE_MODEL` |
| `*StaticParamsAPIView` on every app | Dedicated endpoints feed Next.js `generateStaticParams`; decoupled from list pagination |
| `after_publish_page` hook → ISR webhook | On-demand ISR revalidation avoids full rebuilds; Wagtail notifies Next.js on every publish |
| `SnippetViewSet` (Wagtail 5+) | Preferred over `@register_snippet` decorator alone; provides full admin CRUD + search |
| `config/settings/` split | `base → development → production` pattern; avoids conditional `if DEBUG` inside one file |
| `wagtail.urls` last in `config/urls.py` | Catch-all; must not shadow any custom API or admin paths above it |
