from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model

from . import models

UserModel = get_user_model()

@admin.register(UserModel)
class CustomUserAdmin(UserAdmin):
    model = UserModel

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'password1', 'password2', 'is_staff', 'is_superuser')}
        ),
    )

    list_display = ('email', 'first_name', 'last_name', 'is_staff', 'is_superuser')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)

@admin.register(models.Employee)
class EmployeeAdmin(admin.ModelAdmin):
    pass

@admin.register(models.Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'get_members')

    def get_members(self, obj):
        return ", ".join(str(member) for member in obj.members.all())

@admin.register(models.Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    pass

@admin.register(models.LeaveRequest)
class LeaveRequestAdmin(admin.ModelAdmin):
    pass

@admin.register(models.LeaveType)
class LeaveTypeAdmin(admin.ModelAdmin):
    pass