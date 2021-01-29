'use strict'

const
  zmq = require('zmq')
, sub = zmq.socket('sub')

sub.subscribe('')

sub.on('message', (data) => {
  let
    message = JSON.parse(data)
  , date    = new Date(message.timestamp)
  console.log('file ' + message.file + ' changed at ' + date)
})

sub.connect('tcp://localhost:5432')
