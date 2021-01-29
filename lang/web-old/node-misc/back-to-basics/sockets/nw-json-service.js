'use strict'

const
  fs       = require('fs')
, net      = require('net')
, filename = process.argv[2]
, server   = net.createServer((connection) => {

  console.log('connected')
  connection.write(JSON.stringify({
    type : 'watching'
  , file : filename
  }) + '\n')

  let watcher = fs.watch(filename, () => {
    connection.write(JSON.stringify({
      type     : 'changed'
    , file     : filename
    , timestamp: Date.now()
    }) + '\n')
  })

  connection.on('close', () => {
    console.log('disconnected')
    watcher.close()
  })
})

if(!filename){
  throw Error('no filename')
}

// use with nc or telnet
server.listen(5678, () => {
  console.log('listening')
})

