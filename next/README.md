personal fork of CATWM.

* personal config
* implemented `_NET_SUPPORTED` and `_NET_ACTIVE_WINDOW` so xdotool can type stuff
* removed the quit function as I don't use it
* adjustable window border width
* adjustable gaps
* ability to float windows + keybinds to resize and move floating windows
* moving the mouse selects the window it's hovering
* ability to pin floating windows so they persist on all workspaces
* handle window manager hints to float.
* handle window manager size and aspect ratio hints.
* fixed various crashes by ignoring some benign xlib errors with deleted windows
* fixed broken logic that didn't correctly remove windows in some cases
* fixed bug where things that open in an existing window can cause it to get added multiple times.
  (for example, clicking a url with firefox already open).
* fixed buggy window geometry for some programs that have slow startup like firefox

![](pics/section-200827-0542-19.png)
![](pics/section-200827-0546-29.png)

CATWM
=====

     /\___/\
    ( o   o )  Made by cat...
    (  =^=  )
    (        )            ... for cat!
    (         )
    (          ))))))________________ Cute And Tiny Window Manager

Summary
-------

catwm is a very simple and lightweight tiling window manager.
I will try to stay under 1000 SLOC.

Status
------
 
 * 05.07.19 -> v0.3. Multiple desktops and correct some bugs
 * 30.06.10 -> v0.2. Back again \o/
 * 15.03.10 -> v0.2. The wm is functional -> I only use this wm!
 * 24.02.10 -> First release, v0.1. In this release 0.1, the wm is almost functional

Modes
-----

It allow the "normal" modes of tiling window managers:

    --------------
    |        |___|
    |        |___|
    | Master |___|
    |        |___|
    |        |___|
    --------------

and fullscreen mode

There is no horizontal stack because I never use it. But if someone is interested in, it's very easy to add.

Installation
------------

Need Xlib, then:
    $ vim config.h
    $ make
    # make install
    $ make clean

Bugs
----
 * No bugs for the moment ;) (I mean, no importants bugs ;)

Todo
----
 * Add multiple view ("desktop")
 * Switch to XCB

If you have some particular request, just send me an e-mail, and I will see for it!

