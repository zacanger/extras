'use strict'

const
  dgram   = require('dgram')
, port    = process.env.PORT || 44444
, host    = '127.0.0.1'
, client  = dgram.createSocket('udp4')
, message = new Buffer('this is a message')
// must be buffer, not string or integer or whatever

// '0' below is the offset in the buffer where the packet starts
// message.length is amount of bytes to send
client.send(message, 0, message.length, port, host, (err, bytes) => {
  if(err){
    throw err
  }
  console.log('message sent', host, port)
  client.close()
})
