const
  electron      = require('electron')
, app           = electron.app
, BrowserWindow = electron.BrowserWindow

let mainWindow

const createWindow = () => {
  mainWindow = new BrowserWindow({width : 800, height : 600})
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  // mainWindow.webContents.openDevTools()
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

// os x keeps apps open even when all windows closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => { // on os x make a new window on dock icon click
if (mainWindow === null) {
    createWindow()
  }
})
