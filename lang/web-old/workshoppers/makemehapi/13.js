const Hapi = require('hapi')
const auth = require('hapi-auth-basic')
const user = {name: 'hapi', password: 'auth'}
const server = new Hapi.Server()
const port = process.argv[2] || 8080
const host = 'localhost'
const validate = (req, username, pw, cb) => {
  const isValid = username === user.name && pw === user.password
  return cb(null, isValid, {name: user.name})
}

server.connection({host, port})

server.register(auth, err => {
  server.auth.strategy('simple', 'basic', {validateFunc : validate})
  server.route({
    method: 'GET',
    path: '/',
    config: {
      auth: 'simple',
      handler (req, rep) {
        rep()
      }
    }
  })
  server.start(() => {})
})
