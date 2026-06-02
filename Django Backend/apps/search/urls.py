# apps/search/urls.py
from django.urls import path

from .views import SearchSuggestionsView, SearchView

urlpatterns = [
    path("", SearchView.as_view(), name="search"),
    path("suggest/", SearchSuggestionsView.as_view(), name="search-suggest"),
]