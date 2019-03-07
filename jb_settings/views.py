from django.http import HttpResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt

from jb_settings.utils import save_source, get_source_by_id, \
    get_list_of_tables, get_list_of_columns, save_configuration, execute_mapping_query
from jb_settings.datasources.MySQL import MySQL
from jb_settings.datasources.mssql import MSSQL
from jb_dashboard.models import JobHistoryModel

import json


@method_decorator(csrf_exempt, name='dispatch')
class IndexView(View):

    def get(self, request):
        res = {
            "sources": [
                {
                    "port": 3306,
                    "name": "mysql"
                },
                {
                    "port": 1433,
                    "name": "ms_sqlserver"
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

class Tables(View):
    def get(self, request, id):
        source_data = get_source_by_id(id)
        if source_data:
            res = get_list_of_tables(source_data)
            res = {
                "source_id": id,
                "tables": res
            }
            return HttpResponse(json.dumps(res))
        else:
            return HttpResponse("No source found for id "+ str(id))

class Columns(View):
    def get(self, request, id, table_name):
        source_data = get_source_by_id(id)

        if not source_data:
            return HttpResponse("No source found for id "+ str(id))

        columns = get_list_of_columns(source_data, table_name)

        if not columns:
            columns = "Table {0} does not exits".format(table_name)

        res = {
            "source_id": id,
            "table_name": table_name,
            "columns": columns
        }
        return HttpResponse(json.dumps(res))

@method_decorator(csrf_exempt, name='dispatch')
class Configuration(View):
    def post(self, request, id):
        req_body = json.loads(request.body)
        req_data = req_body.get('data', 'oops')
        res = save_configuration(id, req_data)
        return HttpResponse(res)

class Sync(View):

    def get(self, request):
        res = execute_mapping_query()

        return HttpResponse(json.dumps(res, default=str))


def database_testing(request):
    results = {}
    ip_address = '172.16.18.242'
    mysql_obj = MySQL(server_name=ip_address,
                      port=3306,
                      user_name='root',
                      password='root',
                      db_name='TestDB')
    query = 'SELECT * from person'
    mysql_results = mysql_obj.execQuery(query)
    results['mysql'] = mysql_results

    mssql_obj = MSSQL(server_name=ip_address,
                      user_name='sa',
                      password='reallyStrongPwd123',
                      db_name='TestDB')
    query = "SELECT * FROM Inventory;"
    mssql_results = mssql_obj.execQuery(query)
    results['mssql'] = mssql_results
    print(results)
    return HttpResponse(json.dumps(results))
