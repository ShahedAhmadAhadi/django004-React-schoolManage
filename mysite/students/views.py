from django.shortcuts import render, redirect
from django.core import serializers
from django.http import JsonResponse, HttpResponse
from .models import Student
from .form import StudentForm
from django.contrib.auth.decorators import login_required
from json import *
import codecs
# Create your views here.

def home(req):
    queryset = Student.objects.all()
    serialized_queryset = serializers.serialize('json', queryset)
    return JsonResponse({'data': serialized_queryset})



# @login_required(login_url='/login/')
# def initial(request):
#     queryset = Student.objects.all()
#     # pagenator = Paginator(queryset, 1)
#     # page_number = request.Get.get('page')
#     # page_object = pagenator.get_page(page_number)
#     context = {
#         'all_items': queryset
#     }
#     return render(request, 'students/index.html', context)
    

# @login_required(login_url='/login/')
def search(request, name):
    queryset = Student.objects.filter(s_name__icontains = name)
    a = serializers.serialize('json', queryset)
    return JsonResponse({'data': a})

@login_required(login_url='/login/')
def detail(request, roll_no):
    queryset = Student.objects.get(s_roll = roll_no)
    context = {
        'all_item': queryset
    }

    return render(request, 'students/detail.html', context)


# @login_required(login_url='/login/')
# def add_student(request):
#     form = StudentForm(request.POST, request.FILES)

#     if form.is_valid():
#         form.save()
#         return redirect('/')

#     return render(request, 'students/student-form.html', {'form': form})


def add_student(request):
    print(request.header)

    s= Student()
    s.s_name = request.POST.get('name')
    s.s_father_name = request.POST.get('fatherName')
    s.s_birth = request.POST.get('date')
    s.s_phone = request.POST.get('phone')
    s.s_email = request.POST.get('email')
    s.s_image = request.FILES.get('myFile')

    Student.save(s)

    return HttpResponse("Hi there")

    


@login_required(login_url='/login/')
def update_student(request, roll_no=None):
    if roll_no:
        student = Student.objects.get(s_roll = roll_no)
        form = StudentForm(data=request.POST or None, files=request.FILES or None, instance=student)

        if form.is_valid():
            form.save()
            return redirect('/')
        

        return render(request, 'students/update.html', {'form': form})



# @login_required(login_url='/login/')
def delete_student(request):

    student_list = Student.objects.get(s_roll = request.GET['text'])

    if request.method == "POST":
        student_list.delete()
    
    return JsonResponse({'a': 'a'})



