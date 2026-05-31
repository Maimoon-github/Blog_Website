"""
Django-filter FilterSet classes for API viewsets.
"""
import django_filters

from apps.blog.models import BlogPage
from apps.taxonomy.models import Category, Tag


class BlogPostFilter(django_filters.FilterSet):
    category = django_filters.CharFilter(field_name="categories__slug", lookup_expr="exact")
    tag = django_filters.CharFilter(field_name="tags__name", lookup_expr="iexact")
    author = django_filters.CharFilter(field_name="author__slug", lookup_expr="exact")
    featured = django_filters.BooleanFilter(field_name="is_featured")
    published_before = django_filters.DateTimeFilter(field_name="published_date", lookup_expr="lte")
    published_after = django_filters.DateTimeFilter(field_name="published_date", lookup_expr="gte")

    class Meta:
        model = BlogPage
        fields = ["category", "tag", "author", "featured", "published_before", "published_after"]


class CategoryFilter(django_filters.FilterSet):
    class Meta:
        model = Category
        fields = ["slug"]


class TagFilter(django_filters.FilterSet):
    class Meta:
        model = Tag
        fields = ["slug"]
