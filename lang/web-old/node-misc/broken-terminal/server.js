var server   = {}
  , http     = require('http')
  , express  = require('express')
  , io       = require('socket.io')
  , pty      = require('pty.js')
  , terminal = require('term.js')
  , socket
  , term
  , buff = []

server.run = function(options){
  // create shell process
  term = pty.fork(
    process.env.SHELL || 'sh',
    [],
    {
      name: require('fs').existsSync('/usr/share/terminfo/x/xterm-256color')
        ? 'xterm-256color'
        : 'xterm',
      cols: 80,
      rows: 24,
      cwd: process.env.HOME
    }
  )

  // store term's output into buffer or emit through socket
  term.on('data', function(data){
    return !socket ? buff.push(data) : socket.emit('data', data)
  })

  console.log('Created shell with pty master/slave pair (master: %d, pid: %d)', term.fd, term.pid)

  var app = express()
    , server = http.createServer(app)

  // let term.js handle req/res
  app.use(terminal.middleware())

  // let server listen on the port
  options = options || {}
  server.listen(options.port || 9090)

  // let socket.io handle sockets
  io = io.listen(server, {log: false})

  io.sockets.on('connection', function(s){
    // when connect, store the socket
    socket = s

    // handle incoming data (client -> server)
    socket.on('data', function(data){
      term.write(data)
    })

    // handle connection lost
    socket.on('disconnect', function(){
      socket = null
    })

    // send buffer data to client
    while (buff.length) {
      socket.emit('data', buff.shift())
    }
  })
}

server.run({port: 9090})

// export server object
module.exports = server

