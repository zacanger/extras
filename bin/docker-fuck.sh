#!/bin/sh

docker kill `docker ps -q`
docker rm -f `docker ps -aq`
docker rmi -f `docker images -aq`
docker network rm -f `docker network ls -q`
docker volume rm -f `docker volume ls -q`
