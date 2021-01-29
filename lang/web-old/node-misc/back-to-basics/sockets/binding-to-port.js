'use strict'

const
  net    = require('net')
, port   = 5678
, server = net.createServer((connection) => {
  // do stuff
})
server.listen(port)

