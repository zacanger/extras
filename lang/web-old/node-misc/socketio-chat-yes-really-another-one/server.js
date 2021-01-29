'use strict'

const
  path    = require('path')
, express = require('express')
, app     = express()
, http    = require('http').Server(app)
, io      = require('socket.io')(http)
, port    = process.env.PORT || process.argv[2] || 3000
, history  = {}

app
.use(express.static(__dirname))
.get('/', (req, res) => {res.sendFile('./index.html')})
.get(/[a-z]+/, (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

io.on('connection', (socket) => {
  let currentRoom = 'default'
  console.log('user connected')

  socket.on('join room', (room) => {
    console.log('joining', room)
    currentRoom = room
    socket.join(room)

    if(history[currentRoom] != undefined && history[currentRoom].constructor === Array){
      for(let i = 0; i < history[currentRoom].length; i++){
        socket.emit('new message', histoy[currentRoom][i])
      }
    } else {
      history[currentRoom] = []
    }
  })

  socket.on('new message', (msg) => {
    console.log('new message', msg)

    if(history[currentRoom] == undefined){
      history[currentRoom] = [msg]
    } else {
      history[currentRoom].push(msg)
    }
    io.to(currentRoom).emit('new message', msg)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

http.listen(port, () => {
  console.log('listening on', port)
})
