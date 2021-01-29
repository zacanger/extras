const
  koa     = require('koa')
, parse   = require('co-body')
, session = require('koa-session')
, app     = koa()
, p       = process.argv[2] || 8080
, form    = `
<form action="/login" method="POST">
  <input name="username" type="text" value="username">
  <input name="password" type="password" placeholder="The password is 'password'">
  <button type="submit">Submit</button>
</form>`

app.keys = ['one', 'two', 'three']

app
.use(session(app))
.use(function * home(next) {
  if (this.request.path !== '/') {
    return yield next
  }
  if (this.session.authenticated) {
    return this.body = 'hello world'
  }
  this.status = 401
})
.use(function * login(next) {
  if (this.request.path !== '/login') {
    return yield next
  }
  if (this.request.method === 'GET') {
    return this.body = form
  }
  if (this.request.method !== 'POST') {
    return
  }
  const body = yield parse(this)
  if (body.username !== 'username' || body.password !== 'password') {
    return this.status = 400
  }
  this.session.authenticated = true
  this.redirect('/')
})
.use(function * logout(next) {
  if (this.request.path !== '/logout') {
    return yield next
  }
  this.session.authenticated = false
  this.redirect('/login')
})
.listen(p)
