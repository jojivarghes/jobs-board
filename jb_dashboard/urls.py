from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path(r'job_history/', views.JobHistoryView.as_view()),
    path(r'job_history_sync/', views.JobHistorySyncView.as_view()),
    path(r'job_history/date_range', views.JobDateRangeView.as_view()),
    path(r'job_scores', views.JobScoresView.as_view()),
    path(r'job_chart', views.JobChartView.as_view()),
]
