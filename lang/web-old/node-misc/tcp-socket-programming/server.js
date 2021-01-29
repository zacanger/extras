'use strict'

const
  net   = require('net')
, host  = process.argv[2] || '127.0.0.1'
, port  = process.argv[3] || 6666

net.createServer(sock => {
  console.log('connected: ' + sock.remoteAddress + ':' + sock.remotePort)
  sock.on('data', (data) => {
    console.log('data: ' + sock.remoteAddress + ': ' + data)
    sock.write(data)
  })
  sock.on('close', (data) => {
    console.log('closed: ' + sock.remoteAddress + ':' + sock.remotePort)
  })
}).listen(port, host, () => {
  console.log('listening on ' + host + ':' + port)
})

