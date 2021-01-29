const Hapi = require('hapi')
const { join } = require('path')
const rot13 = require('rot13-transform')
const server = new Hapi.Server()
const port = process.argv[2] || 8080
const host = 'localhost'
const { createReadStream } = require('fs')

server.connection({ host, port })

server.route({
  method : 'GET'
, path   : '/'
, config : {
    handler(request, reply) {
      reply(createReadStream(join(__dirname, 'input.txt')).pipe(rot13))
    }
  }
})

server.start(() => {})
