from django.urls import path
from .views import login, signup
from django.contrib.auth import views as authentication_views

urlpatterns = [
    # path('login/', login, name="login"),
    path('signup/', signup, name="signup"),
    path('login/', login, name="login"),
    path('logout/', authentication_views.LogoutView.as_view(template_name='users/login.html'), name="logout")
]