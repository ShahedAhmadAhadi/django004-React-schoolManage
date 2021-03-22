from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Authentication(models.Model):

    token = models.CharField(primary_key=True, max_length=40)
    expiry_date = models.DateTimeField(null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ip = models.CharField(max_length=15, unique=False)
    app_version = models.TextField()


