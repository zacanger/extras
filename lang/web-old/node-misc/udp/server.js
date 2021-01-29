'use strict'

const
  dgram  = require('dgram')
, port   = process.env.PORT || 44444
, host   = '127.0.0.1'
, server = dgram.createSocket('udp4')
// above, we could also have passed 'udp6' to use ipv6.

server.on('listening', () => {
  let address = server.address()
  console.log('server listening:', address.address, address.port)
})

server.on('message', (message, remote) => {
  console.log(remote.address, remote.port, message)
})

// host is optional, below. defaults to 0.0.0.0
server.bind(port, host)
