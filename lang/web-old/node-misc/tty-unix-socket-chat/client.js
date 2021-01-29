#!/usr/local/bin/node

const
  util     = require('util')
, net      = require('net')
, tty      = require('tty')
, sockPath = '/tmp/ttychat.sock'
, socket   = new net.Socket({type : 'unix'})
, out      = process.stdout
, sin      = process.stdin

socket.on('data', data => out.write(data))

socket.on('connect', data => {
  sin.resume()
  sin.setEncoding('utf8')
  sin.pipe(socket)
})

socket.on('error', data => out.write('Error', data))

socket.on('end', data => {
  out.write('Disconnected')
  process.exit()
})

socket.connect(sockPath, () => out.write('Connected'))
