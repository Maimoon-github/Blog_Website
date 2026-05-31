# Headless Wagtail CMS – Architecture Reference

## Overview

This backend is a **production-grade, API-first Wagtail CMS** that serves content to a Next.js frontend.
Django templates are not used. All content is delivered via REST APIs.

---

## Project Structure

```
blog_project/
├── manage.py
├── celery.py                        ← Celery application
├── requirements/
│   ├── base.txt
│   ├── development.txt
│   └── production.txt
├── .env.example
├── config/
│   ├── settings/
│   │   ├── base.py                  ← Shared settings
│   │   ├── development.py
│   │   └── production.py
│   ├── urls.py                      ← Root URL config
│   ├── wsgi.py
│   └── asgi.py
├── apps/
│   ├── core/                        ← Abstract base models, mixins
│   ├── common/                      ← Shared StreamField blocks, utilities
│   ├── seo/                         ← SEO mixin, site/nav/contact settings
│   ├── pages/                       ← HomePage, AboutPage, ContactPage, ServicesPage, PrivacyPolicyPage, TermsPage
│   ├── blog/                        ← BlogIndexPage, BlogPage, signals
│   ├── authors/                     ← AuthorIndexPage, AuthorPage
│   ├── taxonomy/                    ← Category, Tag snippets
│   ├── search/                      ← Full-text search views
│   └── api/                         ← DRF views, pagination, feed, revalidation
├── media/
├── static/
└── docs/
```

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/blog/` | Blog posts (paginated, filterable) |
| GET | `/api/v1/blog/<slug>/` | Single post detail |
| GET | `/api/v1/blog/featured/` | Featured posts |
| GET | `/api/v1/blog/slugs/` | All slugs (generateStaticParams) |
| GET | `/api/v1/authors/` | Authors listing |
| GET | `/api/v1/authors/<slug>/` | Author detail + recent posts |
| GET | `/api/v1/authors/slugs/` | All author slugs |
| GET | `/api/v1/categories/` | All categories |
| GET | `/api/v1/categories/<slug>/` | Category detail |
| GET | `/api/v1/categories/<slug>/posts/` | Posts in category |
| GET | `/api/v1/categories/slugs/` | All category slugs |
| GET | `/api/v1/tags/` | All tags |
| GET | `/api/v1/tags/<slug>/` | Tag detail |
| GET | `/api/v1/tags/<slug>/posts/` | Posts with tag |
| GET | `/api/v1/tags/slugs/` | All tag slugs |
| GET | `/api/v1/pages/<slug>/` | Site page by slug |
| GET | `/api/v1/settings/` | Global site settings |
| GET | `/api/v1/navigation/` | Header + footer menus |
| GET | `/api/v1/feed/` | RSS/JSON/Atom feed |
| POST | `/api/v1/revalidate/` | ISR revalidation webhook |
| GET | `/api/v1/search/?q=` | Full-text search |
| GET | `/api/v1/search/suggest/?q=` | Autocomplete suggestions |
| GET | `/api/wagtail/pages/` | Wagtail API v2 – pages |
| GET | `/api/wagtail/images/` | Wagtail API v2 – images |
| GET | `/api/wagtail/blog/` | Wagtail API v2 – blog posts |
| GET | `/api/wagtail/authors/` | Wagtail API v2 – authors |
| GET | `/api/docs/swagger/` | Interactive Swagger UI |
| GET | `/api/docs/redoc/` | ReDoc documentation |

---

## Wagtail Admin

| Path | Description |
|------|-------------|
| `/cms/` | Wagtail admin panel |
| `/django-admin/` | Django admin (staff only) |

---

## Frontend ↔ Backend Route Mapping

| Next.js Route | Backend Model / Endpoint |
|--------------|--------------------------|
| `/` | `pages.HomePage` → `GET /api/v1/pages/home/` |
| `/about` | `pages.AboutPage` → `GET /api/v1/pages/about/` |
| `/contact` | `pages.ContactPage` → `GET /api/v1/pages/contact/` |
| `/services` | `pages.ServicesPage` → `GET /api/v1/pages/services/` |
| `/privacy-policy` | `pages.PrivacyPolicyPage` → `GET /api/v1/pages/privacy-policy/` |
| `/terms` | `pages.TermsPage` → `GET /api/v1/pages/terms/` |
| `/blog` | `blog.BlogIndexPage` → `GET /api/v1/blog/` |
| `/blog/[slug]` | `blog.BlogPage` → `GET /api/v1/blog/<slug>/` |
| `/authors` | `authors.AuthorIndexPage` → `GET /api/v1/authors/` |
| `/authors/[slug]` | `authors.AuthorPage` → `GET /api/v1/authors/<slug>/` |
| `/categories` | `taxonomy.Category` → `GET /api/v1/categories/` |
| `/categories/[slug]` | `taxonomy.Category` → `GET /api/v1/categories/<slug>/` |
| `/tags` | `taxonomy.Tag` → `GET /api/v1/tags/` |
| `/tags/[slug]` | `taxonomy.Tag` → `GET /api/v1/tags/<slug>/` |
| `/search` | → `GET /api/v1/search/?q=` |
| `sitemap.ts` | `GET /api/v1/blog/slugs/` + `GET /api/v1/authors/slugs/` etc. |
| `robots.ts` | Configured from `SiteSettings.robots` (future) |
| `manifest.ts` | Driven by `SiteSettings.site_name`, `site_logo` |
| `opengraph-image.tsx` | SEO fields → `og_image`, `og_title`, `og_description` |

---

## Wagtail Page Tree

```
Root (Wagtail default root)
└── HomePage (/)
    ├── AboutPage (/about)
    ├── ContactPage (/contact)
    ├── ServicesPage (/services)
    ├── PrivacyPolicyPage (/privacy-policy)
    ├── TermsPage (/terms)
    ├── BlogIndexPage (/blog)
    │   └── BlogPage (/blog/[slug])  × N
    └── AuthorIndexPage (/authors)
        └── AuthorPage (/authors/[slug])  × N
