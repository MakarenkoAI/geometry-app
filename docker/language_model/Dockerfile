FROM tensorflow/tensorflow:latest

RUN apt-get update && apt-get install -y python3 python3-pip && apt-get clean

WORKDIR /app

COPY ./requirements.txt /app/requirements.txt

RUN pip3 install --no-cache-dir --ignore-installed -r /app/requirements.txt

COPY ./ /app/

EXPOSE 5000

