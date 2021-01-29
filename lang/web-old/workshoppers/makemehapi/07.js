const
  Hapi     = require('hapi')
, Vision   = require('vision')
, { join } = require('path')
, server   = new Hapi.Server()
, port     = process.argv[2] || 8080
, host     = 'localhost'
, hbars    = require('handlebars')

server.connection({ host, port })

server.register(Vision, () => {})

server.views({
  path        : join(__dirname, 'templates')
, engines     : { html : hbars }
, helpersPath : join(__dirname, 'helpers')
})

server.route({
  method  : 'GET'
, path    : '/'
, handler : { view : 'template.html' }
})

server.start(() => {})
