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
from hashlib import sha1
from ipaddress import ip_address


def token_generator():
    token = ''
    # the probability of colide is ~ 1/17^30
    for i in range(10, 40):
        random_selection = randint(0, i)

        if random_selection % 4 == 0:
            random_num = randint(1, 9)
            token += str(random_num)
        elif random_selection % 2 == 0:
            random_num = randint(65, 90)
            token += chr(random_num)
        else:
            random_num = randint(97, 122)
            token += chr(random_num)

    return token


def logout(request):
    print(request.body)
    token = request.body.decode('ascii')
    print(token)
    hash_token = sha1(token.encode('utf-8')).hexdigest()
    try:
        print(hash_token)
        authentication_database_data = Authentication.objects.filter(token=hash_token)
        authentication_database_data.delete()
    except :
        pass
    
    return JsonResponse({'a':'a'})

        

def expiry_date():
    time_token_generated = datetime.now()
    token_expiry_date = time_token_generated + timedelta(days=1)
    return token_expiry_date


def token_saver(token, user, appVersion, ip):
    if ip_address(ip):
        print(user, token, appVersion, ip)
        expire_date = expiry_date()
        user = User.objects.get(username = user)
        token_hash = sha1(token.encode('utf-8')).hexdigest()
        Authentication(token=token_hash, expiry_date=expire_date, user = user, app_version=appVersion, ip=ip).save()
    

def cookie_extractor(cookie):
    cookie_data = cookie
    dict_of_cookie_values = {}

    cookie_data_split_semicolon = cookie_data.split(';')

    for item in cookie_data_split_semicolon:
        cookie_data_split_semicolon_equal = item.split('=')
        if len(cookie_data_split_semicolon_equal[0]) > 1 and len(cookie_data_split_semicolon_equal[1]) > 1:
            for i in range(2):
                dict_of_cookie_values.update({cookie_data_split_semicolon_equal[0].strip(): cookie_data_split_semicolon_equal[1].strip()})
        else: 
            return False
    try:
        token = dict_of_cookie_values['token']
    except :
        return False
        
    hash_token = sha1(token.encode('utf-8')).hexdigest()

    try:
        database_data = Authentication.objects.get(token=hash_token)
        
        if dict_of_cookie_values['username'] == str(database_data.user):
            datetime_now =  datetime.now()
            token_expiry_date = database_data.expiry_date.replace(tzinfo=None)

            if token_expiry_date < datetime_now:
                return 'session-expired'

            return True
        else:
            return False

    except :
        return False
    return False


def token_verify(request):
    print(request.body)
    if request.body:
        cookie_data = request.body.decode('ascii')
        dict_of_cookie_values = {}

        cookie_data_split_semicolon = cookie_data.split(';')

        for item in cookie_data_split_semicolon:
            cookie_data_split_semicolon_equal = item.split('=')
            if len(cookie_data_split_semicolon_equal[0]) > 1 and len(cookie_data_split_semicolon_equal[1]) > 1:
                for i in range(2):
                    dict_of_cookie_values.update({cookie_data_split_semicolon_equal[0].strip(): cookie_data_split_semicolon_equal[1].strip()})
            else: 
                return JsonResponse({'result': 'missing_field_in_cookie'})
        try:
            token = dict_of_cookie_values['token']
        except :
            return JsonResponse({'result': 'missing_field_in_cookie'})
        hash_token = sha1(token.encode('utf-8')).hexdigest()

        try:
            database_data = Authentication.objects.get(token=hash_token)
            
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
    return JsonResponse({'result': 'no_cookie'})


def login(request):
    data = loads(request.body)

    user = authenticate(username = data['username'], password = data['password'])

    if user is not None:
        try:
            authentication_database_data = Authentication.objects.filter(user=user, app_version=data['appVersion'], ip=data['ip'])
            authentication_database_data.delete()
        except :
            pass
        
        token_generated = token_generator()
        try:
            token_saver(token_generated, user.username, data['appVersion'], data['ip'])  
        except:
            return JsonResponse({'result': 'wrong_ip'})

        return JsonResponse({'token': token_generated})
        

    return HttpResponse("Hi there")




def signup(request):
    if request.method == 'POST':
        print(request.body)
        signup_data = loads(request.body.decode('ascii'))
        User(username=signup_data['username'], password=signup_data['password1'], email=signup_data['email']).save()


    else:
        return JsonResponse({'result': 'post only'})
    return JsonResponse({'result': 'request send'})


