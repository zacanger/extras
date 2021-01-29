'use strict'

const
  net    = require('net')
, host   = process.argv[2] || '127.0.0.1'
, port   = process.argv[3] || 6666
, client = new net.Socket()

client.connect(port, host, () => {
  console.log('connected to ' + host + ':' + port)
  client.write('ping! ping! ping! hi!')
})

client.on('data', (data) => {
  console.log('data: ' + data)
  client.destroy()
})

client.on('close', () => {
  console.log('closed')
})

