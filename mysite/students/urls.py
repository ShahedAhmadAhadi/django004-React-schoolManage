from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', initial),
    path('search', search),
    path('add/', add_student, name='add'),
    path('delete/<int:roll_no>/', delete_student, name='delete'),
    path('update/<int:roll_no>/', update_student, name='update'),
    path('<int:roll_no>/', detail, name="detail"),
    # static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT),
]

# urlpatterns = [
#     # ... the rest of your URLconf goes here ...
# ] + 
