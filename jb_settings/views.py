from django.http import HttpResponse
import json

def sources(request):
    if request.method == "POST":
        return HttpResponse("POST sources")
    else:
        res = {
            "sources":[
                {
                    "port": 1336,
                    "name": "mysql"
                },
                {
                    "port": 1436,
                    "name": "mssql"
                },
                {
                    "port": 1536,
                    "name": "jenkins"
                }

            ]
        }
        return HttpResponse(json.dumps(res))


def sources_config(request, id):
    if request.method == "GET":
        config = {
            "user":"user",
            "host":"localhost",
            "password":"XXX",
            "id":id,
            "port":1336
        }
        return HttpResponse(json.dumps(config))
    else:
        return HttpResponse("Only GET allowed")

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
