from django.urls import path
from .views import login, signup

app_name = 'login'

urlpatterns = [
    # path('login/', login, name="login"),
    path('', signup, name="signup"),
]