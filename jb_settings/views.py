from django.http import HttpResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt

import json
import random
from jb_settings.utils import save_source, get_source_by_id

# URL : /api/sources
@method_decorator(csrf_exempt, name='dispatch')
class IndexView(View):

    def get(self, request):
        res = {
            "sources": [
                {
                    "port": 1336,
                    "name": "mysql"
                },
                {
                    "port": 1436,
                    "name": "mssql"
                },
                {
                    "port": 1636,
                    "name": "jenkins"
                }

            ]
        }
        return HttpResponse(json.dumps(res))

    def post(self, request):
        req_body = json.loads(request.body)
        req_data = req_body.get('data','oops')
        source_id = save_source(req_data)
        return HttpResponse(json.dumps({"source_id":source_id}))

class SourcesView(View):
    def get(self, request, id):
        source_config = get_source_by_id(id)
        if source_config:
            return HttpResponse(json.dumps(source_config))
        else:
            return HttpResponse("No source is found for ID:"+str(id))


# @method_decorator(csrf_exempt, name='dispatch')
# class SourceMapping(View):
#     def get(self, request, id):
#         pass
#
#     def post(self, request, id):
#         req_body = json.loads(request.body)
#         req_data = req_body.get('data', 'oops')
#         source_id = save_source(req_data)
#         return HttpResponse(json.dumps({"source_id": source_id}))

def list_of_tables(request, id):
    if request.method == "GET":
        list_of_tables = ['jobs', 'jobs_history']
        res = {
            "id": id,
            "tables": list_of_tables
        }
        return HttpResponse(json.dumps(res))
    else:
        return HttpResponse("Only GET allowed")

def columns_for_table(request, id, tableName):
    if request.method == "GET":
        list_of_columns = ['jobs_id', 'job_name', 'start_time', 'end_time']
        res = {
            "id": id,
            "tableName": tableName,
            "columns": list_of_columns
        }
        return HttpResponse(json.dumps(res))
    else:
        return HttpResponse("Only GET allowed")

def source_target_mapping(request, id):
    if request.method == "GET":
        return HttpResponse(str(id) +"mapping done")
    elif request.method == "POST":
        pass
    else:
        return HttpResponse("Only GET and POST allowed")

'''

def create_job(request):
    jobId = random.randint(1, 9999)
    job = JobHistory(JobId=jobId)
    job.save()
    return HttpResponse("Created Job: " + str(jobId))

def index(request):
    results = JobHistory.objects.all()

    return JsonResponse({'results': list(results.values())})

def mssql(request):
    query = "SELECT * FROM Inventory WHERE quantity > 152"
    try:
        mssql_db = MSSQL("172.26.0.2,1433", "SA", "reallyStrongPwd123","TestDB")
        results = mssql_db.execQuery(query)
        return HttpResponse(results)
    except Exception as e:
        import traceback
        traceback.print_exc()
        return HttpResponse("Failed")
'''
