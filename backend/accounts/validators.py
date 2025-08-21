from django.core.validators import RegexValidator
from django.utils import timezone
from django.core.exceptions import ValidationError

phoneValidator = RegexValidator(
    regex=r'^\+?\d{9,20}$',
    message="Phone number must be 9-20 digits, can start with +"
)

def dateOfBirthValidator(value):
    if value > timezone.now().date():
        raise ValidationError("Date of birth cannot be in the future.")