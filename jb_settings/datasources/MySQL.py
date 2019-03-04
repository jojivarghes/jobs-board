# import pyodbc
# import pymysql
#
#
#
# def test():
#     cndBase = pyodbc.connect(
#         "DRIVER={MySQL ODBC 8.0.11 Driver}; SERVER=127.0.0.1; PORT=3307;DATABASE=TestDB; UID=newuser; PASSWORD=password;")
#     ptdBase = cndBase.cursor()
#
#     query_str = 'SELECT* FROM table_1;'
#     rows = ptdBase.execute(query_str)
#
#     for r in rows:
#         print("--------------------")
#         print(list(r))
#
#
# def test2():
#     conn = pymysql.connect(host="localhost", user="newuser", passwd="password", db="TestDB", port=3307)
#     with conn.cursor() as cursor:
#         sql = "select * from table_1;"
#         cursor.execute(sql)
#     print("done --------------")
#
#
# def test3():
#     conn = pyodbc.connect('Driver={FreeTDS};'
#                             'Server=172.26.0.2,1433;'
#                             'Database=cooldb;'
#                             'TDS_VERSION=4.2;'
#                             'UID=SA;'
#                             'PWD=reallyStrongPwd123')
#     cursor = conn.cursor()
#     cursor.execute("select * from Inventory WHERE quantity > 152")
#     results = ()
#     for row in cursor:
#         print('row = %r' % (row,))
#         results.__add__((row,))
#     conn.close()
#     return results