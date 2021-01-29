const
  koa = require('koa')
, app = koa()
, p   = process.argv[2]

app.use(function * () {
  this.body = this.request.is('json') ?
  {message : 'hi!'}                   :
  'ok'
}).listen(p)
