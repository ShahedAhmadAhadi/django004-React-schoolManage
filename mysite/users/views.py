from django.shortcuts import render, redirect
from .forms import Register
from django.contrib.auth import logout as logoff, login as logon
from django.contrib.auth import authenticate
from django.http import HttpResponse, JsonResponse
from json import *
from random import randint

token_generated = None

def tokenGenerator():
    token1 = randint(1, 100)
    token2 = randint(1, 100)
    token3 = randint(1, 100)
    token = f'{token1}abc{token2}def{token3}'
    print(token)
    return token

# Create your views here.
def logout(request):
    logoff(request)
    return redirect('login')

def login(request):
    data = loads(request.body)
    print(data)

    user = authenticate(username = data['username'], password = data['password'])

    if user is not None:
        print(user)
        token = tokenGenerator()
        global token_generated
        token_generated = token
        return JsonResponse({'token': token})
        

    return HttpResponse("Hi there")

def token_verify(request):
    print(token_generated)
    return JsonResponse({'token': token_generated})



def signup(request):
    if request.method == 'POST':
        form = Register(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = Register()
    return render (request, 'users/index.html', {'form':form})


