#!/usr/bin/env node

var path               = require('path')
  , express            = require('express')
  , program            = require('commander')
  , contentDisposition = require('content-disposition')
  , pkg                = require(path.join(__dirname, 'package.json'))
  , scan               = require('./lib/scan.js')
  , port               = program.port || 7777
  , app                = express()
  , tree               = scan('.', 'files')

program
  .version(pkg.version)
  .option('-p', 'port (default 9999)', parseInt)
  .parse(process.argv)

app.use('/', express.static(path.join(__dirname, 'frontend')))
app.use('/files', express.static(process.cwd(), {
  index      : false
, setHeaders : function(res, path){
    res.setHeader('Content-Disposition', contentDisposition(path))
  }
}))
app.get('/scan', function(req, res){
  res.send(tree)
})
app.listen(port)
console.log('running on', port)

