#!/usr/bin/env bash
# create-backend-structure.sh
# Creates the backend/ directory tree with all required empty files.
set -euo pipefail

BASE="backend"

# Root files
mkdir -p "$BASE"
touch "$BASE"/manage.py
touch "$BASE"/Dockerfile
touch "$BASE"/docker-compose.yml
touch "$BASE"/.env.example

# Requirements directory
mkdir -p "$BASE"/requirements
touch "$BASE"/requirements/base.txt
touch "$BASE"/requirements/development.txt
touch "$BASE"/requirements/production.txt

# Config package
mkdir -p "$BASE"/config/settings
touch "$BASE"/config/__init__.py
touch "$BASE"/config/settings/__init__.py
touch "$BASE"/config/settings/base.py
touch "$BASE"/config/settings/development.py
touch "$BASE"/config/settings/production.py
touch "$BASE"/config/urls.py
touch "$BASE"/config/wsgi.py
touch "$BASE"/config/asgi.py

# Core app
mkdir -p "$BASE"/core/migrations
touch "$BASE"/core/__init__.py
touch "$BASE"/core/models.py
touch "$BASE"/core/serializers.py
touch "$BASE"/core/api.py
touch "$BASE"/core/urls.py
touch "$BASE"/core/permissions.py
touch "$BASE"/core/pagination.py
touch "$BASE"/core/wagtail_hooks.py
touch "$BASE"/core/migrations/__init__.py

# Pages app
mkdir -p "$BASE"/pages/migrations
touch "$BASE"/pages/__init__.py
touch "$BASE"/pages/models.py
touch "$BASE"/pages/serializers.py
touch "$BASE"/pages/views.py
touch "$BASE"/pages/urls.py
touch "$BASE"/pages/wagtail_hooks.py
touch "$BASE"/pages/migrations/__init__.py

# Blog app
mkdir -p "$BASE"/blog/migrations
touch "$BASE"/blog/__init__.py
touch "$BASE"/blog/models.py
touch "$BASE"/blog/serializers.py
touch "$BASE"/blog/views.py
touch "$BASE"/blog/urls.py
touch "$BASE"/blog/wagtail_hooks.py
touch "$BASE"/blog/migrations/__init__.py

# Categories app
mkdir -p "$BASE"/categories/migrations
touch "$BASE"/categories/__init__.py
touch "$BASE"/categories/models.py
touch "$BASE"/categories/serializers.py
touch "$BASE"/categories/views.py
touch "$BASE"/categories/urls.py
touch "$BASE"/categories/wagtail_hooks.py
touch "$BASE"/categories/migrations/__init__.py

# Tags app
mkdir -p "$BASE"/tags/migrations
touch "$BASE"/tags/__init__.py
touch "$BASE"/tags/models.py
touch "$BASE"/tags/serializers.py
touch "$BASE"/tags/views.py
touch "$BASE"/tags/urls.py
touch "$BASE"/tags/wagtail_hooks.py
touch "$BASE"/tags/migrations/__init__.py

# Authors app
mkdir -p "$BASE"/authors/migrations
touch "$BASE"/authors/__init__.py
touch "$BASE"/authors/models.py
touch "$BASE"/authors/serializers.py
touch "$BASE"/authors/views.py
touch "$BASE"/authors/urls.py
touch "$BASE"/authors/wagtail_hooks.py
touch "$BASE"/authors/migrations/__init__.py

# Search app (no models.py, no migrations)
mkdir -p "$BASE"/search
touch "$BASE"/search/__init__.py
touch "$BASE"/search/views.py
touch "$BASE"/search/serializers.py
touch "$BASE"/search/urls.py

echo "✅ Backend directory hierarchy created under '$BASE'."