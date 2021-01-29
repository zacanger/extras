const
  koa = require('koa')
, app = koa()
, p   = process.argv[2]

function responseTime () {
  return function * (next) {
    const d = new Date
    yield next
    this.set('X-Response-Time', new Date - d)
  }
}

function upperCase () {
  return function * (next) {
    yield next
    this.body = this.body.toUpperCase()
  }
}

app
.use(responseTime())
.use(upperCase())
.use(function * () {this.body = 'hello koa'})
.listen(p)
