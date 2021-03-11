from django.urls import path
from .views import Initial, search

urlpatterns = [
    path("", Initial.as_view()),
    path('search', search)
]
