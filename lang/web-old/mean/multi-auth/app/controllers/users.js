'use strict'

const
  mongoose = require('mongoose')
, wrap     = require('co-express')
, User     = mongoose.model('User')

exports.load = wrap(function * (req, res, next, _id) {
  const criteria = { _id}
  req.profile = yield User.load({ criteria})
  if (!req.profile) {
    return next(new Error('no user!'))
  }
  next()
})

exports.create = wrap(function * (req, res) {
  const user = new User(req.body)
  user.provider = 'local'
  yield user.save()
  req.logIn(user, err => {
    if (err) {
      req.flash('info', 'sorry!')
    }
    return res.redirect('/')
  })
})

exports.show = (req, res) => {
  const user = req.profile
  res.render('users/show', {
    title : user.name
  , user  : user
  })
}

exports.signin = () => {}

exports.authCallback = login

exports.login = (req, res) => {
  res.render('users/login', {
    title : 'Login'
  })
}

exports.signup = (req, res) => {
  res.render('users/signup', {
    title : 'Sign up'
  , user  : new User()
  })
}

exports.logout = (req, res) => {
  req.logout()
  res.redirect('/login')
}

exports.session = login

function login (req, res) {
  const redirectTo = req.session.returnTo ?
    req.session.returnTo : '/'
  delete req.session.returnTo
  res.redirect(redirectTo)
}

