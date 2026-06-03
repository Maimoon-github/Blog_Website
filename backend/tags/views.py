from rest_framework import generics
from .models import Tag
from .serializers import TagSerializer

class TagListAPIView(generics.ListAPIView):
    queryset = Tag.objects.all().order_by("name")
    serializer_class = TagSerializer
