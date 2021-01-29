I wound up ceasing work on both `markvi` and this app. If you need a desktop
Markdown editor, I can very highly recomment [Haroopad](http://pad.haroopress.com/).

I originally tried this withi `bat`, because (vanilla) electron was giving me some
trouble. Photon, then, gave me different sorts of trouble... and it turned out
that all along, I really just needed `node-integration:false` in the file where
we're building the Electron window. Hmph.

Assuming you have `bat` globally installed:

`bat --title markvi --size 1200x800 --debug -d ./index.html`

(or whatever).

