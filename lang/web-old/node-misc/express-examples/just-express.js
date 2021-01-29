'use strict'

/* only dependency: express */
const
  express = require('express')
, app     = express()
, port    = 3000

app.get('/', (req, res) => {res.send('foo')})

let server = app.listen(port, () => {
  let
    host = server.address().address
  , port = server.address().port
  console.log('yeah, yo, at http://%s:%s', host, port)
})

