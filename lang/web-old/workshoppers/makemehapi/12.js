const Hapi = require('hapi')
const Boom = require('boom')
const server = new Hapi.Server()
const port = process.argv[2] || 8080
const host = 'localhost'

server.connection({host, port})

server.state('session', {
  path: '/',
  encoding: 'base64json',
  ttl: 10,
  domain: host
})

server.route({
  method: 'GET',
  path: '/set-cookie',
  handler (req, rep) {
    return rep({
      message: 'success'
    }).state('session', {key: 'makemehapi'})
  },
  config: {
    state: {
      parse: true,
      failAction: 'log'
    }
  }
})

server.route({
  method: 'GET',
  path: '/check-cookie',
  handler (req, rep) {
    const session = req.state.session
    let res

    if (session) {
      res = {user: 'hapi'}
    } else {
      res = Boom.unauthorized('Missing authentication')
    }
    rep(res)
  }
})

server.start(() => {})
