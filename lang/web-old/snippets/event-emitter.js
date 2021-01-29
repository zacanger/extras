'use strict'

const
  EventEmitter = require('events').EventEmitter
, ee           = new EventEmitter()

ee.on('someEvent', (data) => {
  console.log(data)
})
console.log('this will be logged right away')
ee.emit('someEvent', 'hey! this is that \'someEvent!\'')
