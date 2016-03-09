var express      = require('express')
  , app          = express()
  , config       = require('./config')
  , hoganExpress = require('hogan-express')
  , path         = require('path')
  , myDocs       = require('../app/my-docs')

app.use('/assets', express.static('public/assets'))
app.use('/content/UPLOADS', express.static('content/UPLOADS'))

// use hogan-express to render the templates
app.set('view engine', 'html')
app.set('layout', 'layout')
app.set('partials', {'navigation' : 'partials/navigation'})

// app.enable('view cache')
app.set('views', path.join(config.theme, 'templates'))
app.engine('html', hoganExpress)

// handle the page requests
app.get('*', function(req, res){
  var page
  if (req.query.search) { // do the search logic
    page = myDocs.searchPages(req.query.search)
  } else if (req.params[0]) { // render docs page
    page = myDocs.getPage(req.params[0])
  } else { // index page
    page = myDocs.getHomePage()
  }
  res.render(page.template, page)
})

// start the server
var server = app.listen(config.port, function () {
  var info = server.address()
  console.log('listening on http://%s:%s', 'localhost', info.port)
})

