"""
Production settings – extends base.
"""
from decouple import config

from .base import *  # noqa: F401, F403

DEBUG = False

# ─── Security ────────────────────────────────────────────────────────────────
SECURE_SSL_REDIRECT = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_BROWSER_XSS_FILTER = True
X_FRAME_OPTIONS = "DENY"
SECURE_CONTENT_TYPE_NOSNIFF = True

# ─── Wagtail search – PostgreSQL backend ──────────────────────────────────────
WAGTAILSEARCH_BACKENDS = {
    "default": {
        "BACKEND": "wagtail.search.backends.database",
        "SEARCH_CONFIG": "english",
        "AUTO_UPDATE": True,
        "ATOMIC_REBUILD": True,
    }
}

# ─── S3 / R2 Media Storage ────────────────────────────────────────────────────
_USE_S3 = config("AWS_ACCESS_KEY_ID", default=None)
if _USE_S3:
    try:
        # Ensure django-storages is available before using it
        import storages  # noqa: F401
        DEFAULT_FILE_STORAGE = "storages.backends.s3boto3.S3Boto3Storage"
        AWS_ACCESS_KEY_ID = config("AWS_ACCESS_KEY_ID")
        AWS_SECRET_ACCESS_KEY = config("AWS_SECRET_ACCESS_KEY")
        AWS_STORAGE_BUCKET_NAME = config("AWS_STORAGE_BUCKET_NAME")
        AWS_S3_ENDPOINT_URL = config("AWS_S3_ENDPOINT_URL", default=None)
        AWS_DEFAULT_ACL = "public-read"
        AWS_S3_FILE_OVERWRITE = False
        MEDIA_URL = f"https://{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/"
    except ImportError:
        # If django-storages is not installed, fall back to default filesystem storage
        pass

# ─── Cache – Redis ────────────────────────────────────────────────────────────
CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": config("CACHE_URL", default="redis://localhost:6379/1"),
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
            "CONNECTION_POOL_KWARGS": {"max_connections": 50},
        },
        "KEY_PREFIX": "blog_prod",
        "TIMEOUT": 60 * 30,  # 30 minutes
    }
}

SESSION_ENGINE = "django.contrib.sessions.backends.cache"
SESSION_CACHE_ALIAS = "default"

# ─── Sentry ───────────────────────────────────────────────────────────────────
_SENTRY_DSN = config("SENTRY_DSN", default=None)
if _SENTRY_DSN:
    import sentry_sdk
    from sentry_sdk.integrations.celery import CeleryIntegration
    from sentry_sdk.integrations.django import DjangoIntegration
    from sentry_sdk.integrations.redis import RedisIntegration

    sentry_sdk.init(
        dsn=_SENTRY_DSN,
        integrations=[
            DjangoIntegration(transaction_style="url"),
            CeleryIntegration(),
            RedisIntegration(),
        ],
        traces_sample_rate=0.1,
        send_default_pii=False,
    )

# ─── Logging ──────────────────────────────────────────────────────────────────
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "json": {
            "()": "django_structlog.middlewares.requests.RequestMiddleware",
        },
        "verbose": {
            "format": "{levelname} {asctime} {module} {process:d} {thread:d} {message}",
            "style": "{",
        },
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "verbose",
        },
    },
    "root": {"handlers": ["console"], "level": "WARNING"},
    "loggers": {
        "django": {"handlers": ["console"], "level": "WARNING", "propagate": False},
        "apps": {"handlers": ["console"], "level": "WARNING", "propagate": False},
    },
}