"""
Custom DRF pagination classes.
"""
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class StandardResultsPagination(PageNumberPagination):
    """
    Default pagination: 10 items/page, configurable via ?page_size=N (max 100).
    Response shape compatible with Next.js getStaticProps / generateStaticParams.
    """

    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 100
    page_query_param = "page"

    def get_paginated_response(self, data):
        return Response(
            {
                "pagination": {
                    "count": self.page.paginator.count,
                    "total_pages": self.page.paginator.num_pages,
                    "current_page": self.page.number,
                    "page_size": self.get_page_size(self.request),
                    "next": self.get_next_link(),
                    "previous": self.get_previous_link(),
                    "has_next": self.page.has_next(),
                    "has_previous": self.page.has_previous(),
                },
                "results": data,
            }
        )

    def get_paginated_response_schema(self, schema):
        return {
            "type": "object",
            "properties": {
                "pagination": {
                    "type": "object",
                    "properties": {
                        "count": {"type": "integer"},
                        "total_pages": {"type": "integer"},
                        "current_page": {"type": "integer"},
                        "page_size": {"type": "integer"},
                        "next": {"type": "string", "nullable": True},
                        "previous": {"type": "string", "nullable": True},
                        "has_next": {"type": "boolean"},
                        "has_previous": {"type": "boolean"},
                    },
                },
                "results": schema,
            },
        }


class LargeResultsPagination(PageNumberPagination):
    """For taxonomy (categories, tags) – larger default page."""

    page_size = 50
    page_size_query_param = "page_size"
    max_page_size = 200
