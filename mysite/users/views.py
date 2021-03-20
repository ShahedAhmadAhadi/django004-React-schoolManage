from django.shortcuts import render, redirect
from .forms import Register
from django.contrib.auth import logout as logoff, login as logon, authenticate
from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse
from json import loads
from random import randint
from .models import Authentication
from datetime import datetime, timedelta
from ipware import get_client_ip


def token_generator():
    token = ''
    for i in range(9):
        if i % 4 != 0:
            random_num = randint(97, 122)
            token += chr(random_num)
        else:
            random_num = randint(10, 99)
            token += str(random_num)
    return token

# Create your views here.
def logout(request):
    logoff(request)
    return redirect('login')

def expiry_date():
    time_token_generated = datetime.now()
    token_expiry_date = time_token_generated + timedelta(days=1)
    return token_expiry_date


def token_saver(authentication_data, token):
    expire_date = expiry_date()
    user = User.objects.get(username = authentication_data)
    Authentication(token=token, expiry_date=expire_date, user = user).save()
    


def token_verify(request):
    print(request.body)
    if request.body:
        cookie_data = request.body.decode('ascii')
        dict_of_cookie_values = {}

        cookie_data_split_semicolon = cookie_data.split(';')

        for item in cookie_data_split_semicolon:
            cookie_data_split_semicolon_equal = item.split('=')
            if len(cookie_data_split_semicolon_equal[0]) > 4 and len(cookie_data_split_semicolon_equal[1]) > 4:
                for i in range(2):
                    dict_of_cookie_values.update({cookie_data_split_semicolon_equal[0].strip(): cookie_data_split_semicolon_equal[1].strip()})
            else: 
                return JsonResponse({'result': 'missing_field_in_cookie'})
        
        token = dict_of_cookie_values['token']

        try:
            database_data = Authentication.objects.get(token=token)
            print('a')
            
            if dict_of_cookie_values['username'] == str(database_data.user):
                datetime_now =  datetime.now()
                token_expiry_date = database_data.expiry_date.replace(tzinfo=None)

                if token_expiry_date < datetime_now:
                    return JsonResponse({'result': 'session_expired'})

                return JsonResponse({'result': 'true'})
            else:
                return JsonResponse({'result': 'not_valid_user'})

        except :
            return JsonResponse({'result': 'wrong_token'})


def login(request):
    data = loads(request.body)
    print(data)

    # token_saver(data)

    user = authenticate(username = data['username'], password = data['password'])

    if user is not None:
        try:
            authentication_database_data = Authentication.objects.get(user=user)
            authentication_database_data.delete()
        except :
            pass
        
        token_generated = token_generator()
        token_saver(user.username, token_generated)
        return JsonResponse({'token': token_generated})
        

    return HttpResponse("Hi there")




def signup(request):
    if request.method == 'POST':
        form = Register(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = Register()
    return render (request, 'users/index.html', {'form':form})


