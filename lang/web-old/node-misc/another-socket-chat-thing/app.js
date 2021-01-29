var app  = require('express')()
  , http = require('http').Server(app)
  , io   = require('socket.io')(http)
  , port = 3000

app.get('/', function(req, res){res.sendFile(__dirname + '/index.html')})

io.on('connection', function(socket){
  console.log('a user connected')
  socket.on('disconnect', function(){
    console.log('user disconnect')
  })
  socket.on('chat message', function(msg){
    console.log('message: ' + msg)
    io.emit('chat message', msg)
  })
})

http.listen(port, function(){
  console.log('go to ', port)
})
