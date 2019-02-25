from django.db import models

# Create your models here.


class JobHistory(models.Model):
    utime = models.IntegerField()
    job_id = models.IntegerField()
    status = models.CharField(max_length=100)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    comments = models.TextField(blank=True, null=True)
