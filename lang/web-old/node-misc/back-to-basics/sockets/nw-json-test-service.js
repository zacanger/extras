'use strict'

const
  net    = require('net')
, port   = 5678
, server = net.createServer((connection) => {
  console.log('connected')
  connection.write('{"type":"changed","file":"targ')

  let timer = setTimeout(() => {
    connection.write('et.md","timestamp":1234567890}' + '\n')
    connection.end()
  }, 1000)
  connection.on('end', () => {
    clearTimeout(timer)
    console.log('disconnected')
  })
})
server.listen(port, () => {
  console.log('test listening')
})

