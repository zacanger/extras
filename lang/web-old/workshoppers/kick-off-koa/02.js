const
  koa = require('koa')
, app = koa()
, p   = process.argv[2] || 8080

app
.use(function * (next) {
  if (this.path !== '/') {
    return yield next
  }
  this.body = 'hello koa'
})

.use(function * (next) {
  if (this.path !== '/404') {
    return yield next
  }
  this.body = 'page not found'
})

.use(function * (next) {
  if (this.path !== '/500') {
    return yield next
  }
  this.body = 'internal server error'
})

.listen(p)
