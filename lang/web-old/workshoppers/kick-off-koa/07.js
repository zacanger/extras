const
  koa = require('koa')
, app = koa()
, p   = process.argv[2]

function err () {
  return function * (next) {
    try {
      yield next
    } catch (e) {
      this.status = 500
      this.body = 'internal server error'
    }
  }
}

app
.use(err())
.use(function * () {
  if (this.path === '/error') {
    throw new Error('ooops')
  }
  this.body = 'OK'
})
.listen(p)
