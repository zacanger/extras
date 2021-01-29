const
  koa = require('koa')
, co  = require('co-body')
, app = koa()
, p   = process.argv[2] || 8080

app

.use(function * (next) {
  if (this.method !== 'POST') {
    return yield next
  }
  const body = yield co(this, {limit : '1kb'})
  if (!body.name) {
    this.throw(400, '.name required')
  }
  this.body = body.name.toUpperCase()
})

.listen(p)
