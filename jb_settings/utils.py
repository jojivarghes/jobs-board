from jb_settings.datasources.MySQL import MySQL
from jb_settings.datasources.mssql import MSSQL
from jb_dashboard.models import JobHistoryModel


import json
import os
from os import path

def save_source(source_conf):
    _, _, files = next(os.walk('/conf'))

    if len(files) == 0:
        source_id = len(files) + 1
    else:
        source_id = len(files)

    source_data = {"source_id": source_id, "data": source_conf}

    with open('/conf/source.json', 'w') as f:
        json.dump(source_data, f)

    return source_id

def get_source_by_id(source_id):
    with open('/conf/source.json') as f:
        data = json.load(f)

    for key in data.keys():
        if str(data[key]) == str(source_id):
            return data

    return None

def save_configuration(id, configuration):
    source_data = get_source_by_id(id)

    if not source_data:
        return "Error: Wrong source ID"

    file_path = '/conf/source_'+str(id)+'.json'
    with open(file_path, 'w') as f:
        json.dump(configuration, f)

    return "Success"

def get_active_source():
    source_path = '/conf/source.json'
    if path.exists(source_path):
        with open('/conf/source.json') as f:
            data = json.load(f)

        return data['source_id']
    else:
        return None

def get_query_from_conf():
    source_id = get_active_source()
    if not source_id:
        return "Error. No active source found"

    source_path  = '/conf/source_'+str(source_id)+'.json'

    if not path.exists(source_path):
        return "Error. No source configurations found"

    with open(source_path) as f:
        data = json.load(f)

    query = data['sql ']
    return (source_id, query)


def execute_mapping_query():
    query_params = get_query_from_conf()

    source_id = query_params[0]
    source_data = get_source_by_id(source_id)

    db = source_data['data']
    db_type = db['type']
    db_name = db['dbname']
    db_host = db['host']
    db_port = db['port']
    db_user = db['username']
    db_passwd = db['password']

    if db_type.lower() == "ms_sqlserver":
        return []
    elif db_type.lower() == "mysql":
        mysql_obj = MySQL(server_name=db_host,
                          port=int(db_port),
                          user_name=db_user,
                          password=db_passwd,
                          db_name=db_name,
                          dict_cursor=True)
        for row in mysql_obj.execQuery(query_params[1]):
            job = JobHistoryModel()
            job.job_id = row['job_id']
            job.status = row['status']
            job.start_time = row['start_time']
            job.end_time = row['end_time']
            job.comments = row['comments']
            job.save()
        return ["Success"]
    else:
        return []

def get_list_of_tables(source_data):
    db = source_data['data']
    db_type = db['type']
    db_name = db['dbname']
    db_host = db['host']
    db_port = db['port']
    db_user = db['username']
    db_passwd = db['password']

    if db_type.lower() == "ms_sqlserver":
        mssql_obj = MSSQL(server_name=str(db_host) + ',' + str(db_port),
                          user_name=db_user,
                          password=db_passwd,
                          db_name=db_name)
        query = "SELECT TABLE_NAME FROM {0}.INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'".format(db_name)
        res = []
        for row in mssql_obj.execQuery(query):
            for col in row:
                res.append(col)
        return res
    elif db_type.lower() == "mysql":
        mysql_obj = MySQL(server_name=db_host,
                          port=int(db_port),
                          user_name=db_user,
                          password=db_passwd,
                          db_name=db_name)
        query = "SELECT table_name FROM information_schema.tables where table_schema = '{}';".format(db_name)
        res = []
        for row in mysql_obj.execQuery(query):
            for col in row:
                res.append(col)
        return res
    else:
        return "{} database in not configured yet".format(db_type)

def get_list_of_columns(source_data, table_name):
    db = source_data['data']
    db_type = db['type']
    db_name = db['dbname']
    db_host = db['host']
    db_port = db['port']
    db_user = db['username']
    db_passwd = db['password']

    if db_type.lower() == "ms_sqlserver":
        mssql_obj = MSSQL(server_name=str(db_host) + ',' + str(db_port),
                          user_name=db_user,
                          password=db_passwd,
                          db_name=db_name)
        query = "SELECT column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '{0}'".format(table_name)
        res = []
        for row in mssql_obj.execQuery(query):
            for col in row:
                res.append(col)
        return res
    elif db_type.lower() == "mysql":
        mysql_obj = MySQL(server_name=db_host,
                          port=int(db_port),
                          user_name=db_user,
                          password=db_passwd,
                          db_name=db_name)
        query = """
SELECT `COLUMN_NAME` 
FROM `INFORMATION_SCHEMA`.`COLUMNS` 
WHERE `TABLE_SCHEMA`='{0}' 
AND `TABLE_NAME`='{1}';
    """
        res = []
        for row in mysql_obj.execQuery(query.format(db_name, table_name)):
            for col in row:
                res.append(col)
        return res
    else:
        return "{} database in not configured yet".format(db_type)





