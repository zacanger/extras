const
  Hapi = require('hapi')
, joi  = require('joi')
, host = 'localhost'
, port = process.argv[2] || 8080
, serv = new Hapi.Server()

server.connection({ host, port })

server.route({
  method: 'GET',
  path: '/chickens/{breed}',
  config: {
    handler(req, rep){
      rep(`You asked for the chicken ${req.params.breed}`)
    },
    validate: {
      params: {
        breed: joi.string().required()
      }
    }
  }
})

server.start(() => {})
