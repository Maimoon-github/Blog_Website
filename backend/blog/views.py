from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import Http404

from .models import BlogPage
from .serializers import (
    BlogPageListSerializer,
    BlogPageDetailSerializer,
    BlogIndexPageSerializer,
)


class BlogPagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = "page_size"
    max_page_size = 100


class BlogPostListAPIView(generics.ListAPIView):
    serializer_class = BlogPageListSerializer
    pagination_class = BlogPagination

    def get_queryset(self):
        queryset = BlogPage.objects.live().order_by("-first_published_at")

        # Filtering
        category_slug = self.request.query_params.get("category")
        if category_slug:
            queryset = queryset.filter(categories__slug=category_slug)

        tag_slug = self.request.query_params.get("tag")
        if tag_slug:
            queryset = queryset.filter(tags__slug=tag_slug)

        author_id = self.request.query_params.get("author")
        if author_id:
            queryset = queryset.filter(author_id=author_id)

        return queryset

    def get(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            paginated = BlogIndexPageSerializer({
                "count": self.paginator.page.paginator.count,
                "next": self.paginator.get_next_link(),
                "previous": self.paginator.get_previous_link(),
                "results": serializer.data,
            })
            return Response(paginated.data)

        # If pagination is off (unlikely), return all
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class BlogPostDetailAPIView(APIView):
    def get(self, request, slug, format=None):
        try:
            post = BlogPage.objects.live().get(slug=slug)
        except BlogPage.DoesNotExist:
            raise Http404("Blog post not found.")
        serializer = BlogPageDetailSerializer(post, context={"request": request})
        return Response(serializer.data)


class BlogStaticParamsAPIView(APIView):
    def get(self, request, format=None):
        slugs = BlogPage.objects.live().values_list("slug", flat=True)
        return Response(list(slugs))