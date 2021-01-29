const
  Hapi   = require('hapi')
, server = new Hapi.Server()
, port   = process.argv[2] || 8080

server.connection({
  host : 'localhost'
, port : port
})

server.route({
  path    : '/{name}'
, method  : 'GET'
, handler (req, rep) {
    rep(`Hello ${req.params.name}`)
  }
})

server.start(() => console.log(`listening`))

