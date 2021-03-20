from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Authentication(models.Model):

    token = models.CharField(primary_key=True, max_length=12)
    expiry_date = models.DateTimeField(null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    


