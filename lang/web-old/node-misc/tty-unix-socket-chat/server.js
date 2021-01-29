#!/usr/local/bin/node

const
  net        = require('net')
, fs         = require('fs')
, exec       = require('child_process').exec
, socketPath = '/tmp/ttychat.sock'
, clients    = []


Array.prototype.remove = function(e) {
  for (let i = 0; i < this.length; i++) {
    if (e == this[i]) {
      return this.splice(i, 1)
    }
  }
}

function Client(socket) {
  this.name   = null
  this.socket = socket
}

const broadcast = (message, except) => {
  clients.forEach(c => {
    if (c != except) {
      c.socket.write(message)
    }
  })
}

const takenName = name =>  {
  let taken = false
  clients.forEach(c => {
    if (c.name === name) {
      taken = true
    }
  })
  return taken
}

const server = net.createServer(socket => {
  const client = new Client(socket)
  clients.push(client)

  socket.setTimeout(0)
  socket.write('Please enter a name: ')
  socket.write('Welcome node-ttychat!\nEnter your username:\n')
  socket.on('data', data => {
    if (client.name == null) {
      const name = data.toString().match(/\w+/).toString()
      if (takenName(name)) {
        socket.write('Name taken! Please try a new one.')
      } else {
        client.name = name;
        console.log(`${client.name} connected`)
        broadcast(`${client.name} connected`, client)
        socket.write('Type !users for list of connected users.\n')
      }
      return
    }
    if (data.toString().match(/^!users/) === '!users') {
      clients.forEach(c => {
        if (c.name !== null) {
          socket.write(c.name + '\n')
        }
      })
    } else {
      const message = `[${client.name}]: ${data}`
      broadcast(message)
    }
  })
  socket.on('end', () => {
    clients.remove(client)
    if (!client.name) {
      return
    }
    console.log(`${client.name} disconnected`)
    broadcast(`${client.name} disconnected`)
  })
})

server.listen(socketPath, () => {
  console.log(`server listening on ${socketPath}`)
  fs.chmod(socketPath, '0777')
})

process.on('exit', () => {
  // todo: remove the socket
  // fs.unlinkSync(socketPath)
  console.log('bye!')
})
