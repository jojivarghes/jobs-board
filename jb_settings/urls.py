from django.urls import path

from . import views

urlpatterns = [
    path('', views.IndexView.as_view()),
    path('test/', views.database_testing),
    path('<int:id>/', views.SourcesView.as_view()),
    path('<int:id>/tables', views.Tables.as_view()),
    path('<int:id>/tables/<str:table_name>/columns', views.Columns.as_view()),
    path('<int:id>/conf', views.Configuration.as_view()),
    path('sync/', views.Sync.as_view()),
]