"""jb URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from jb_dashboard.views import index
from django.contrib.staticfiles import views
from django.urls import re_path
from django.conf import settings
import os


def serve_static_content(request, static_path):
    static_content_path = os.path.join(settings.UI_BUILD_DIR, static_path)
    if os.path.exists(static_content_path):
        return views.serve(request, static_path)
    else:
        return index(request)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index),
    path('api/dashboard/', include('jb_dashboard.urls')),
    path('api/sources/', include('jb_settings.urls')),
    re_path(r'(?P<static_path>.*)$', serve_static_content),
]
