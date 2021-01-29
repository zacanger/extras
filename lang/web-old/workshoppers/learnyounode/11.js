'use strict'

const
  http = require('http')
, fs   = require('fs')

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type' : 'text/plain'})
  fs.createReadStream(process.argv[3]).pipe(res)
}).listen(parseInt(process.argv[2]))


