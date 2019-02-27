# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.


class BaseModel(models.Model):

    created_date = models.DateTimeField(editable=False, auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)

    class Meta:
        abstract = True

    def soft_delete(self):
        """
        Override delete for soft delete
        :param using:
        :return:
        """
        self.active = False
        self.save()


class JobHistoryModel(BaseModel):
    job_id = models.CharField(primary_key=True, max_length=255)
    status = models.CharField(max_length=30)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    comments = models.CharField(max_length=255)


class JobHistorySyncModel(BaseModel):
    job = models.ForeignKey(JobHistoryModel, on_delete=models.CASCADE)
    source = models.CharField(max_length=255)
    last_poll_time = models.DateTimeField()
    status = models.CharField(max_length=255)

