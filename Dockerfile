# Get the base image
FROM ubuntu:16.04

# Install and python3.6 and basic utilities
RUN apt-get update && \
        apt-get install -y software-properties-common vim git curl gcc && \
        add-apt-repository ppa:jonathonf/python-3.6

# Install python dev packages
RUN apt-get update && apt-get install -y build-essential python3.6-dev python3-pip

# Install mysql client
RUN apt-get install -y libmysqlclient-dev

# Install Pymysql and Pyodbc
RUN python3.6 -m pip install pip --upgrade
RUN python3.6 -m pip install PyMySQL

# Install Microsoft SQLCMD and Unix ODBC
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
RUN curl https://packages.microsoft.com/config/ubuntu/16.04/prod.list | tee /etc/apt/sources.list.d/msprod.list
RUN apt-get install -y apt-transport-https && apt-get update
RUN ACCEPT_EULA=Y apt-get install -y mssql-tools unixodbc-dev

# Copy the codebase and install requirements
ENV PYTHONUNBUFFERED 1
RUN mkdir /jobDashboard
WORKDIR /jobDashboard
COPY . /jobDashboard/
RUN pip install -r requirements.txt