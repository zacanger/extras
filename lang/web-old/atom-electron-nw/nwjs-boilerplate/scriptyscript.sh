#!/usr/bin/env bash

mkdir db ; mongod --dbpath=db/ --fork --nojournal --syslog & node app/server & ; node index &

