from django.shortcuts import render, redirect
from rest_framework import generics
from django.core import serializers
from django.http import JsonResponse, HttpResponse
from .models import Student
from .form import StudentForm
from django.contrib.auth.decorators import login_required
# Create your views here.

@login_required(login_url='/login/')
def initial(request):
    queryset = Student.objects.all()
    context = {
        'all_items': queryset
    }
    return render(request, 'students/index.html', context)
    

@login_required(login_url='/login/')
def search(request):
    queryset = Student.objects.all()
    a = serializers.serialize('json', queryset)
    return HttpResponse(a)


@login_required(login_url='/login/')
def detail(request, roll_no):
    queryset = Student.objects.get(s_roll = roll_no)
    context = {
        'all_item': queryset
    }

    return render(request, 'students/detail.html', context)


@login_required(login_url='/login/')
def add_student(request):
    form = StudentForm(request.POST, request.FILES)

    if form.is_valid():
        form.save()
        return redirect('/')

    return render(request, 'students/student-form.html', {'form': form})


@login_required(login_url='/login/')
def update_student(request, roll_no=None):
    if roll_no:
        student = Student.objects.get(s_roll = roll_no)
        form = StudentForm(data=request.POST or None, files=request.FILES or None, instance=student)

        if form.is_valid():
            form.save()
            return redirect('/')
        

        return render(request, 'students/update.html', {'form': form})



@login_required(login_url='/login/')
def delete_student(request, roll_no):
    student_list = Student.objects.get(s_roll = roll_no)

    if request.method == "POST":
        student_list.delete()
        return redirect('/')
    
    return render(request, 'students/delete.html', {'all_item': student_list})



