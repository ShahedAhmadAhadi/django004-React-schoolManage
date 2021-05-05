from django.urls import path
from .views import add_student, delete_student, update_student, home, search, add_information_verification
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('page=<int:page>/', home),
    path('search/<str:name>/', search),
    path('add/', add_student, name='add'),
    # path('add/verify/', add_information_verification),
    path('delete/', delete_student, name='delete'),
    path('update/', update_student, name='update'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
