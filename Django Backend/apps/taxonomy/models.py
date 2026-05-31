"""
Taxonomy models: Category and Tag.

Both are Wagtail snippets so editors manage them from the CMS.
The frontend exposes /categories, /categories/[slug], /tags, /tags/[slug].
"""
from django.db import models
from django.utils.text import slugify
from wagtail.admin.panels import FieldPanel
from wagtail.search import index
from wagtail.snippets.models import register_snippet


@register_snippet
class Category(models.Model):
    """
    Blog post category. Snippet model.
    Frontend routes: /categories  /categories/[slug]
    """

    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True, db_index=True)
    description = models.TextField(blank=True)
    cover_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )
    color = models.CharField(
        max_length=7,
        blank=True,
        help_text="Hex color, e.g. #FF5733",
    )
    order = models.PositiveIntegerField(default=0, db_index=True)

    # SEO
    seo_title = models.CharField(max_length=255, blank=True)
    seo_description = models.TextField(blank=True)

    panels = [
        FieldPanel("name"),
        FieldPanel("slug"),
        FieldPanel("description"),
        FieldPanel("cover_image"),
        FieldPanel("color"),
        FieldPanel("order"),
        FieldPanel("seo_title"),
        FieldPanel("seo_description"),
    ]

    search_fields = [
        index.SearchField("name"),
        index.SearchField("description"),
        index.FilterField("slug"),
    ]

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"
        ordering = ["order", "name"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    @property
    def post_count(self):
        return self.blog_posts.filter(live=True).count()

    @property
    def cover_image_url(self):
        if self.cover_image:
            try:
                return self.cover_image.get_rendition("fill-800x400").url
            except Exception:
                return None
        return None


@register_snippet
class Tag(models.Model):
    """
    Blog post tag. Snippet model.
    Frontend routes: /tags  /tags/[slug]

    Note: We also use `taggit` via `ClusterTaggableManager` on BlogPage.
    This model provides first-class tag pages with descriptions.
    """

    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True, db_index=True)
    description = models.TextField(blank=True)

    # SEO
    seo_title = models.CharField(max_length=255, blank=True)
    seo_description = models.TextField(blank=True)

    panels = [
        FieldPanel("name"),
        FieldPanel("slug"),
        FieldPanel("description"),
        FieldPanel("seo_title"),
        FieldPanel("seo_description"),
    ]

    class Meta:
        verbose_name = "Tag"
        verbose_name_plural = "Tags"
        ordering = ["name"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    @property
    def post_count(self):
        # Count live blog posts tagged with this tag's name via taggit
        from apps.blog.models import BlogPage
        return BlogPage.objects.live().filter(tags__name=self.name).count()
