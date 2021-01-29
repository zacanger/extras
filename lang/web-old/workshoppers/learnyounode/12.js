'use strict'

const
  http = require('http')
, mapp = require('through2-map')

http.createServer((req, res) => {
  if (req.method != 'POST') {
    return res.send('POST plz\n')
  }
  req.pipe(mapp(chunk => chunk.toString().toUpperCase()))
  .pipe(res)
}).listen(parseInt(process.argv[2]))

