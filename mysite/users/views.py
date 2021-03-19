from django.shortcuts import render, redirect
from .forms import Register
from django.contrib.auth import logout as logoff, login as logon
from django.contrib.auth import authenticate
from django.http import HttpResponse, JsonResponse
from json import loads
from random import randint
from .models import Authentication
from datetime import datetime

token_generated = None

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
    


def token_saver(authentication_data, token):
    Authentication(token=token, )


def token_verify(request):
    print(token_generated)
    return JsonResponse({'token': token_generated})


def login(request):
    data = loads(request.body)
    print(data)

    # token_saver(data)

    user = authenticate(username = data['username'], password = data['password'])

    if user is not None:
        print(user)
        token = token_generator()
        global token_generated
        token_generated = token
        return JsonResponse({'token': token})
        

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


