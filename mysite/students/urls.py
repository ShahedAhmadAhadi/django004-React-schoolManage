from django.urls import path
from .views import initial

urlpatterns = [
    path("", initial, name="initial")
]
