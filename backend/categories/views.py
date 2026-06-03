from rest_framework import generics
from .models import Category
from .serializers import CategorySerializer

class CategoryListAPIView(generics.ListAPIView):
    queryset = Category.objects.all().order_by("name")
    serializer_class = CategorySerializer
