'use strict'

const
  mqtt   = require('mqtt')
, client = mqtt.connect('mqtt://broker.hivemq.com')

let
  clientState = ''
, connected   = false

client.on('connect', () => {
  client.subscribe('client/connected')
  client.subscribe('client/state')
})

// in mqtt, they call channels 'topics'. why? i don't know. because they do.

// client.on('message', (topic, message) => {
//   if(topic === 'client/connected'){
//     connected = (message.toString() === 'true')
//   }
// })

client.on('message', (topic, message) => {
  switch(topic){
    case 'client/connected':
      return handleConnected(message)
    case 'client/state':
      return handleState(message)
  }
  console.log('no handler prepared for %s', topic)
})

function handleConnected(message){
  console.log('connected status %s', message)
  connected = (message.toString() === 'true')
}

function handleState(message){
  clientState = message
  console.log('state is now %s', message)
}

function one(){
  if(connected && clientState !== 'one'){
    client.publish('client/one', 'true')
  }
}

function two(){
  if(connected && clientState !== 'two'){
    client.publish('client/two', 'true')
  }
}
// simulating the events that we'll eventually be triggering from the webapp
setTimeout(() => {
  console.log('one')
  one()
}, 10000)
setTimeout(() => {
  console.log('two')
  two()
}, 20000)

