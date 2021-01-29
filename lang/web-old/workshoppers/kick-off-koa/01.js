const
  koa = require('koa')
, app = koa()
, p   = process.argv[2] || 8080

app.use(function * () {
  this.body = 'hello koa'
})

app.listen(p)
