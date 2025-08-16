from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('leaveRequests', views.LeaveRequestViewset, basename='leave_requests')

urlpatterns = [
    path('', include(router.urls)),
    
    path('employees/', views.manageEmployees, name="manage_employees"),
    path('employees/<int:id>/', views.manageOneEmployee, name="manage_one_employee"),
    # path('leaveRequests/<int:id>/', views.oneLeaveRequest, name="one_leave_request"),
]