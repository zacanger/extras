const
  koa     = require('koa')
, app     = koa()
, p       = process.argv[2]
, session = require('koa-session')

app.keys = ['asdf', 'ghjkl;']

app.use(session(app))

app.use(function * () {
  const n = ~~this.session.view + 1
  this.session.view = n
  this.body = `${n} views`
})

app.listen(p)
