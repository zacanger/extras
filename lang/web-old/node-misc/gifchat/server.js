var Hapi   = require('hapi')
  , fs     = require('fs')
  , server = new Hapi.Server()
	, port   = 3000

server.connection({port: port})

var io = require('socket.io')(server.listener)


io.on('connection', function(socket){
  socket.on('message', function(data){
    socket.broadcast.emit(data.room, {message: data.message})
  })
})

server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply){
    fs.readFile('./index.html', 'utf8', function(err, index){
      reply(index)
    })
  }
})

server.start()
