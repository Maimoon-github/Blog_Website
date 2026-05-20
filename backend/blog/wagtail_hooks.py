import requests
from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from wagtail import hooks
from wagtail.admin.rich_text.editors.draftail import features as draftail_features
from wagtail.admin.rich_text.converters.html_to_contentstate import BlockElementHandler
from wagtail.admin.menu import MenuItem
from wagtail.models import Page

from .models import BlogIndexPage, BlogPage


# ----------------------------------------------------------------------
# 1. ISR on‑demand revalidation after publishing a blog post
# ----------------------------------------------------------------------
@hooks.register("after_publish_page")
def revalidate_nextjs_blog_pages(request, page):
    if not isinstance(page, BlogPage):
        return

    revalidate_url = getattr(settings, "NEXTJS_REVALIDATION_URL", None)
    revalidate_secret = getattr(settings, "NEXTJS_REVALIDATION_SECRET", None)
    if not revalidate_url or not revalidate_secret:
        return

    # Revalidate the blog list page and the post detail page
    paths_to_revalidate = ["/blog", f"/blog/{page.slug}"]
    for path in paths_to_revalidate:
        try:
            requests.post(
                revalidate_url,
                json={"secret": revalidate_secret, "path": path},
                timeout=5,
            )
        except requests.RequestException:
            pass  # log appropriately in production


# ----------------------------------------------------------------------
# 2. Custom rich text features (example: enhanced blockquote with class)
# ----------------------------------------------------------------------
@hooks.register("register_rich_text_features")
def register_blockquote_feature(features):
    feature_name = "blockquote"
    type_ = "BLOCKQUOTE"
    tag = "blockquote"

    control = {
        "type": type_,
        "label": "❝",
        "description": "Blockquote",
        "element": "blockquote",
    }

    features.register_editor_plugin(
        "draftail", feature_name, draftail_features.BlockFeature(control)
    )

    features.register_converter_rule("contentstate", feature_name, {
        "from_database_format": {tag: BlockElementHandler(type_)},
        "to_database_format": {"block_map": {type_: tag}},
    })

    # Add optional CSS class control
    features.default_features.append(feature_name)


# ----------------------------------------------------------------------
# 3. Explorer page filtering – show only blog pages inside the blog section
# ----------------------------------------------------------------------
@hooks.register("construct_explorer_page_queryset")
def show_only_blog_pages(parent_page, pages, request):
    # When inside the blog index, restrict to blog-related pages
    if isinstance(parent_page.specific, BlogIndexPage):
        blog_ct = ContentType.objects.get_for_models(BlogIndexPage, BlogPage).values()
        pages = pages.filter(content_type__in=blog_ct)
    return pages