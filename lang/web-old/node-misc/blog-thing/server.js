const
  http   = require('http')
, routes = require('./routes')
, server = http.createServer(routes)
, port   = process.env.PORT || 8000

server.listen(port, () => console.log(`server running at ${port}`))

