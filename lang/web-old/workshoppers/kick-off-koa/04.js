const
  fs  = require('fs')
, koa = require('koa')
, app = koa()
, p   = process.argv[2]
, arg = process.argv[3]

app
.use(function * (next) {
  if (this.path !== '/json') {
    return yield next
  }
  this.body = {foo : 'bar'}
})

.use(function * (next) {
  if (this.path !== '/stream') {
    return yield next
  }
  this.body = fs.createReadStream(arg)
})

.listen(p)
