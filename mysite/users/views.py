from django.shortcuts import render, redirect
from .forms import Register
from django.contrib.auth import logout as logoff

# Create your views here.
def logout(request):
    logoff(request)
    return redirect('login')

def login(request):
    return render(request, 'users/login.html')

def signup(request):
    if request.method == 'POST':
        form = Register(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = Register()
    return render (request, 'users/index.html', {'form':form})


