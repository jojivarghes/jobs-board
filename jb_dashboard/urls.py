from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path(r'track/', views.JobHistory.as_view()),
    path(r'tracksync/', views.JobHistorySync.as_view()),
]