var express = require('express')
  , path = require('path')
  , User = require('./models/user')
  , rootPath = path.normalize(__dirname + '/../')
  , apiRouter = express.Router()
  , router = express.Router()

module.exports = function(app, passport){
  app.use('/api', apiRouter)
  app.use('/', router)

  require('./api/posts')(apiRouter)

  router.get('/login', function(req, res){
    res.render('login')
  })

  router.get('/register', function(req, res){
    res.render('register')
  })

  router.get('/#/', isAdmin, function(req, res){
    res.render('index', {user: req.user})
  })

  router.post('/register', function(req, res){
    User.register(new User({
      email: req.body.email
    }), req.body.password, function(err, user){
      if (err) {
        console.error(err)
        return
      }

      passport.authenticate('local')(req, res, function(){
        console.log('authenticated by passport')
        res.redirect('/#/')
      })
    })
  })

  router.post('/login', passport.authenticate('local'), function(req, res){
    res.redirect('/#/')
  })

  app.use(function(req, res, next){
    res.status(404)
    res.render('404')
    return
  })
}

function isAdmin(req, res, next){
  if (req.isAuthenticated()) {
    console.log('don\'t break  anything.')
    next()
  } else {
    console.log('Good try. A for effort.')
    res.redirect('/admin')
  }
}
