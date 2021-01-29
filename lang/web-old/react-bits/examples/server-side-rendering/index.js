'use strict'

require('node-jsx').install()

const
  path     = require('path')
, express  = require('express')
, renderer = require('react-engine')
, compress = require('compression')
, app      = express()
, port     = process.env.PORT || 3000
, engine   = renderer.server.create({
  reactRoutes : path.join(__dirname + '/public/routes.jsx')
})

app

.engine('.jsx', engine)

.set('port', port)
.set('views', __dirname + '/public/views')
.set('view engine', 'jsx')
.set('view', renderer.expressView)

.use(compress())
.use(express.static(__dirname + '/public'))

.get('/', (req, res) => {
  res.render('home', {
    title     : 'app'
  , name      : 'home'
  , selection : 'header-home'
  })
})
.get('/page', (req, res) => {
  res.render('page', {
    title     : 'page'
  , name      : 'page'
  , selection : 'header-page'
  })
})
.get('/spa*', (req, res) => {
  res.render(req.url, {
    title     : 'spa'
  , name      : 'spa'
  , selection : 'header-spa'
  })
})

const server = app.listen(app.get('port'), () => {
  const
    host = server.address().address
  , port = server.address().port
  console.log('listening at http://%s:%s', host, port)
})
