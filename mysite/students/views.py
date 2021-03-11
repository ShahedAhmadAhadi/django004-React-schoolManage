from django.shortcuts import render
from rest_framework import generics
from django.core import serializers
from .serializers import StudentSerializer
from django.http import JsonResponse, HttpResponse
from .models import Student
import json
# Create your views here.

class Initial(generics.CreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

def search(request):
    form = Student.objects.all()
    a = serializers.serialize('json', form)
    return HttpResponse(a)
