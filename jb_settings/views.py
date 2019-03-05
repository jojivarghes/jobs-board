from django.http import HttpResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt

from jb_settings.utils import save_source, get_source_by_id
from jb_settings.datasources.MySQL import MySQL

import json

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

def mysql_testing(request):
    mysql_obj = MySQL(server_name='172.16.18.242',
                      port=3306,
                      user_name='root',
                      password='root',
                      db_name='TestDB')
    query = 'SELECT * from person'
    results = mysql_obj.execQuery(query)
    return HttpResponse(json.dumps(results))


def list_of_tables(request, id):
    if request.method == "GET":
        list_of_tables_1 = ['table_1', 'table_2']
        list_of_tables_2 = ['table_3']

        if str(id) == '1':
            res = {
                "source_id": id,
                "tables": list_of_tables_1
            }
        elif str(id) == '2':
            res = {
                "source_id": id,
                "tables": list_of_tables_2
            }
        else:
            res = {}

        return HttpResponse(json.dumps(res))
    else:
        return HttpResponse("Only GET allowed")

def columns_for_table(request, id, tableName):
    if request.method == "GET":
        table1_columns = ['session_id', 'start_time', 'status', 'end_time', 'user_id']
        table2_columns = ['session_id', 'comments']
        table3_columns = ['job_id', 'start_time', 'end_time', 'status', 'comments']

        if (str(id) == '1' and tableName == 'table_1'):
            res = {
                "source_id": id,
                "table_name": tableName,
                "columns": table1_columns
            }
        elif (str(id) == '1' and tableName == 'table_2'):
            res = {
                "source_id": id,
                "table_name": tableName,
                "columns": table2_columns
            }
        elif (str(id) == '2' and tableName == 'table_3'):
            res = {
                "source_id": id,
                "table_name": tableName,
                "columns": table3_columns
            }
        else:
            res = {
                "source_id": id,
                "table_name":tableName,
                "error": "ID and table_name does not match"

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
