from django.db import models
from datetime import date

# Create your models here.


def validate_age(value):
    today = date.today()
    if today.year - value.year < 5:
        return False
    return True
        


class Student(models.Model):

    s_roll = models.AutoField(primary_key=True)
    s_name = models.CharField(max_length=30, null=False)
    s_father_name = models.CharField(max_length=30, null=False)
    s_birth = models.DateField(null=False, validators=[validate_age])
    s_phone = models.CharField(unique=True, max_length=12)
    s_email = models.EmailField(unique=True)
    s_image = models.ImageField(upload_to='studentImages')
    s_file = models.FileField(default="")
