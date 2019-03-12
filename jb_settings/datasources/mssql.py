import pyodbc

class MSSQL(object):
    def __init__(self, server_name, user_name, password, db_name):
        self.server_name = server_name
        self.user_name = user_name
        self.password = password
        self.db_name = db_name

    def _get_pyodbc_connect(self):
        try:
            conn = pyodbc.connect(driver='{ODBC Driver 17 for SQL Server}',
                                  host=self.server_name,
                                  database=self.db_name,
                                  user=self.user_name,
                                  password=self.password)
            return conn
        except Exception as e:
            print("Unable to get the connection. Reason:\n" + str(e))
            raise e

    def execQuery(self, query):
        try:
            conn = self._get_pyodbc_connect()
            cursor = conn.cursor()
            cursor.execute(query)
            results = []
            for row in cursor:
                results.append(list(row))
            conn.close()
            return results
        except Exception as e:
            print("Unable to execute query. Reason: \n" + str(e))
            raise e

    def exec_mapping_query(self, query):
        try:
            conn = self._get_pyodbc_connect()
            cursor = conn.cursor()
            cursor.execute(query)
            columns = [column[0] for column in cursor.description]
            results = []
            for row in cursor.fetchall():
                results.append(dict(zip(columns, row)))
            return results
        except Exception as e:
            print("Unable to execute query. Reason: \n" + str(e))
            raise e
