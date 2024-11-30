from django.shortcuts import render,redirect

from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate,login,logout
from users.models import CustomUserModel

from django.contrib import messages

@login_required(login_url='userlogin')
def index(request):

    return render(request, 'index.html')


def userlogin(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            messages.success(request, "Login successful.")
            return render(request, 'index.html')
        else:
            messages.error(request, "Invalid credentials. Please try again.")
            return render(request, 'login.html')
    
    return render(request, 'login.html')


def usersignup(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = CustomUserModel.objects.create_user(email=email,password=password)
        user.name = request.POST.get('name')
        user.save()
        return redirect('index')
    return render(request, 'login.html')


def userLogout(request):
    logout(request)
    return redirect('userlogin')