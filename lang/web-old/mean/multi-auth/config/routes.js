'use strict'

// Note: We can require users, articles and other cotrollers because we have
// set the NODE_PATH to be ./app/controllers (package.json # scripts # start)

const
  users    = require('../app/controllers/users')
, articles = require('../app/controllers/articles')
, comments = require('../app/controllers/comments')
, tags     = require('../app/controllers/tags')
, auth     = require('./middlewares/authorization')

// middleware
, articleAuth = [auth.requiresLogin, auth.article.hasAuthorization]
, commentAuth = [auth.requiresLogin, auth.comment.hasAuthorization]

// routes
module.exports = (app, passport) => {
// user routes
  app
  .get('/login',  users.login)
  .get('/signup', users.signup)
  .get('/logout', users.logout)
  .post('/users', users.create)
  .post('/users/session',
    passport.authenticate('local', {
      failureRedirect : '/login'
    , failureFlash    : 'Invalid email or password.'
    }), users.session)
  .get('/users/:userId', users.show)
  .get('/auth/github',
    passport.authenticate('github', {failureRedirect : '/login'}), users.signin)
  .get('/auth/github/callback',
    passport.authenticate('github', {failureRedirect : '/login'}), users.authCallback)
  .get('/auth/twitter',
    passport.authenticate('twitter', {failureRedirect : '/login'}), users.signin)
  .get('/auth/twitter/callback',
    passport.authenticate('twitter', {failureRedirect : '/login'}), users.authCallback)

  .param('userId', users.load)

// article routes
  .param('id',                              articles.load)
  .get('/articles',                         articles.index)
  .get('/articles/new', auth.requiresLogin, articles.new)
  .post('/articles',    auth.requiresLogin, articles.create)
  .get('/articles/:id',                     articles.show)
  .get('/articles/:id/edit', articleAuth,   articles.edit)
  .put('/articles/:id',      articleAuth,   articles.update)
  .delete('/articles/:id',   articleAuth,   articles.destroy)

// home route
  .get('/', articles.index)

// comment routes
  .param('commentId',                                 comments.load)
  .post('/articles/:id/comments', auth.requiresLogin, comments.create)
  .get('/articles/:id/comments',  auth.requiresLogin, comments.create)
  .delete('/articles/:id/comments/:commentId', commentAuth, comments.destroy)

// tag routes
  .get('/tags/:tag', tags.index)

// error handling
  app.use((err, req, res, next) => {
    // treat as 404
    if (err.message                      &&
      (~err.message.indexOf('not found') ||
      (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next()
    }

    console.error(err.stack)

    if (err.stack.includes('ValidationError')) {
      res.status(422).render('422', {error : err.stack})
      return
    }

// error page
    res.status(500).render('500', {error : err.stack})
  })

// assume 404 since no middleware responded
  app.use((req, res) => {
    res.status(404).render('404', {
      url   : req.originalUrl
    , error : 'Not found'
    })
  })
}

