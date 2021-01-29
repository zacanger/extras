var httpd = require('http').createServer(serverHandler)
  , io    = require('socket.io').listen(httpd)
  , fs    = require('fs')
  , port  = 9090

httpd.listen(port)

function serverHandler(req, res){
  fs.readFile(__dirname + '/index.html', function(err, data){
    if(err){
      res.writeHead(500)
      res.end('server error', err)
    } else {
      res.writeHead(200)
      res.end(data)
    }
  })
}

io.sockets.on('connection', function(socket){
  socket.on('clientResponse', function(response){
    var reply = socket.id + ': ' + response
    socket.broadcast.emit('serverResponse', reply)
  })
  var welcome = socket.id + ' has joined; welcome.'
  socket.broadcast.emit('serverResponse', welcome)
})

