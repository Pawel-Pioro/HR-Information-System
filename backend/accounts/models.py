from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager

class UserModel(AbstractUser):
    username = None
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255, )
    last_name = models.CharField(max_length=255,)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = CustomUserManager()

    def __str__(self):
        return self.email

class Department(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name



class Employee(models.Model):
    user = models.OneToOneField(UserModel, on_delete=models.CASCADE)
    gender = models.CharField(max_length=10)
    dateOfBirth = models.DateField()
    phoneNumber = models.CharField(max_length=20)

    jobTitle = models.CharField(max_length=100)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True)
    employmentType = models.CharField(max_length=50, default='Full-Time', choices=[('Full-Time', 'Full-Time'), ('Part-Time', 'Part-Time'), ('Contract', 'Contract'), ('Intern', 'Intern'), ('Student', 'Student'), ('Other', 'Other')])
    employmentStatus = models.CharField(max_length=30, default='Active', choices=[('Active', 'Active'), ('On Leave', 'On Leave'), ('Terminated', 'Terminated'), ('Other', 'Other')])
    hiredDate = models.DateField(auto_now_add=True)
    startTime = models.TimeField(default='08:00:00')
    endTime = models.TimeField(default='17:00:00')
    daysPerWeek = models.IntegerField(default=0)
    manager = models.ForeignKey(UserModel, on_delete=models.SET_NULL, null=True, blank=True, related_name='team_members')

    hourlyRate = models.DecimalField(max_digits=10,decimal_places=2, default=0)
    bonuses = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    hoursLogged = models.IntegerField(default=0)
    leaveBalance = models.IntegerField(default=0)

class Attendance(models.Model):
    user = models.ForeignKey(Employee, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    clockIn = models.TimeField(auto_now_add=True,)
    clockOut = models.TimeField(null=True, blank=True)

    def hours_worked(self):
        if self.clock_out:
            return (self.clock_out - self.clock_in).total_seconds() / 3600
        return 0

    def __str__(self):
        return f"{self.user} - {self.clock_in.date()}"
    
class LeaveRequest(models.Model):
    LEAVE_TYPE_CHOICES = [
        ('Vacation', 'Vacation'),
        ('Sick', 'Sick Leave'),
        ('Unpaid', 'Unpaid Leave'),
        ('Other', 'Other'),
    ]

    user = models.ForeignKey(Employee, on_delete=models.CASCADE)
    leave_type = models.CharField(max_length=50, choices=LEAVE_TYPE_CHOICES)
    start_date = models.DateField(auto_now_add=True)
    end_date = models.DateField()
    reason = models.TextField(blank=True)

    def duration(self):
        return (self.end_date - self.start_date).days + 1

    def __str__(self):
        return f"{self.user} - {self.leave_type} ({self.start_date} → {self.end_date})"
    