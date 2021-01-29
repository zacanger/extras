const
  Hapi = require('hapi')
, h202 = require('h202')
, serv = new Hapi.Server()
, port = process.argv[2] || 8080

server.connection({
  host : 'localhost'
, port
})

server.register(h202, () => {})

server.route({
  method  : 'GET'
, path    : '/proxy'
, handler : {
  proxy : {
    host : '127.0.0.1'
  , port : 65535
    }
  }
})

server.start(() => {})
