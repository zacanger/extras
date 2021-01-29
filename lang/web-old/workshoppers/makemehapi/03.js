const
  Hapi  = require('hapi')
, inert = require('inert')
, path  = require('path')
, serv  = new Hapi.Server()
, port  = process.argv[2] || 8080

serv.connection({
  host : 'localhost'
, port : port
})

serv.register(inert, () => {})

serv.route({
  method  : 'GET'
, path    : '/'
, handler : {
    file  : path.join(__dirname, 'index.html')
  }
})

serv.start(() => console.log(`started on ${port}`))

