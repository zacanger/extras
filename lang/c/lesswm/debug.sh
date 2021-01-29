#!/bin/sh

# put in xinitrc:
# exec lesswm > ~/.logs/less.log 2>&1
# in your xinitrc
flags="-g -fsanitize=address,undefined"
make clean &&
sudo make CFLAGS="$flags" LDADD="$flags -lX11" install
