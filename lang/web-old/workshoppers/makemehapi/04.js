const
  Hapi   = require('hapi')
, inert  = require('inert')
, path   = require('path')
, port   = process.argv[2] || 8080
, server = new Hapi.Server()

server.connection({
  host : 'localhost'
, port : port
})

server.register(inert, () => {})

server.route({
  method  : 'GET'
, path    : '/foo/bar/baz/{filename}'
, handler : {
    directory : {
      path : path.join(__dirname, 'public')
    }
  }
})

server.start(() => console.log('started'))

