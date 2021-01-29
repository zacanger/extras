// obviously this is in the browser... barest little bit just to show how we'd work with socket, if we use pubnub
(function(){

var pubnub_setup = {
  channel       : 'foo'
, publish_key   : 'demo'
, subscribe_key : 'demo'
}

var socket = io.connect('http://pubsub.pubnub.com', pubnub_setup)

socket.on('connect', function(){
  console.log('connected!')
  socket.send('message')
  socket.send('bar')
})

socket.on('message', function(message){
  console.log(message)
})

socket.on('disconnect', function(){
  console.log('whoops...')
})

socket.on('reconnect', function(){
  console.log('god, finally!')
})

})()
