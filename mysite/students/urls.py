from django.urls import path
from .views import *

urlpatterns = [
    path('', initial),
    path('search', search),
    path('add/', add_student, name='add'),
    path('delete/<int:roll_no>/', delete_student, name='delete'),
    path('update/<int:roll_no>/', update_student, name='update'),
    path('<int:roll_no>/', detail, name="detail"),
]
