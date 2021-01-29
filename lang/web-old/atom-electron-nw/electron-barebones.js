// npm i -S electron-prebuilt
// have an index.html in hurr
// preferGlobal: true in the manifest
// 'node-integration': false
// (down below, if needed)
// that's about all

var app           = require('app')
  , BrowserWindow = require('browser-window')

require('crash-reporter').start()

var mainWindow = null

app.on('window-all-closed', function(){
  if(process.platform != 'darwin'){
    app.quit() // osx holds processes open
  }            // after all windows are closed...
})

app.on('ready', function(){
  mainWindow = new BrowserWindow({
    width             : 800
  , height            : 800
  , 'title-bar-style' : 'hidden'
  })
  mainWindow.loadUrl('file://' + __dirname + '/index.html')
  mainWindow.on('closed', function(){
    mainWindow = null // destroy from array if stored multiple windows
  })
})
