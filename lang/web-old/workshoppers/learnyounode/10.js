'use strict'

const net = require('net')

const a = i => (i < 10 ? '0' : '') + i

const n = () => {
  let d = new Date()
  return d.getFullYear() + '-' +
    a(d.getMonth() + 1)  + '-' +
    a(d.getDate())       + ' ' +
    a(d.getHours())      + ':' +
    a(d.getMinutes())
}

net.createServer(socket => {
  socket.end(n() + '\n')
}).listen(parseInt(process.argv[2]))

