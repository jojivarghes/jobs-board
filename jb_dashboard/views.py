
# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
import json
from datetime import datetime, timedelta
from django.utils import timezone

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from jb_dashboard.models import *
from jb_dashboard.serializers import *

def index(request):
    # return HttpResponse("Hello, world. You're at the polls index.")

    template = loader.get_template('index.html')
    context = {}
    return HttpResponse(template.render(context, request))

# Create your views here.

class BaseApiView(APIView):

    def __init__(self):
        APIView.__init__(self)
        self.model_class = BaseModel
        self.serializer_class = BaseSerializer
        self.filter_list = []
        self.filter = {}

    def post(self, request):
        data = request.body
        data = json.loads(data)
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_304_NOT_MODIFIED)

    def get(self, request):
        # Only accept first tenant, so no matter what user cannot see data of more than one tenant
        return_obj = self.model_class.objects.filter(**self.filter)
        serializer = self.serializer_class(return_obj, many=True)
        return Response(serializer.data)

    def create_filter(self, data):
        for key in self.filter_list:
            if key in data:
                # For tenant always get only 1 tenant id
                if key == 'job_id':
                    self.filter[key+'__in'] = data.getlist(key)
                elif key == 'start':
                    self.filter['start_time' + '__gte'] = get_date_obj(data.getlist(key)[0])
                elif key == 'end':
                    self.filter['end_time'+'__lte'] = get_date_obj(data.getlist(key)[0])
                elif key == 'frequency':
                    self.filter['frequency'] = data.getlist('frequency')[0]


class JobHistoryView(BaseApiView):
    def __init__(self):
        super(JobHistoryView, self).__init__()
        self.serializer_class = JobHistorySerializer
        self.model_class = JobHistoryModel
        self.filter_list = ['job_id', 'start', 'end']

    def post(self, request):
        return super(JobHistoryView, self).post(request)

    def get(self, request):
        self.create_filter(request.GET)
        return super(JobHistoryView, self).get(request)


class JobHistorySyncView(BaseApiView):
    def __init__(self):
        super(JobHistorySyncView, self).__init__()
        self.serializer_class = JobHistorySerializer
        self.model_class = JobHistoryModel

    def post(self, request):
        return super(JobHistorySyncView, self).post(request)

    def get(self, request):
        return super(JobHistorySyncView, self).get(request)


class JobDateRangeView(BaseApiView):
    def __init__(self):
        super(JobDateRangeView, self).__init__()
        self.model_class = JobHistoryModel
        self.serializer_class = JobHistorySerializer


    def get(self, request):
        return_obj_first = JobHistoryModel.objects.all().order_by('start_time')[0]
        return_obj_last = JobHistoryModel.objects.all().order_by('start_time')[::-1][0]
        return_dict = {'first': return_obj_first.start_time, 'last': return_obj_last.start_time}
        return Response(return_dict)


class JobScoresView(BaseApiView):
    def __init__(self):
        super(JobScoresView, self).__init__()
        self.model_class = JobHistoryModel
        self.serializer_class = JobHistorySerializer

    def get(self, request):
        self.create_filter(request.GET)
        return_obj = self.model_class.objects.filter(**self.filter)
        return_dict = dict()
        for obj in return_obj:
            if obj.status in return_dict:
                return_dict[obj.status] += 1
            else:
                return_dict[obj.status] = 1
        return Response(return_dict)


class JobChartView(BaseApiView):
    def __init__(self):
        super(JobChartView, self).__init__()
        self.model_class = JobHistoryModel
        self.serializer_class = JobHistorySerializer
        self.filter_list = ['start', 'end', 'frequency']

    def set_frequency_filter(self, data):
        start_obj = get_date_obj(data.getlist('start')[0])
        end_obj = get_date_obj(data.getlist('end')[0])
        if start_obj.month == end_obj.month and start_obj.year == end_obj.year:
            self.filter['frequency'] = 'day'
        elif start_obj.year == end_obj.year:
            self.filter['frequency'] = 'week'
        elif end_obj.year-start_obj.year <= 10:
            self.filter['frequency'] = 'month'
        else:
            self.filter['frequency'] = 'year'

    def get(self, request):
        self.create_filter(request.GET)
        self.set_frequency_filter(request.GET)
        print(self.filter, "AAAAA")
        if self.filter['frequency'] == 'day':
            return_obj = self.model_class.objects.filter(start_time__gte=self.filter['start_time__gte'],
                                                         start_time__lte=self.filter['end_time__lte'])
            print(return_obj, "CCC")
            return_dict = dict()
            for obj in return_obj:
                print(obj, "CCC")
                if obj.start_time.date in return_dict:
                    if obj.status in return_dict[obj.start_time.day]:
                        return_dict[obj.start_time.date][obj.status] += 1
                    else:
                        return_dict[obj.start_time.date][obj.status] = 1
                else:
                    return_dict[obj.start_time.date] = {obj.status: 1}
        elif self.filter['frequency'] == 'week':
            last_week = self.filter['start_time__gte'] - timedelta(days=7)
            this_week = last_week + timedelta(days=7)
            return_obj = self.model_class.objects.filter(start_time__lte=this_week,
                                                         start_time__gte=last_week)
            return_dict = dict()
            for obj in return_obj:
                key = str(obj.start_time.date())
                if key in return_dict:
                    if obj.status in return_dict[key]:
                        return_dict[key][obj.status] += 1
                    else:
                        return_dict[key][obj.status] = 1
                else:
                    return_dict[key] = {obj.status: 1}
        elif self.filter['frequency'] == 'month':
            return_obj = self.model_class.objects.filter(start_time__gte=self.filter['start_time__gte'],
                                                         start_time__lte=self.filter['end_time__lte'])
            return_dict = dict()
            for obj in return_obj:
                if obj.start_time.month in return_dict:
                    if obj.status in return_dict[obj.start_time.month]:
                        return_dict[obj.start_time.month][obj.status] += 1
                    else:
                        return_dict[obj.start_time.month][obj.status] = 1
                else:
                    return_dict[obj.start_time.month] = {obj.status: 1}
        elif self.filter['frequency'] == 'year':
            return_obj = self.model_class.objects.filter(start_time__gte=self.filter['start_time__gte'],
                                                         start_time__lte=self.filter['end_time__lte'])
            return_dict = dict()
            for obj in return_obj:
                if obj.start_time.year not in return_dict:
                    return_dict[obj.start_time.year] = {obj.status: 1}
                else:
                    if obj.status in return_dict[obj.start_time.year]:
                        return_dict[obj.start_time.year][obj.status] += 1
                    else:
                        return_dict[obj.start_time.year][obj.status] = 1

        else:
            return Response("Invalid frequency filter input!!!")
        return Response(return_dict)


def get_date_obj(data):
    data = [int(x) for x in data.split('-')]
    return datetime(data[0], data[1], data[2])

