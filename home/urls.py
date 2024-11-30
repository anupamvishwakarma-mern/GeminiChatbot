from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.userlogin, name='userlogin'),
    path('signup', views.usersignup, name='usersignup'),
    path('logout', views.userLogout, name='userLogout'),

]