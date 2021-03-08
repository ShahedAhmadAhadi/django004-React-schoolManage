from django.urls import path
from .views import Initial

urlpatterns = [
    path("", Initial.as_view())
]
