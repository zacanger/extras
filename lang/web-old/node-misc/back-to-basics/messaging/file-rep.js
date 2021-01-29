'use strict'

const
  fs  = require('fs')
, zmq = require('zmq')
, rep = zmq.socket('rep')

rep.on('message', (data) => {
  let req = JSON.parse(data)
  console.log('request recieved, for ' + req.path)

  fs.readFile(req.path, (err, content) => {
    console.log('sending request content')
    rep.send(JSON.stringify({
      content   : content.toString()
    , timestamp : Date.now()
    , pid       : process.pid
    }))
  })
})

rep.bind('tcp://127.0.0.1:5433', (err) => {
  console.log('listening for zmq req')
})

process.on('SIGINT', () => {
  console.log('shutting off nao')
  rep.close()
})
