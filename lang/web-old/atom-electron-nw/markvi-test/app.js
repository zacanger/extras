var app = require('app')
  , BrowserWindow = require('browser-window')
  , mainWindow = null // keep reference of window so it's not lost to gc!

app.on('window-all-closed', function(){
  if (process.platform != 'darwin') {
    app.quit()  // i guess, on os x, it's normal to
  	}						// keep a (graphical) process running after
})              // all its windows are closed...?

// electron is ready to create a window!
app.on('ready', function(){
  mainWindow = new BrowserWindow({
    width: 1600
 ,  height: 900
 ,  'min-width': 800
 ,  'min-height': 500
 ,  'accept-first-mouse': true
 ,  'title-bar-style': 'hidden'
  })

  mainWindow.loadURL('file://' + __dirname + '/index.html')
  // mainWindow.openDevTools()
  mainWindow.on('closed', function(){
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
})

