// it's pretty easy (and standard) to set this up in your nginx configs, or
// .htaccess (if you're using apache), but here's a way to do it just in express.
// '301' is for a permanent redirect; '302' (the default) is temporary.

const
  express = require('express')
, app     = express()

// redirects 'http://www.whatever.com' to 'http://whatever.com'
app.get('/*', (req, res, next) => {
  if(req.headers.host.match(/^www/) !== null){
    res.redirect('http://' + req.headers.host.replace(/^wwww\./, '') + req.url, 301)
  } else {
    next()
  }
})

// or, the other way around:
app.get('/*', (req, res, next) => {
  if(req.headers.host.match(/^www/) == null){
    res.redirect('http://www.' + req.headers.host + req.url, 301)
  } else {
    next()
  }
})

