from django.shortcuts import render
from rest_framework import mixins, viewsets, status
from .models import Instructor, Student
from .serializers import instructorSerializer
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

# Create your views here.

class CreateDestroyUpdateGetInstructorViewSet(mixins.CreateModelMixin,
                                           mixins.DestroyModelMixin,
                                           mixins.UpdateModelMixin,
                                           mixins.RetrieveModelMixin,
                                           viewsets.GenericViewSet):
    queryset = Instructor.objects.all()
    serializer_class = instructorSerializer
    # def retrieve(self, request, pk=None):
    #     instructor = get_object_or_404(self.queryset, pk=pk)
    #     serializer = instructorSerializer(instructor)
    #     return Response(serializer.data, status=status.HTTP_200_OK)
