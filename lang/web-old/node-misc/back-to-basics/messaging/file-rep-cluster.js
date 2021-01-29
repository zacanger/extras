'use strict'

const
  cluster = require('cluster')
, fs      = require('fs')
, zmq     = require('zmq')

if(cluster.isMaster){

  let
    router = zmq.socket('router').bind('tcp://127.0.0.1:5433')
  , dealer = zmq.socket('dealer').bind('ipc://file-dealer.ipc')

  router.on('message', () => {
    let frames = Array.prototype.slice.call(arguments)
    dealer.send(frames)
  })

  dealer.on('message', () => {
    let frames = Array.prototype.slice.call(arguments)
    router.send(frames)
  })

  cluster.on('online', (worker) => {
    console.log('worker ' + worker.process.pid + ' online')
  })

  for(let i = 0; i < 3; i++){
    cluster.fork()
  }
} else {
  let rep = zmq.socket('rep').connect('ipc://file-dealer.ipc')

  rep.on('message', (data) => {
    let req = JSON.parse(data)
    console.log(process.pid + ' received request for ' + req.path)
    fs.readFile(req.path, (err, data) => {
      console.log(process.pid + ' sending response')
      rep.send(JSON.stringify({
        pid       : process.pid
      , data      : data.toString()
      , timestamp : Date.now()
      }))
    })
  })
}

