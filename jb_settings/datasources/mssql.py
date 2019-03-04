# import pyodbc
#
# class MSSQL(object):
#     def __init__(self, serverName, userName, password, dbName):
#         self.serverName = serverName
#         self.userName = userName
#         self.password = password
#         self.dbName = dbName
#
#     def _get_pyodbc_connect(self):
#         try:
#             conn = pyodbc.connect(driver='{ODBC Driver 13 for SQL Server}', host=self.serverName, database=self.dbName,
#                                   user=self.userName, password=self.password)
#             return conn
#         except Exception as e:
#             print("Unable to get the connection. Reason:\n" + str(e))
#             raise e
#
#     def execQuery(self, query):
#         try:
#             conn = self._get_pyodbc_connect()
#             cursor = conn.cursor()
#             cursor.execute(query)
#             results = ()
#             for row in cursor:
#                 print('row = %r' % (row,))
#                 results.__add__((row,))
#             conn.close()
#             return results
#         except Exception as e:
#             print("Unable to execute query. Reason: \n" + str(e))
#             raise e
