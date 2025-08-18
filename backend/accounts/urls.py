from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('leaveRequests', views.LeaveRequestViewset, basename='leave_requests')
router.register('departments', views.DepartmentViewset, basename='departments')
router.register('employees', views.UserViewset, basename='employees')

urlpatterns = [
    path('', include(router.urls)),
    
    # path('employees/', views.manageEmployees, name="manage_employees"),
    # path('employees/<int:id>/', views.manageOneEmployee, name="manage_one_employee"),
]