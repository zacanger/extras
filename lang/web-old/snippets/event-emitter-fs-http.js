'use strict'

const
  http         = require('http')
, fs           = require('fs')
, EventEmitter = require('events').EventEmitter
, ee           = new EventEmitter()
, server       = http.createServer()
, port         = process.argv[2] || process.env.PORT || 3000
, file         = process.argv[3] || null

server.listen(port)
console.log('server on ' + port)

server.on('request', (req, res) => {
  fs.readFile(file, 'utf-8', (err, data) => {
    if(err){
      ee.emit('error', res, err)
    } else {
      ee.emit('data', res, data)
    }
  })
})

ee.emit('error', (res, err) => {
  res.end(JSON.stringify(err))
})

ee.on('data', (res, data) => {
  res.send(data)
})
