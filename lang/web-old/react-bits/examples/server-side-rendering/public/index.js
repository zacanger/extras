'use strict'

const
  Routes = require('./routes')
, Client = require('react-engine/lib/client')
require('./views/**/*.jsx', {glob : true})

const options = {
  routes : Routes
, viewResolver(viewName){
    return require('./views/' + viewName)
  }
}

document.addEventListener('DOMCOntentLoaded', function onLoad(){
  console.log('client doing stuff')
  Client.boot(options)
})