```

---

## Getting Started

```bash
# 1. Install dependencies
pip install -r requirements/development.txt

# 2. Set environment variables
cp .env.example .env
# Edit .env

# 3. Run migrations
python manage.py migrate

# 4. Create superuser
python manage.py createsuperuser

# 5. Create initial Wagtail site + page tree
python manage.py shell
# >>> from wagtail.models import Site, Page
# >>> ...  (see setup script below)

# 6. Run development server
python manage.py runserver

# 7. Run Celery worker (separate terminal)
celery -A celery worker -l info
```

---

## SEO Fields (per page)

Every `Page` that mixes in `SEOPageMixin` exposes:

- `seo_title`, `seo_description`, `canonical_url`, `robots`
- `og_title`, `og_description`, `og_image`, `og_type`
- `twitter_title`, `twitter_description`, `twitter_image`, `twitter_card`
- `schema_json` (raw JSON-LD)

All serialized into `seo: { ... }` in every page API response.

---

## ISR Revalidation Flow

1. Editor publishes/updates a `BlogPage` in Wagtail admin.
2. Wagtail `page_published` signal fires → `blog/signals.py`.
3. Celery task `revalidate_nextjs_page` is queued.
4. Task POSTs to `NEXTJS_SERVER_URL/api/revalidate` with the affected paths.
5. Next.js invalidates its ISR cache for those paths.

---

## StreamField Blocks (available on all pages)

| Block | Description |
|-------|-------------|
| `heading` | H2–H5 with optional anchor |
| `paragraph` | Rich text paragraph |
| `rich_text` | Full-feature rich text |
| `quote` | Pull-quote with attribution |
| `code` | Syntax-highlighted code |
| `markdown` | Raw Markdown (rendered client-side) |
| `image` | Responsive image with caption |
| `gallery` | Image grid |
| `embed` | oEmbed (YouTube, Vimeo, etc.) |
| `youtube` | Dedicated YouTube with controls |
| `button` | CTA button |
| `cta` | Full CTA section |
| `faq` | Accordion FAQ (with JSON-LD schema) |
| `statistics` | Numbers grid |
| `features` | Feature list/grid |
| `hero` | Full-width hero section |
| `testimonials` | Testimonial carousel/grid |
| `related_content` | Manual related page links |
