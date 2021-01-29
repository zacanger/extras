'use strict'

const
  Routes            = require('./routes.jsx')
, ReactEngineClient = require('react-engine/lib/client')
, ActionCreator     = require('./flex/action-creator')

const options = {
  routes : Routes
, viewResolver(viewName){
    return require('./views/' + viewName)
  }
}

document.addEventListener('DOMContentLoaded', function onLoad() {
  ReactEngineClient.boot(options)
  let socket = io.connect(location.origin)
  socket.on('status', data => {
    ActionCreator.serviceStatusUpdate(data)
  })
})

