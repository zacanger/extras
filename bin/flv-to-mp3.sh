#!/bin/sh

ffmpeg -i $1.flv -f mp3 -ar 44100 -ac 2 -ab 192k -y -acodec copy $1.mp3
