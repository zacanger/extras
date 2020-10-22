#!/usr/bin/env bash
set -e

# https://github.com/tomoki/i3-config/blob/master/move-cursor-window-center.sh
# Figure out how to do the same thing in C

HERE=$(xdotool getwindowfocus)

ULX=$(xwininfo -id "$HERE" | grep "  Absolute upper-left X:" | awk '{print $4}')
ULY=$(xwininfo -id "$HERE" | grep "  Absolute upper-left Y:" | awk '{print $4}')

if [ "$ULX" != "-1" ] || [ "$ULY" != "-1" ]; then
  eval $(xdotool getwindowgeometry --shell "$HERE")

  NX=$(expr "$WIDTH" / 2)
  NY=$(expr "$HEIGHT" / 2)

  xdotool mousemove --window "$WINDOW" "$NX" "$NY"
fi
