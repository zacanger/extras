/* jshint evil: true */

var jsdom   = require('jsdom')
  , fs      = require('fs')
  , Firepad = {}

// HACK: Make Firepad expose FirebaseAdapter
Firepad.FirepadSource = fs.readFileSync(__dirname+'/firepad.js')
  .toString()
  .replace('return firepad.Firepad;', 'firepad.Firepad.FirebaseAdapter = firepad.FirebaseAdapter; return firepad.Firepad;')
  .replace('= global.CodeMirror', '= window.CodeMirror || global.CodeMirror')

Firepad.CodeMirrorSource = fs.readFileSync(__dirname+'/codemirror.js')

// Node Firepad Proxy Loader
Firepad.load = function(ref, callback) {

 jsdom.env('<head></head><body><div id="firepad"></div></body>', function (errors, window) {

  // load codemirror
  var document  = document  || window.document
    , navigator = navigator || { userAgent:'', platform:'' }
  eval(Firepad.CodeMirrorSource+'')
  var CodeMirror = window.CodeMirror

  // load firepad
   eval(Firepad.FirepadSource+'')
   // HACK: disable cursor
  Firepad.FirebaseAdapter.prototype.sendCursor = function(){}
  Firepad.FirebaseAdapter.prototype.setColor   = function(){}

  // launch
  var codeMirror_ = CodeMirror(window.document.getElementById('firepad'),
    {lineWrapping: true}, window)

   var firepad_ = Firepad.fromCodeMirror(ref, codeMirror_,
    {richTextShortcuts: true, richTextToolbar: true})

   if (callback) callback(firepad_, window, errors, document)
 })
}

module.exports = Firepad

// in another file
var FirepadManager = require(__dirname+’/node-firepad’)

FirepadManager.load(firebaseRef, function(firepad, window, errors, document) {
  // The callback is called as soon as the Firepad instance is created.
  // Hence, you can perform stuff like adding your entities support at this point...
  addEntitiesToFirepad(firepad, document)
  firepad.on('ready', function() {
    if (callback) callback(firepad, window, errors, document)
  })
})

