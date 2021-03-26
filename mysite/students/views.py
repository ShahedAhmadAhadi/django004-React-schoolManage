from django.shortcuts import render, redirect
from django.core import serializers
from django.http import JsonResponse, HttpResponse
from .models import Student
from .form import StudentForm
from django.contrib.auth.decorators import login_required
from json import *
# import codecs
from users.models import Authentication
from hashlib import sha1
from datetime import datetime
from users.views import cookie_extractor
from json import dumps, loads

# Create your views here.

def token_verify(str_):
    print(str_)
    if str_:
        # cookie_data = request.body.decode('ascii')
        cookie_data = str_
        dict_of_cookie_values = {}

        cookie_data_split_semicolon = cookie_data.split(';')

        for item in cookie_data_split_semicolon:
            cookie_data_split_semicolon_equal = item.split('=')
            if len(cookie_data_split_semicolon_equal[0]) > 1 and len(cookie_data_split_semicolon_equal[1]) > 1:
                for i in range(2):
                    dict_of_cookie_values.update({cookie_data_split_semicolon_equal[0].strip(): cookie_data_split_semicolon_equal[1].strip()})
            else: 
                return ({'result': 'missing_field_in_cookie'})
        try:
            token = dict_of_cookie_values['token']
        except :
            return ({'result': 'missing_field_in_cookie'})
        hash_token = sha1(token.encode('utf-8')).hexdigest()

        try:
            database_data = Authentication.objects.get(token=hash_token)
            
            if dict_of_cookie_values['username'] == str(database_data.user):
                datetime_now =  datetime.now()
                token_expiry_date = database_data.expiry_date.replace(tzinfo=None)

                if token_expiry_date < datetime_now:
                    return ({'result': 'session_expired'})

                return ({'result': 'true'})
            else:
                return ({'result': 'not_valid_user'})

        except :
            return ({'result': 'wrong_token'})
    return ({'result': 'no_cookie'})

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
    try:
        if cookie_extractor(request.headers['Head']):
            queryset = Student.objects.filter(s_name__icontains = name)
            print(queryset)
            a = serializers.serialize('json', queryset)
            # print(a)
            return JsonResponse({'data': a})
        else:
            return JsonResponse(dumps({'data': 'false'}), safe=False)
    except :
        return JsonResponse(dumps({'data': 'wrong_request'}), safe=False)
    

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
    print(request.headers['Head'])
    try:
        if cookie_extractor(request.headers['Head']):
            s= Student()
            s.s_name = request.POST.get('name')
            s.s_father_name = request.POST.get('fatherName')
            s.s_birth = request.POST.get('date')
            s.s_phone = request.POST.get('phone')
            s.s_email = request.POST.get('email')
            s.s_image = request.FILES.get('myFile')

            Student.save(s)
            return JsonResponse({'result': 'true'})
        else:
            return JsonResponse({'result': 'false'})
        
    except:
        return JsonResponse({'result': 'wrong_request'})
                
    return JsonResponse({"Hi there": 'a'})

    


# @login_required(login_url='/login/')
def update_student(request):
    if request.GET:
        student = Student.objects.filter(s_roll = request.GET['text'])
        serialize_student = serializers.serialize('json', student)
        return JsonResponse({'student': serialize_student})
    if request.POST:
        student = Student.objects.get(s_roll = request.POST.get('id'))
        print(student)
        student.s_name = request.POST.get('name')
        student.s_father_name = request.POST.get('fatherName')
        student.s_birth = request.POST.get('date')
        student.s_phone = request.POST.get('phone')
        student.s_email = request.POST.get('email')
        student.s_image = request.FILES.get('myFile')
        student.save()
        return JsonResponse({'a': 'a'})




# @login_required(login_url='/login/')
def delete_student(request):

    student_list = Student.objects.get(s_roll = request.GET['text'])

    if request.method == "POST":
        student_list.delete()
    
    return JsonResponse({'a': 'a'})



