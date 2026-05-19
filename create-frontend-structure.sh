#!/usr/bin/env bash
# create-frontend-structure.sh
# Creates the frontend/ directory tree with all required empty files.
set -euo pipefail

# Base directory
BASE="frontend"

# Create all directories first
mkdir -p "$BASE"/src/app/'(site)'/about
mkdir -p "$BASE"/src/app/'(site)'/services
mkdir -p "$BASE"/src/app/'(site)'/contact
mkdir -p "$BASE"/src/app/'(site)'/privacy-policy
mkdir -p "$BASE"/src/app/'(site)'/terms

mkdir -p "$BASE"/src/app/'(blog)'/blog/'[slug]'
mkdir -p "$BASE"/src/app/'(blog)'/categories/'[slug]'
mkdir -p "$BASE"/src/app/'(blog)'/tags/'[slug]'
mkdir -p "$BASE"/src/app/'(blog)'/authors/'[slug]'
mkdir -p "$BASE"/src/app/'(blog)'/search

mkdir -p "$BASE"/src/app/api/revalidate
mkdir -p "$BASE"/src/app/api/search
mkdir -p "$BASE"/src/app/api/feed

mkdir -p "$BASE"/src/lib
mkdir -p "$BASE"/src/types

# Root app files
touch "$BASE"/src/app/layout.tsx
touch "$BASE"/src/app/not-found.tsx
touch "$BASE"/src/app/error.tsx
touch "$BASE"/src/app/loading.tsx
touch "$BASE"/src/app/sitemap.ts
touch "$BASE"/src/app/robots.ts
touch "$BASE"/src/app/manifest.ts
touch "$BASE"/src/app/opengraph-image.tsx

# (site) route group
touch "$BASE"/src/app/'(site)'/layout.tsx
touch "$BASE"/src/app/'(site)'/page.tsx
touch "$BASE"/src/app/'(site)'/about/page.tsx
touch "$BASE"/src/app/'(site)'/services/page.tsx
touch "$BASE"/src/app/'(site)'/contact/page.tsx
touch "$BASE"/src/app/'(site)'/contact/loading.tsx
touch "$BASE"/src/app/'(site)'/privacy-policy/page.tsx
touch "$BASE"/src/app/'(site)'/terms/page.tsx

# (blog) route group
touch "$BASE"/src/app/'(blog)'/layout.tsx
touch "$BASE"/src/app/'(blog)'/blog/page.tsx
touch "$BASE"/src/app/'(blog)'/blog/loading.tsx
touch "$BASE"/src/app/'(blog)'/blog/error.tsx
touch "$BASE"/src/app/'(blog)'/blog/opengraph-image.tsx
touch "$BASE"/src/app/'(blog)'/blog/'[slug]'/page.tsx
touch "$BASE"/src/app/'(blog)'/blog/'[slug]'/loading.tsx
touch "$BASE"/src/app/'(blog)'/blog/'[slug]'/error.tsx
touch "$BASE"/src/app/'(blog)'/blog/'[slug]'/opengraph-image.tsx

touch "$BASE"/src/app/'(blog)'/categories/page.tsx
touch "$BASE"/src/app/'(blog)'/categories/loading.tsx
touch "$BASE"/src/app/'(blog)'/categories/'[slug]'/page.tsx
touch "$BASE"/src/app/'(blog)'/categories/'[slug]'/loading.tsx

touch "$BASE"/src/app/'(blog)'/tags/page.tsx
touch "$BASE"/src/app/'(blog)'/tags/loading.tsx
touch "$BASE"/src/app/'(blog)'/tags/'[slug]'/page.tsx
touch "$BASE"/src/app/'(blog)'/tags/'[slug]'/loading.tsx

touch "$BASE"/src/app/'(blog)'/authors/page.tsx
touch "$BASE"/src/app/'(blog)'/authors/loading.tsx
touch "$BASE"/src/app/'(blog)'/authors/'[slug]'/page.tsx
touch "$BASE"/src/app/'(blog)'/authors/'[slug]'/loading.tsx

touch "$BASE"/src/app/'(blog)'/search/page.tsx
touch "$BASE"/src/app/'(blog)'/search/loading.tsx

# API routes
touch "$BASE"/src/app/api/revalidate/route.ts
touch "$BASE"/src/app/api/search/route.ts
touch "$BASE"/src/app/api/feed/route.ts

# Library files
touch "$BASE"/src/lib/wagtail.ts
touch "$BASE"/src/lib/api.ts
touch "$BASE"/src/lib/seo.ts
touch "$BASE"/src/lib/constants.ts

# Type declaration files
touch "$BASE"/src/types/wagtail.d.ts
touch "$BASE"/src/types/blog.d.ts
touch "$BASE"/src/types/seo.d.ts

echo "✅ Frontend directory hierarchy created under '$BASE'."