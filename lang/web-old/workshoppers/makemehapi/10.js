const H = require('hapi')
const j = require('joi')
const s = new H.Server()
const host = 'localhost'
const port = process.argv[2]

s.connection({host, port})

s.route({
  method: 'POST',
  path: '/login',
  config: {
    handler(a, b){
      b('login successful')
    },
    validate: {
      payload: j.object({
        isGuest: j.boolean().required(),
        username: j.string().when('isGuest', {is: false, then: j.required()}),
        password: j.string().alphanum(),
        accessToken: j.string().alphanum()
      }).options({allowUnknown: true}).without('password', 'accessToken')
    }
  }
})

s.start(() => {})
