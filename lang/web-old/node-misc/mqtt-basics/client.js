'use strict'

const
  mqtt   = require('mqtt')
, client = mqtt.connect('mqtt://broker.hivemq.com')

// possible states: one, two, three, four
// one and two are opposites of each other
// three and four are intermediate states

let state = 'closed'

client.on('connect', () => {
  client.subscribe('client/one')
  client.subscribe('client/two')
  client.publish('client/connected', 'true')
  sendStateUpdate()
})

client.on('message', (topic, message) => {
  console.log('received %s %s', topic, message)
  switch(topic){
    case 'client/one':
      return handleOne(message)
    case 'client/two':
      return handleTwo(message)
  }
})

client.on('message', (topic, message) => {
  console.log('received %s %s', topic, message)
})

function sendStateUpdate(){
  console.log('sending state %s', state)
  client.publish('client/state', state)
}


function handleOne(message){
  if(state !== 'one' && state !== 'three'){
    console.log('one is happening!')
    state = 'three'
    sendStateUpdate()
    // simulation; irl we'd listen to the device for this
    setTimeout(() => {
      state = 'one'
      sendStateUpdate()
    }, 10000)
  }
}

function handleTwo(message){
  if(state !== 'two' && state !== 'four'){
    state = 'four'
    sendStateUpdate()
    setTimeout(() => {
      state = 'two'
      sendStateUpdate()
    }, 10000)
  }
}

// handle disconnect
function handleExit(options, err){
  if(err){
    console.trace(err.stack)
  }
  if(options.cleanup){
    client.publish('client/connected', 'false')
  }
  if(options.exit){
    process.exit()
  }
}

process.on('exit', handleExit.bind(null, {cleanup : true}))
process.on('SIGINT', handleExit.bind(null, {exit : true})) // CTRL+C
process.on('uncaughtException', handleExit.bind(null, {exit : true}))

