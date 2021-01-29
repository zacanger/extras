'use strict'

const
  events    = require('events')
, util      = require('util')
, LDJClient = (stream) => {
  events.EventEmitter.call(this)
  let
    self   = this
  , buffer = ''
  stream.on('data', (data) => {
    let boundary = buffer.indexOf('\n')
    while(boundary !== -1){
      let input = buffer.substr(0, boundary)
      buffer = buffer.substr(boundary + 1)
      self.emit('message', JSON.parse(input))
      boundary = buffer.indexOf('\n')
    }
  })
}

util.inherits(LDJClient, events.EventEmitter)

exports.LDJClient = LDJClient
exports.connect   = (stream) => {
  return new LDJClient(stream)
}

