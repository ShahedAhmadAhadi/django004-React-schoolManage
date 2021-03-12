from django.urls import path
from .views import *
from django.contrib.auth import views as authentication_views

urlpatterns = [
    path('signup/', signup, name="signup"),
    path('logout/', logout, name="logout"),
    path('login/', authentication_views.LoginView.as_view(template_name='users/login.html'), name="login")
]