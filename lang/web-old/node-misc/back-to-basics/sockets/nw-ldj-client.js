'use strict'

const
  net       = require('net')
, ldj       = require('./ldj')
, netClient = net.connect({port : 8888})
, ldjClient = ldj.connect(netClient)

ldjClient.on('message', (message) => {
  if(message.type === 'watching'){
    console.log('now watching ' + message.file)
  } else if(message.type === 'changed'){
    console.log('file ' + message.file + ' changed at ' + new Date(message.timestamp))
  } else {
    throw Error('Message type: ' + message.type)
  }
})

