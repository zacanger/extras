'use strict'

const
  net    = require('net')
, port   = process.argv[2] || 5678
, client = net.connect({port : port})

client.on('data', (data) => {
  let message = JSON.parse(data)
  if(message.type === 'watching'){
    console.log('watching: ' + message.file)
  } else if(message.type === 'changed'){
    let date = new Date(message.timestamp)
    console.log('file ' + message.file + ' changed at ' + date)
  } else {
    throw Error('unknown: ' + message.type)
  }
})

