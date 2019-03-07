from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path(r'job_history/', views.JobHistory.as_view()),
    path(r'job_history_sync/', views.JobHistorySync.as_view()),
]
