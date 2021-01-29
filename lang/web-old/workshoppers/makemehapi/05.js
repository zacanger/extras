const
  Hapi     = require('hapi')
, Vision   = require('vision')
, { join } = require('path')
, server   = new Hapi.Server()
, port     = process.argv[2] || 8080

server.connection({
  host : 'localhost'
, port : port
})

server.register(Vision, () => {})

server.views({
  engines: {
    html: require('handlebars')
  }
, path : join(__dirname, 'templates')
})

server.route({
  method  : 'GET'
, path    : '/'
, handler : {
    view  : 'index.html'
  }
})

server.start(() => console.log(port))
