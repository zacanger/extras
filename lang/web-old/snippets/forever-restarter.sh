#!/usr/bin/env bash

# `forever` is really useful, but not so useful if a server goes _down_.
# here's one way to make sure it stays going after a reboot.
# note: this is NOT a recommended solution! it'd be _far_ better to write
# an init script (or similar, depending on system; upstart, systemd, etc.
# scripts would also be better). but, just in case:

if [ $(ps aux | grep $USER | grep node | grep -v grep | wc -l | tr -s "\n") -eq 0 ]
then
  export NODE_ENV=production
  export PATH=/usr/local/bin:$PATH
  forever start /var/www/index.js > /dev/null
fi

# then `crontab -e` and append the following:
# @reboot /path/to/this/script.sh >> cron.log 2>&1
# */1 * * * * /path/to/this/script.sh >> cron.log 2>&1

