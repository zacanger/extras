const
  express = require('express')
, https   = require('https')
, fs      = require('fs')
, host    = process.env.HOST || ''
, port    = process.env.PORT || 8443
, app     = express()
, options = {
  key  : fs.readFileSync('key.pem')
, ca   : fs.readFileSync('csr.pem')
, cert : fs.readFileSync('cert.pem')
}

// you'll probably want to also install and use the usual express middleware, like
// body-parser, some error handler, method-override, etc.

app
.use(express.static(__dirname + '/public'))
.get('/', (req, res) => {
  res.send('foo')
})

https.createServer(options, app).listen(port, host, null, () => {
  console.log(`server listening on ${port}`)
})

