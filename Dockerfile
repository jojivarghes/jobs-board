FROM ubuntu:16.04

RUN apt-get update && \
        apt-get install -y software-properties-common vim git curl gcc && \
        add-apt-repository ppa:jonathonf/python-3.6

RUN apt-get update && apt-get install -y build-essential python3.6-dev python3-pip

RUN apt-get install -y libmysqlclient-dev


# update pip
RUN python3.6 -m pip install pip --upgrade
RUN python3.6 -m pip install PyMySQL

ENV PYTHONUNBUFFERED 1
RUN mkdir /jobDashboard
RUN mkdir /conf
RUN touch /conf/source.json
RUN chmod 777 /conf/source.json
RUN echo '[]' > /conf/source.json
WORKDIR /jobDashboard
COPY requirements.txt /jobDashboard/
RUN pip install -r requirements.txt
COPY . /jobDashboard/

#RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
#RUN curl https://packages.microsoft.com/config/ubuntu/16.04/prod.list > /etc/apt/sources.list.d/mssql-release.list
#RUN apt-get install -y apt-transport-https && apt-get update
#RUN ACCEPT_EULA=Y apt-get install -y msodbcsql
#RUN apt-get install -y unixodbc-dev
#
#RUN apt-get install -y locales \
#    && echo "en_US.UTF-8 UTF-8" > /etc/locale.gen \
#    && locale-gen
#ADD odbcinst.ini /etc/odbcinst.ini

#RUN apt-get update
#RUN apt-get install -y gcc
#RUN apt-get install -y tdsodbc unixodbc-dev
#RUN apt install unixodbc-bin -y
#RUN apt-get clean -y
#
#RUN echo "[FreeTDS] Driver\n\
#Description = FreeTDS unixODBC Driver\n\
#Driver = /usr/lib/x86_64-linux-gnu/odbc/libtdsodbc.so\n\
#Setup = /usr/lib/x86_64-linux-gnu/odbc/libtdsS.so" >> /etc/odbcinst.ini

#RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
#RUN curl https://packages.microsoft.com/config/ubuntu/16.04/prod.list > /etc/apt/sources.list.d/mssql-release.list
#RUN apt-get install -y apt-transport-https && apt-get update && ACCEPT_EULA=Y apt-get install -y msodbcsql17
#RUN apt-get install -y unixodbc-dev

