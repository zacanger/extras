'use strict'

const
  fs       = require('fs')
, net      = require('net')
, filename = process.argv[2]
, server   = net.createServer((connection) => {

  console.log('connected')
  connection.write('now watching ' + filename)

  let watcher = fs.watch(filename, () => {
    connection.write('file ' + filename + ' changed at ' + Date.now() + '\n')
  })

  connection.on('close', () => {
    console.log('disconnected')
    watcher.close()
  })
})

if(!filename){
  throw Error('no filename')
}

// use with nc
server.listen('/tmp/watcher.sock',() => {
  console.log('listening')
})

