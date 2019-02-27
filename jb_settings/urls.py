from django.urls import path

from . import views

urlpatterns = [
    path('', views.sources, name='index'),
    path('<int:id>/', views.sources_config),
    path('<int:id>/tables', views.list_of_tables),
    path('<int:id>/tables/<str:tableName>/columns', views.columns_for_table),
    path('<int:id>/conf', views.source_target_mapping),
]