from rest_framework import serializers
from .models import Student

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('s_name','s_father_name', 's_birth', 's_phone', 's_email', 's_image')
        