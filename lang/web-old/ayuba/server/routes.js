const
  express   = require('express')
, path      = require('path')
, User      = require('./models/user')
, rootPath  = path.normalize(__dirname + '/../')
, apiRouter = express.Router()
, router    = express.Router()

module.exports = function(app, passport){
  app.use('/api', apiRouter)
  app.use('/', router)

  require('./api/posts')(apiRouter)

  router.get('/', function(req, res){res.render('index')})
  router.get('/admin', function(req, res){res.render('admin/login')})
  router.get('/admin/register', function(req, res){res.render('admin/register')})
  router.get('/admin/dashboard', isAdmin, function(req, res){
    res.render('admin/dashboard', {user: req.user})})

  router.post('/register', function(req, res){
  // is this user unique?
    User.register(new User({
      email: req.body.email
    }), req.body.password, function(err, user){
      if (err) {
        console.error(err)
        return
      }
      // log in right away, then
      passport.authenticate('local')(req, res, function(){
        console.log('authenticated by passport')
        res.redirect('/admin/dashboard')
      })
    })
  })

  router.post('/login', passport.authenticate('local'), function(req, res){
    res.redirect('/admin/dashboard')})

  app.use(function(req, res, next){
    res.status(404)
    res.render('404')
    return
  })
}

function isAdmin(req, res, next){
  if (req.isAuthenticated()) {
    console.log('go on, then, write something cool')
    next()
  } else {
    console.log('good try. a for effort.')
    res.redirect('/admin')
  }
}

