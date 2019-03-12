
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
        elif start_obj.year == end_obj.year and start_obj.month != end_obj.month:
            self.filter['frequency'] = 'week'
        elif end_obj.year-start_obj.year <= 10:
            self.filter['frequency'] = 'month'
        else:
            self.filter['frequency'] = 'year'

    def get(self, request):
        self.create_filter(request.GET)
        self.set_frequency_filter(request.GET)
        if self.filter['frequency'] == 'day':
            return_obj = self.model_class.objects.filter(start_time__gte=self.filter['start_time__gte'],
                                                         start_time__lte=self.filter['end_time__lte'])
            date_obj = self.filter['start_time' + '__gte']
            return_dict = dict()
            while date_obj <= self.filter['end_time'+'__lte']:
                return_dict[str(date_obj.date())] = {}
                date_obj = date_obj+timedelta(days=1)

            for obj in return_obj:
                marked_date = str(obj.start_time.date())
                if marked_date in return_dict:
                    if obj.status in return_dict[marked_date]:
                        return_dict[marked_date][obj.status] += 1
                    else:
                        return_dict[marked_date][obj.status] = 1
                else:
                    return_dict[marked_date] = {obj.status: 1}
        elif self.filter['frequency'] == 'week':
            this_week = self.filter['start_time__gte']
            next_week = this_week + timedelta(days=7)
            return_dict = dict()
            while next_week <= self.filter['end_time__lte']:

                return_obj = self.model_class.objects.filter(start_time__lt=next_week,
                                                             start_time__gte=this_week)
                marked_date = str(this_week.date())
                return_dict[marked_date] = {}
                for obj in return_obj:
                    if marked_date in return_dict:
                        if obj.status in return_dict[marked_date]:
                            return_dict[marked_date][obj.status] += 1
                        else:
                            return_dict[marked_date][obj.status] = 1
                    else:
                        return_dict[marked_date] = {obj.status: 1}
                this_week = next_week
                next_week = this_week + timedelta(days=7)

        elif self.filter['frequency'] == 'month':
            return_obj = self.model_class.objects.filter(start_time__gte=self.filter['start_time__gte'],
                                                         start_time__lte=self.filter['end_time__lte'])
            return_dict = dict()
            month, year = self.filter['start_time' + '__gte'].month, self.filter['start_time' + '__gte'].year
            while True:
                if month > 12:
                    month = 1
                    year = year+1
                if datetime(year, month, 1) > self.filter['end_time'+'__lte']:
                    break
                return_dict['01-'+str(month)+'-'+str(year)] = {}
                month += 1
            for obj in return_obj:
                if obj.start_time.date() == self.filter['end_time'+'__lte'].date():
                    marked_date = str(obj.start_time.date())
                else:
                    marked_date = '01-' + str(obj.start_time.month) + '-' + str(obj.start_time.year)
                if marked_date in return_dict:
                    if obj.status in return_dict[marked_date]:
                        return_dict[marked_date][obj.status] += 1
                    else:
                        return_dict[marked_date][obj.status] = 1
                else:
                    return_dict[marked_date] = {obj.status: 1}
        elif self.filter['frequency'] == 'year':
            return_obj = self.model_class.objects.filter(start_time__gte=self.filter['start_time__gte'],
                                                         start_time__lte=self.filter['end_time__lte'])
            return_dict = dict()
            year = self.filter['start_time' + '__gte'].year
            while year <= self.filter['end_time'+'__lte'].year:
                return_dict['01-01-'+str(year)] = {}
                year += 1
            for obj in return_obj:
                if obj.start_time.year == self.filter['end_time' + '__lte'].year:
                    marked_date = str(obj.start_time.date())
                else:
                    marked_date = '01-01-' + str(obj.start_time.year)
                if marked_date not in return_dict:
                    return_dict[marked_date] = {obj.status: 1}
                else:
                    if obj.status in return_dict[marked_date]:
                        return_dict[marked_date][obj.status] += 1
                    else:
                        return_dict[marked_date][obj.status] = 1

        else:
            return Response("Invalid frequency filter input!!!")
        return_rest_list = []
        for key, value in return_dict.items():
            tmp_dict = dict()
            tmp_dict['date'] = key
            for k, v in value.items():
                tmp_dict[k] = v
            return_rest_list.append(tmp_dict)
        return Response(return_rest_list)


def get_date_obj(data):
    data = [int(x) for x in data.split('-')]
    return datetime(data[0], data[1], data[2])

