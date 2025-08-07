from django.urls import path

from . import views

urlpatterns = [
    path('me/', views.userInfo, name='user-info'),
]