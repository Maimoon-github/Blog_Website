"""
Blog models.

BlogIndexPage  →  /blog
BlogPage       →  /blog/[slug]
"""
from django.db import models
from django.utils import timezone
from modelcluster.contrib.taggit import ClusterTaggableManager
from modelcluster.fields import ParentalKey, ParentalManyToManyField
from taggit.models import TaggedItemBase
from wagtail.admin.panels import (
    FieldPanel,
    FieldRowPanel,
    InlinePanel,
    MultiFieldPanel,
    ObjectList,
    TabbedInterface,
)
from wagtail.fields import RichTextField, StreamField
from wagtail.models import Page
from wagtail.search import index
from wagtail.snippets.models import register_snippet

from apps.common.blocks import BLOG_BODY_BLOCKS
from apps.seo.models import SEOPageMixin


# ─────────────────────────────────────────────────────────────────────────────
# Taggit through-model
# ─────────────────────────────────────────────────────────────────────────────

class BlogPageTag(TaggedItemBase):
    content_object = ParentalKey(
        "blog.BlogPage",
        related_name="tagged_items",
        on_delete=models.CASCADE,
    )


# ─────────────────────────────────────────────────────────────────────────────
# Blog Index Page
# ─────────────────────────────────────────────────────────────────────────────

class BlogIndexPage(Page):
    """
    Root blog listing page.
    Frontend route: /blog
    """

    intro = RichTextField(blank=True)
    posts_per_page = models.PositiveIntegerField(default=10)

    content_panels = Page.content_panels + [
        FieldPanel("intro"),
        FieldPanel("posts_per_page"),
    ]

    subpage_types = ["blog.BlogPage"]
    parent_page_types = ["wagtailcore.Page", "pages.HomePage"]

    class Meta:
        verbose_name = "Blog Index Page"

    def get_posts(self, **filters):
        posts = BlogPage.objects.live().descendant_of(self).order_by("-published_date")
        if filters.get("category_slug"):
            posts = posts.filter(categories__slug=filters["category_slug"])
        if filters.get("tag_name"):
            posts = posts.filter(tags__name=filters["tag_name"])
        if filters.get("author_slug"):
            posts = posts.filter(author__slug=filters["author_slug"])
        return posts


# ─────────────────────────────────────────────────────────────────────────────
# Blog Page
# ─────────────────────────────────────────────────────────────────────────────

class BlogPage(SEOPageMixin, Page):
    """
    Individual blog post.
    Frontend route: /blog/[slug]
    """

    # ── Content ───────────────────────────────────────────────────────────────
    excerpt = models.TextField(
        blank=True,
        max_length=500,
        help_text="Short summary shown in listing cards (max 500 chars).",
    )
    body = StreamField(
        BLOG_BODY_BLOCKS,
        use_json_field=True,
        blank=True,
    )

    # ── Images ────────────────────────────────────────────────────────────────
    cover_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        verbose_name="Cover image",
        help_text="Card thumbnail for listing pages.",
    )
    featured_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        verbose_name="Featured image",
        help_text="Hero image shown at the top of the post.",
    )

    # ── Dates ─────────────────────────────────────────────────────────────────
    published_date = models.DateTimeField(
        default=timezone.now,
        db_index=True,
        help_text="Publication date (controls sort order and display).",
    )
    updated_date = models.DateTimeField(
        null=True,
        blank=True,
        help_text="Last significant update (leave blank to hide).",
    )

    # ── Metadata ──────────────────────────────────────────────────────────────
    reading_time = models.PositiveIntegerField(
        default=1,
        help_text="Estimated reading time in minutes (auto-calculated on save).",
    )
    is_featured = models.BooleanField(default=False, db_index=True)

    # ── Relationships ─────────────────────────────────────────────────────────
    author = models.ForeignKey(
        "authors.AuthorPage",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="blog_posts",
    )
    categories = ParentalManyToManyField(
        "taxonomy.Category",
        blank=True,
        related_name="blog_posts",
    )
    tags = ClusterTaggableManager(through=BlogPageTag, blank=True)

    # ── Search index ──────────────────────────────────────────────────────────
    search_fields = Page.search_fields + [
        index.SearchField("excerpt", boost=2),
        index.SearchField("body"),
        index.FilterField("published_date"),
        index.FilterField("slug"),
        index.RelatedFields("author", [index.SearchField("title")]),
        index.RelatedFields("categories", [index.SearchField("name"), index.FilterField("slug")]),
    ]

    # ── Admin panels ──────────────────────────────────────────────────────────
    content_panels = Page.content_panels + [
        MultiFieldPanel(
            [
                FieldPanel("excerpt"),
                FieldPanel("body"),
            ],
            heading="Content",
        ),
        MultiFieldPanel(
            [
                FieldRowPanel([FieldPanel("cover_image"), FieldPanel("featured_image")]),
            ],
            heading="Images",
        ),
        MultiFieldPanel(
            [
                FieldRowPanel([FieldPanel("published_date"), FieldPanel("updated_date")]),
                FieldPanel("reading_time"),
                FieldPanel("is_featured"),
            ],
            heading="Publishing",
        ),
        MultiFieldPanel(
            [
                FieldPanel("author"),
                FieldPanel("categories"),
                FieldPanel("tags"),
            ],
            heading="Taxonomy",
        ),
    ]

    promote_panels = Page.promote_panels + SEOPageMixin.seo_panels

    edit_handler = TabbedInterface(
        [
            ObjectList(content_panels, heading="Content"),
            ObjectList(promote_panels, heading="SEO & Promotion"),
        ]
    )

    parent_page_types = ["blog.BlogIndexPage"]
    subpage_types = []

    class Meta:
        verbose_name = "Blog Post"
        verbose_name_plural = "Blog Posts"

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        self._auto_reading_time()
        super().save(*args, **kwargs)

    def _auto_reading_time(self):
        """Auto-calculate reading time from body text."""
        from apps.common.utils import calculate_reading_time, extract_text_from_streamfield
        try:
            text = extract_text_from_streamfield(self.body.stream_data)
            self.reading_time = calculate_reading_time(text)
        except Exception:
            self.reading_time = max(1, self.reading_time)

    # ── Properties ────────────────────────────────────────────────────────────
    @property
    def cover_image_url(self):
        from apps.common.utils import get_image_rendition_url
        return get_image_rendition_url(self.cover_image, "fill-800x450")

    @property
    def cover_image_url_small(self):
        from apps.common.utils import get_image_rendition_url
        return get_image_rendition_url(self.cover_image, "fill-400x225")

    @property
    def featured_image_url(self):
        from apps.common.utils import get_image_rendition_url
        return get_image_rendition_url(self.featured_image, "width-1200")

    @property
    def tag_names(self):
        return list(self.tags.values_list("name", flat=True))

    @property
    def og_image_url(self):
        """OG image: explicit og_image > featured_image > cover_image."""
        for img in [self.og_image, self.featured_image, self.cover_image]:
            if img:
                try:
                    return img.get_rendition("fill-1200x630").url
                except Exception:
                    pass
        return None
