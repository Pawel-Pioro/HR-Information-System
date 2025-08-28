from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('leaveRequests', views.LeaveRequestViewset, basename='leave_requests')
router.register('departments', views.DepartmentViewset, basename='departments')
router.register('users', views.UserViewset, basename='users')
router.register('employees', views.EmployeeViewset, basename='employees')
router.register('attendance', views.AttendanceViewset, basename='attendance')

urlpatterns = [
    path('', include(router.urls)),
    
]