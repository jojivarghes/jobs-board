FROM ubuntu:16.04

RUN apt-get update && \
        apt-get install -y software-properties-common vim && \
        add-apt-repository ppa:jonathonf/python-3.6
RUN apt-get update -y

RUN apt-get install -y build-essential python3.6 python3.6-dev python3-pip python3.6-venv && \
        apt-get install -y git && \
        apt-get install -y curl && \
        apt-get install -y libmysqlclient-dev python-dev

# update pip
RUN python3.6 -m pip install pip --upgrade && \
        python3.6 -m pip install wheel

ENV PYTHONUNBUFFERED 1
RUN mkdir /jobDashboard
RUN mkdir /conf
RUN touch /conf/source.json
RUN chmod 777 /conf/source.json
RUN echo '[]' > /conf/source.json
WORKDIR /jobDashboard
COPY requirements.txt /jobDashboard/



RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
RUN curl https://packages.microsoft.com/config/ubuntu/16.04/prod.list > /etc/apt/sources.list.d/mssql-release.list
RUN apt-get install -y apt-transport-https && apt-get update
RUN ACCEPT_EULA=Y apt-get install -y msodbcsql
RUN apt-get install -y unixodbc-dev

RUN apt-get install -y locales \
    && echo "en_US.UTF-8 UTF-8" > /etc/locale.gen \
    && locale-gen


#RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
#RUN curl https://packages.microsoft.com/config/ubuntu/16.04/prod.list > /etc/apt/sources.list.d/mssql-release.list
#RUN apt-get install -y apt-transport-https && apt-get update && ACCEPT_EULA=Y apt-get install -y msodbcsql17
#RUN apt-get install -y unixodbc-dev
RUN pip install -r requirements.txt
COPY . /jobDashboard/
