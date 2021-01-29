const { app, BrowserWindow } = require('electron')

const fileUri = `file://${__dirname}/index.html`

app.on('window-all-closed', function () {
  app.quit()
})

app.on('ready', function () {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
    },
  })

  mainWindow.setMenuBarVisibility(false)
  mainWindow.loadURL(fileUri)
})
