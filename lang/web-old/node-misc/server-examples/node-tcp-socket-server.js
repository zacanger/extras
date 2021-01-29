'use strict'

const
  net    = require('net')
, port   = 8888
, server = net.createServer((socket) => {
  console.log('new connection from ' + socket.remoteAddress)
  socket.end('hello, world\n')
})

server.listen(port, 'localhost')

console.log('connect to http://localhost:' + port)
console.log('or curl that address')
console.log('or nc localhost ' + port + ' (or netcat the same)')
