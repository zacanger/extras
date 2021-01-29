const
  koa = require('koa')
, app = koa()
, p   = process.argv[2]

app.keys = ['foo', 'bar']

app.use(function * () {
  const n = ~~this.cookies.get('view', {signed : true}) + 1
  this.cookies.set('view', n, {signed : true})
  this.body = n + ' views'
})

app.listen(p)
