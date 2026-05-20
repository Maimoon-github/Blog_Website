from django.db import models
from django.core.cache import cache
from wagtail.admin.panels import FieldPanel, MultiFieldPanel, FieldRowPanel
from wagtail.fields import RichTextField, StreamField
from wagtail.models import Page
from wagtail.search import index

from core.models import AbstractBasePage  # assumes shared base with SEO, etc.
from images.models import CustomImage     # assumes custom image model
from authors.models import Author         # assumes authors.Author snippet
from categories.models import Category    # assumes categories.Category snippet
from tags.models import Tag               # assumes tags.Tag snippet
from .blocks import CodeBlock, QuoteBlock


# ----------------------------------------------------------------------
# Through models (custom intermediate for categories/tags)
# ----------------------------------------------------------------------
class BlogPageCategory(models.Model):
    blog_page = models.ForeignKey("BlogPage", on_delete=models.CASCADE, related_name="blog_page_categories")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="+")
    sort_order = models.PositiveIntegerField(default=0, blank=False, null=False)

    class Meta:
        ordering = ["sort_order"]
        unique_together = ("blog_page", "category")


class BlogPageTag(models.Model):
    blog_page = models.ForeignKey("BlogPage", on_delete=models.CASCADE, related_name="blog_page_tags")
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE, related_name="+")
    sort_order = models.PositiveIntegerField(default=0, blank=False, null=False)

    class Meta:
        ordering = ["sort_order"]
        unique_together = ("blog_page", "tag")


# ----------------------------------------------------------------------
# BlogIndexPage
# ----------------------------------------------------------------------
class BlogIndexPage(AbstractBasePage):
    intro = RichTextField(blank=True)

    content_panels = AbstractBasePage.content_panels + [
        FieldPanel("intro"),
    ]

    parent_page_types = ["pages.HomePage"]
    subpage_types = ["blog.BlogPage"]

    template = "blog/blog_index_page.html"

    # Traditional Wagtail server-side rendering (unused in headless setup)
    def get_context(self, request, *args, **kwargs):
        context = super().get_context(request, *args, **kwargs)
        posts = BlogPage.objects.child_of(self).live().order_by("-first_published_at")
        # Apply pagination if desired (example using Django's paginator)
        from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
        page = request.GET.get("page", 1)
        paginator = Paginator(posts, 10)
        try:
            blog_posts = paginator.page(page)
        except PageNotAnInteger:
            blog_posts = paginator.page(1)
        except EmptyPage:
            blog_posts = paginator.page(paginator.num_pages)
        context["blog_posts"] = blog_posts
        return context

    class Meta:
        verbose_name = "Blog Index"


# ----------------------------------------------------------------------
# BlogPage
# ----------------------------------------------------------------------
class BlogPage(AbstractBasePage):
    intro = models.CharField(max_length=300, blank=True)
    body = StreamField(
        [
            ("heading", blocks.CharBlock(form_classname="title")),
            ("paragraph", blocks.RichTextBlock()),
            ("image", ImageChooserBlock()),
            ("code", CodeBlock()),
            ("quote", QuoteBlock()),
            ("embed", EmbedBlock()),
        ],
        use_json_field=True,
        blank=True,
    )
    hero_image = models.ForeignKey(
        CustomImage,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+"
    )
    author = models.ForeignKey(
        Author,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="blog_posts"
    )
    categories = models.ManyToManyField(
        Category,
        through=BlogPageCategory,
        blank=True,
        related_name="blog_pages"
    )
    tags = models.ManyToManyField(
        Tag,
        through=BlogPageTag,
        blank=True,
        related_name="blog_pages"
    )
    reading_time_minutes = models.PositiveIntegerField(
        default=0,
        help_text="Auto‑computed on save (based on body text)"
    )

    # Panels for the editor interface
    content_panels = AbstractBasePage.content_panels + [
        FieldPanel("intro"),
        FieldPanel("body"),
        FieldPanel("hero_image"),
        FieldPanel("author"),
        MultiFieldPanel(
            [
                FieldRowPanel([
                    FieldPanel("categories", widget=forms.CheckboxSelectMultiple),
                    FieldPanel("tags", widget=forms.CheckboxSelectMultiple),
                ])
            ],
            heading="Taxonomies",
        ),
        FieldPanel("reading_time_minutes", read_only=True),
    ]

    parent_page_types = ["blog.BlogIndexPage"]
    subpage_types = []  # posts are leaf nodes

    template = "blog/blog_page.html"

    # Wagtail search configuration
    search_fields = AbstractBasePage.search_fields + [
        index.SearchField("intro"),
        index.SearchField("body"),
        index.RelatedFields("author", [
            index.SearchField("name"),
        ]),
    ]

    # Wagtail API fields (used as a hint for DRF serializers)
    api_fields = [
        "intro",
        "body",
        "hero_image_url",
        "author",
        "categories",
        "tags",
    ]

    @property
    def hero_image_url(self):
        if self.hero_image:
            # Provide a suitable rendition for the frontend
            return self.hero_image.get_rendition("fill-800x450").url
        return None

    def _calculate_reading_time(self):
        """Estimate reading time based on total word count in body stream."""
        word_count = 0
        for block in self.body:  # StreamField iteration yields (block_type, value)
            value = block.value
            if block.block_type in ("heading", "paragraph", "quote"):
                if hasattr(value, "source"):  # RichTextBlock returns a RichText object
                    text = value.source
                else:
                    text = str(value)
                word_count += len(text.split())
            elif block.block_type == "code":
                word_count += len(value.get("code", "").split())
        # Average reading speed: 200 words per minute
        minutes = max(1, round(word_count / 200))
        return minutes

    def save(self, *args, **kwargs):
        self.reading_time_minutes = self._calculate_reading_time()
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = "Blog Post"