-- create database TestDB;

CREATE USER 'newportaluser'@'%' IDENTIFIED BY 'chang1t';
GRANT ALL PRIVILEGES ON *.* TO 'newportaluser'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

use TestDB;

CREATE TABLE table_1
(
session_id INTEGER ,
start_time TIMESTAMP,
end_time TIMESTAMP,
status varchar(32),
user_id INTEGER
);

CREATE TABLE table_2
(
session_id INTEGER,
comments varchar(256)
);

insert into table_1 values(12345, '2018-12-01 00:00:01', '2018-12-01 00:10:59', 'Success',11);
insert into table_1 values(12346, '2018-12-03 00:11:01', '2011-12-03 00:21:59', 'Failed',12);
insert into table_1 values(12347, '2018-12-07 00:22:01', '2011-12-07 00:32:59', 'Running',13);
insert into table_1 values(12348, '2018-12-10 00:33:01', '2018-12-10 00:44:59', 'Success',14);
insert into table_1 values(12349, '2018-12-13 00:44:01', '2011-12-13 00:55:59', 'Failed',15);
insert into table_1 values(12350, '2018-12-17 00:55:01', '2011-12-17 01:00:59', 'Running',16);
insert into table_1 values(12351, '2018-12-20 00:00:01', '2018-12-20 01:10:59', 'Success',17);
insert into table_1 values(12352, '2018-12-21 00:11:01', '2011-12-21 01:21:59', 'Success',18);
insert into table_1 values(12353, '2018-12-23 00:22:01', '2011-12-23 01:32:59', 'Failed',19);

insert into table_2 values(12345, 'Deployed, and Ran, Finally succeded');
insert into table_2 values(12346, 'Deployed, and Ran, but failed');
insert into table_2 values(12347, 'Deployed, and Running');
insert into table_2 values(12348, 'Deployed, and Ran, Finally succeded');
insert into table_2 values(12349, 'Deployed, and Ran, but failed');
insert into table_2 values(12350, 'Deployed, and Running');
insert into table_2 values(12351, 'Deployed, and Ran, Finally succeded');
insert into table_2 values(12352, 'Deployed, and Ran, Finally succeded');
insert into table_2 values(12353, 'Deployed, and Ran, but failed');
