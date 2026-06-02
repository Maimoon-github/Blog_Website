"""
Development settings – extends base.
"""
from decouple import config

from .base import *  # noqa: F401, F403

DEBUG = True  # ← Fixed: development should have DEBUG=True

# ─── Security ────────────────────────────────────────────────────────────────
# Disable security settings for local development
SECURE_SSL_REDIRECT = False
SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SECURE = False
SECURE_HSTS_SECONDS = 0
SECURE_HSTS_INCLUDE_SUBDOMAINS = False
SECURE_HSTS_PRELOAD = False
X_FRAME_OPTIONS = "SAMEORIGIN"
SECURE_CONTENT_TYPE_NOSNIFF = False

# Allow all hosts in development
ALLOWED_HOSTS = ["*"]

# CORS – allow all origins in dev
CORS_ALLOW_ALL_ORIGINS = True

# Use simpler console email backend
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

# ─── Debug Toolbar ────────────────────────────────────────────────────────────
INSTALLED_APPS += ["debug_toolbar", "django_extensions"]  # noqa: F405

MIDDLEWARE = [
    "debug_toolbar.middleware.DebugToolbarMiddleware",
] + MIDDLEWARE  # noqa: F405

INTERNAL_IPS = ["127.0.0.1", "::1"]

DEBUG_TOOLBAR_CONFIG = {
    "SHOW_TOOLBAR_CALLBACK": lambda request: DEBUG,
}

# ─── Logging ──────────────────────────────────────────────────────────────────
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "{levelname} {asctime} {module} {message}",
            "style": "{",
        },
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "verbose",
        },
    },
    "root": {
        "handlers": ["console"],
        "level": "DEBUG",
    },
    "loggers": {
        "django": {"handlers": ["console"], "level": "INFO", "propagate": False},
        "wagtail": {"handlers": ["console"], "level": "DEBUG", "propagate": False},
        "apps": {"handlers": ["console"], "level": "DEBUG", "propagate": False},
    },
}

# ─── Wagtail search (faster in dev) ──────────────────────────────────────────
WAGTAILSEARCH_BACKENDS = {
    "default": {
        "BACKEND": "wagtail.search.backends.database",
    }
}

# ─── Cache – use local memory in dev (no Redis required) ─────────────────────
CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
    }
}