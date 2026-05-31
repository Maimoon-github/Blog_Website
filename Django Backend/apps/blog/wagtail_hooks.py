"""
Wagtail hooks for the blog app.
"""
from wagtail import hooks
from wagtail.snippets.views.snippets import SnippetViewSet


@hooks.register("after_publish_page")
def after_publish_blog_page(request, page):
    """Log when a blog post is published."""
    from apps.blog.models import BlogPage
    import logging
    if isinstance(page, BlogPage):
        logging.getLogger(__name__).info("BlogPage published: %s (slug=%s)", page.title, page.slug)
