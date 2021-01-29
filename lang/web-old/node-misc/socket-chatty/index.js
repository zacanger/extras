var path    = require('path')
  , app     = require('express')()
  , express = require('express')
  , http    = require('http').Server(app)
  , io      = require('socket.io')(http)
  , port    = 9999
  , allMessages = []

app.use(express.static('public'))

io.on('connection', function(socket){
  console.log('user connected')

  socket.emit('get-all-messages', allMessages)

  socket.on('new-message', function(message){
    console.log('new message: ', message)
    allMessages.push(message)
    socket.broadcast.emit('message-update', message)
  })

  socket.on('disconnect', function(socket){
    console.log('user disconnected')
  })

})

http.listen(port, function(){
  console.log('listening on ' + port)
})
