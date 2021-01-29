# lesswm

Less is not more. Just enough window management for X11.

[![Support with PayPal](https://img.shields.io/badge/paypal-donate-yellow.png)](https://paypal.me/zacanger) [![Patreon](https://img.shields.io/badge/patreon-donate-yellow.svg)](https://www.patreon.com/zacanger) [![ko-fi](https://img.shields.io/badge/donate-KoFi-yellow.svg)](https://ko-fi.com/U7U2110VB)

----

## Installation and Usage

* `git clone git@github.com:zacanger/lesswm.git`
* `cd lesswm`
* `vi config.h` to configure how you like it
* `make run` to run in Xephyr
* `make stop` to stop running in Xephyr
* `make test` to run some basic scans (requires `clang-tools` and `cppcheck`)
* `make install` to install
  lesswm in Xephyr in lesswm...)
* `echo exec lesswm >> ~/.xinitrc` and `startx` to use as a primary WM

Don't skip editing the config, otherwise nothing will work
in ways you'd expect, most likely.

## Status

It works fine, I'm using it right now. See the TODO section.

## What does it look like?

Like a rectangle with 0 or more other rectangles in it,
optionally with colored borders. It's really up to you.

![screenshot](/screenshot.png?raw=true)

### TODO

* When two windows want to float on the same desktop, it's a bad situation
* Indicate which desktop you're on
* Move mouse cursor when focus changes by keyboard
* Rewrite in a higher level language?

## Credits

lesswm includes code, ideas, and commits from some other projects, namely:

* <https://github.com/DebianJoe/hcwm>
* <https://github.com/pyknite/catwm>
* <https://github.com/Francesco149/catwm>
* <https://dwm.suckless.org/>

These are all under the MIT/X license (see [LICENSE](./LICENSE))

## See Also

[wmjs](https://github.com/zacanger/wmjs), an earlier tiling window manager
experiment in Node which I abandoned.
