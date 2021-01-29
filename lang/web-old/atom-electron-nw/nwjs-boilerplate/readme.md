using nw.js, this is all super easy.

all of the things that you work with are in your package.json

it makes sense to have a second package.json just for your desktop side,
this way you can install dependencies for things completely seperately,
manage build scripts from the one for nw.js, etc.

nw.js used to be called 'node-webkit.' webkit is the rendering engine that
basically powers most of everything, these days. it was originally KHTML,
from a unix browswer called konkeror. that was forked by apple, to create webkit
for safari way back when. google forked that a few years ago to make blink, which
runs is what powers chromium/chrome, opera, microsoft's new browser, etc. that all
works out pretty well, since node itself is chrome's V8 javascript engine.

basically this means nw.js is a combination of chrome's javascript engine
and chrome's rendering engine, kinda. it's basically chrome, a full-on browser,
at this point, just optimized for building software, rather than browsing websites.

in the package.json:
name, version, description, author, bugs, url, repository, etc: those all
are basically the same as in any other app.

"preferGlobal": set to true if you want NPM to give a warning when people
install it locally, so they know it's supposed to be a global app.

"bin": the script to run when someone types "awesomeappyo" or whatever in a terminal.

the "start" script is just a little tiny script that launches nw-builder.

"release" should build desktop binaries (installable apps).

"chromium-args": nw.js can take any of the flags that chromium can take
on the command-line. there are hundreds of those. the one i have in there
is just for remote debugging (basically, opening devtools in a different browser).

the "window" field is where all the nw.js stuff really happens.

"title" will show up on the title bar/task bar.

"icon" is for the app icon.

"toolbar" and "frame" should be pretty obvious.

"single-instance" will keep people from running more than one of the app
at once, if it's set to false.

"position" can be "center" (of the screen), or "mouse" (as in, appears wherever
the mouse is on the screen).

"dom_storage_quota" is extended local storage, basically.

and that's really about it. the number one most important bit is the "main".
that's what tells nw.js where to look. that can be html or any URL.

...if you thought it was difficult, you were wrong.

this uses "nw-builder" to run and build the app. that's the official tool
from nw.js. there are some others, like nwjs or nw, but this one seemed
to work the best overall for me.

the flags nwbuild takes:
-r : for run (rather than build)
-p : list of platforms (osx64,osx32,win64,win32,linux64,linux32)
-f : force download (seems to redownload every time anyway :/)
--quiet : turns off logging
-o : path to the build directory (./build or whatever)

and then you have to give nwbuild a path. so for example
`nwbuild -p win64,linux64 -f . -o ./releases`

:) that's basically all!

to make this all work nicely with your app, you could have a little script do things.
there's an example here (scriptyscript), which runs makes a db directory, runs mongo,
sends it to the background, runs your server, sends _that_ to the background, then
starts nw on your app.

that script assumes you have your whole project in a subdirectory here called 'app'

