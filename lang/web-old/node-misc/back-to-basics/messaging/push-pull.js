'use strict'

const
  zmq    =  require('zmq')
, pusher = zmq.socket('push')
, puller = zmq.socket('pull')

// push socket
for(let i = 0; i < 100; i++){
  pusher.send(JSON.stringify({
    details : 'details'
  }))
}

// pull socket
puller.on('message', (data) => {
  let job = JSON.parse(data.toString())
})
