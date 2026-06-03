from rest_framework import generics
from .models import Author
from .serializers import AuthorSerializer

class AuthorListAPIView(generics.ListAPIView):
    queryset = Author.objects.all().order_by("name")
    serializer_class = AuthorSerializer

class AuthorDetailAPIView(generics.RetrieveAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
