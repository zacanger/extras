var express = require('express')
  , routes  = require('./routes')
  , http    = require('http')
  , path    = require('path')
  , app     = express()
  , store   = new express.session.MemoryStore
  , port    = 3000

admin = null
password = 'password'

app.configure(function(){
  app.set('port', process.env.PORT || 3000)
  app.set('views', __dirname + '/views')
  app.set('view engine', 'jade')
  app.use(express.favicon())
  app.use(express.logger('dev'))
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(express.cookieParser())
    store: store
  }))
  app.use(app.router)
  app.use(express.static(path.join(__dirname, 'public')))
})

app.configure('development', function () {
  app.use(express.errorHandler())
})

app.get('/home', routes.index)
app.get('/home/:id', routes.post_view)
app.post('/home/:id', routes.post_view_post)
app.get('/about', routes.about)
app.get('/contact', routes.contact)

app.get('/admin', routes.admin)
app.post('/admin', routes.admin_post)

app.get('/admin/new', routes.admin_new)
app.post('/admin/new', routes.admin_new_post)

app.get('/admin/:id/edit', routes.admin_edit)
app.post('/admin/:id/edit', routes.admin_edit_post)

app.get('/admin/delete', routes.admin_delete)
app.post('/admin/delete', routes.admin_delete_post)

app.get('/admin/logout', function (req, res) {
  delete req.session.admin
  res.redirect('/home')
})

http.createServer(app)
app.listen(port)
console.log('check it, on', app.get('port'))

