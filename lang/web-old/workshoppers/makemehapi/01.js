const
  Hapi   = require('hapi')
, server = new Hapi.Server()
, port   = process.argv[2] || 8080

server.connection({
  host : 'localhost'
, port : port
})

server.route({
  path    : '/'
, method  : 'GET'
, handler (req, rep) {
    rep('Hello hapi')
  }
})

server.start(() => console.log(`listening`))

