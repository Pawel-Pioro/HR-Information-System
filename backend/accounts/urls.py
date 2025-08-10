from django.urls import path

from . import views

urlpatterns = [
    path('employees/', views.manageEmployees, name="manage_employees"),
    path('employees/<int:id>/', views.manageOneEmployee, name="manage_one_employee"),
]