from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator
from django.template.response import TemplateResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from wagtail.models import Page
from wagtail.search.models import Query


def search(request):
    search_query = request.GET.get("query", None)
    page = request.GET.get("page", 1)

    # Search
    if search_query:
        search_results = Page.objects.live().search(search_query)
        query = Query.get(search_query)

        # Record query
        query.add_hit()
    else:
        search_results = Page.objects.none()

    # Pagination
    paginator = Paginator(search_results, 10)
    try:
        search_results = paginator.page(page)
    except PageNotAnInteger:
        search_results = paginator.page(1)
    except EmptyPage:
        search_results = paginator.page(paginator.num_pages)

    return TemplateResponse(
        request,
        "search/search.html",
        {
            "search_query": search_query,
            "search_results": search_results,
        },
    )


@api_view(["GET"])
def api_search(request):
    """
    DRF endpoint for the Next.js frontend search.
    Returns a JSON list of matching live pages.
    GET /api/search/?q=<query>
    """
    from blog.models import BlogPage
    from blog.serializers import BlogPageListSerializer

    q = request.GET.get("q", "").strip()
    if not q:
        return Response([])

    results = BlogPage.objects.live().search(q)
    query_obj = Query.get(q)
    query_obj.add_hit()

    serializer = BlogPageListSerializer(results, many=True, context={"request": request})
    return Response(serializer.data)
