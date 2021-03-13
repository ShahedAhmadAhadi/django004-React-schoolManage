from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from students.models import Student
from django.contrib.auth.decorators import login_required
from django.core import serializers

# Create your views here.

def search(request, name):
    # a = Student.objects.all()
    a = Student.objects.filter(s_name__icontains = name)
    # count = 0
    # res = {}
    # print(res)
    # a = Student.objects.filter(s_name__icontains = name)
    res = serializers.serialize('json', a)
    # for i in a:
    #     count += 1
    #     res.update({f"res{count}": {'id':f"{i.s_name[1:2]}{i.s_father_name[1:2]}{int(i.s_roll * 1234)}", 'name': i.s_name, 'f/name': i.s_father_name, 'phone': i.s_phone, 'roll_no': i.s_roll}})
    # return JsonResponse(res, safe=False)
    return HttpResponse(res)