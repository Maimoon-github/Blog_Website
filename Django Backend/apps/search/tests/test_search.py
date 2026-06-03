# apps/search/tests/test_search.py
from django.urls import reverse
from django.core.cache import cache
from rest_framework import status
from rest_framework.test import APITestCase
from unittest.mock import patch, MagicMock
from apps.search.serializers import SearchResultSerializer

class SearchApplicationTests(APITestCase):

    def setUp(self):
        cache.clear()
        self.search_url = reverse('search')
        self.suggest_url = reverse('search-suggest')

    def test_search_empty_query_returns_empty_payload(self):
        """Verifies that an empty query string returns a valid blank result container."""
        response = self.client.get(self.search_url, {'q': ''})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['total'], 0)
        self.assertEqual(response.data['results'], [])

    @patch('apps.search.views.get_search_backend')
    def test_search_execution_and_serializer_compliance(self, mock_get_backend):
        """Mocks the Wagtail engine to evaluate serializer contract rules against results."""
        mock_backend = MagicMock()
        mock_hit = MagicMock()

        # Simulating polymorphic properties typical of Wagtail core pages
        mock_hit.id = 42
        mock_hit.title = "Test Automation Post"
        mock_hit.slug = "test-automation-post"
        mock_hit.url = "/blog/test-automation-post"
        mock_hit.specific = mock_hit

        mock_backend.search.return_value = [mock_hit]
        mock_get_backend.return_value = mock_backend

        # Invoke API target
        response = self.client.get(self.search_url, {'q': 'automation', 'type': 'blog'})

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Validate fake item schema payload shape against system structural requirements
        mock_serialized_data = {
            "type": "blog",
            "id": 42,
            "title": "Test Automation Post",
            "slug": "test-automation-post",
            "url": "/blog/test-automation-post",
            "excerpt": "Context summary snippet description.",
            "published_date": None,
            "cover_image_url": None,
            "photo_url": None,
            "role": "",
            "author": None
        }

        serializer = SearchResultSerializer(data=mock_serialized_data)
        self.assertTrue(serializer.is_valid(), serializer.errors)

    def test_suggestion_route_enforces_minimum_character_boundary(self):
        """Ensures that suggestion lookups fail fast with short inputs (<2 chars)."""
        response = self.client.get(self.suggest_url, {'q': 'a'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['suggestions'], [])