const Hapi = require('hapi')

const server = new Hapi.Server()

server.connection({
  port : process.argv[2] || 8080,
  host : 'localhost'
})

server.route({
  method : 'POST',
  path   : '/upload',
  config : {
    handler (req, rep) {
      let body = ''
      req.payload.file.on('data', data =>
        body += data
      )
      req.payload.file.on('end', () => {
        const res = {
          description : req.payload.description,
          file        : {
            data     : body,
            filename : req.payload.file.hapi.filename,
            headers  : req.payload.file.hapi.headers
          }
        }
        rep(JSON.stringify(res))
      })
    },
    payload : {
      output : 'stream',
      parse  : true,
      allow  : 'multipart/form-data'
    }
  }
})

server.start(() => {})
