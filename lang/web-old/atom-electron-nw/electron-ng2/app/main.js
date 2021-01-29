'use strict'

const
  app           = require('app')
, BrowserWindow = require('browser-window')

let mainWindow    = null

// not going to bother with the darwin-specific bullshit, here

app.on('ready', () => {
  mainWindow = new BrowserWindow({width : 1200, height : 800})
  mainWindow.loadUrl('file://' + __dirname + '/index.html')
  mainWindow.on('closed', () => {
    mainWindow = null
  })
})

