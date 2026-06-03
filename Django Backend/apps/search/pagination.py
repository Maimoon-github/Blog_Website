# apps/api/pagination.py
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class StandardResultsPagination(PageNumberPagination):
    """
    Provides fallback enforcement parameters for full-text search view streams.
    Allows clients to override page sizing safely up to a fixed maximum limit.
    """
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 50

    def get_paginated_response(self, data):
        return Response({
            'pagination': {
                'count': self.page.paginator.count,
                'total_pages': self.page.paginator.num_pages,
                'current_page': self.page.number,
                'page_size': self.get_page_size(self.request),
                'has_next': self.get_next_link() is not None,
                'has_previous': self.get_previous_link() is not None,
            },
            'results': data
        })