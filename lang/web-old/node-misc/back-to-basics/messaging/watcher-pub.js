'use strict'

const
  fs       = require('fs')
, zmq      = require('zmq')
, pub      = zmq.socket('pub')
, filename = process.argv[2]

fs.watch(filename, () => {
  pub.send(JSON.stringify({
    type      : 'changed'
  , file      : filename
  , timestamp : Date.now()
  }))
})

pub.bind('tcp://*:5432', (err) => {
  if(err){
    console.error(err)
  }
  console.log('listening for zmq sub')
})
