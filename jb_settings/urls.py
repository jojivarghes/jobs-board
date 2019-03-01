from django.urls import path

from . import views

urlpatterns = [
    path('', views.IndexView.as_view()),
    path('<int:id>/', views.SourcesView.as_view()),
    path('<int:id>/tables', views.list_of_tables),
    path('<int:id>/tables/<str:tableName>/columns', views.columns_for_table),
    path('<int:id>/conf', views.source_target_mapping),
]