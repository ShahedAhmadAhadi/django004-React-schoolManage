from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Authentication(models.Model):

    expiry_date = models.TimeField(null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


