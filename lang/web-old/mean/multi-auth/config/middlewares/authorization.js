'use strict'

// generic
exports.requiresLogin = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  if (req.method == 'GET') {
    req.session.returnTo = req.originalUrl
  }
  res.redirect('/login')
}

// user auth
exports.user = {
  hasAuthorization: function (req, res, next) {
    if (req.profile.id != req.user.id) {
      req.flash('info', 'You are not authorized')
      return res.redirect('/users/' + req.profile.id)
    }
    next()
  }
}

// article auth
exports.article = {
  hasAuthorization: function (req, res, next) {
    if (req.article.user.id != req.user.id) {
      req.flash('info', 'You are not authorized')
      return res.redirect('/articles/' + req.article.id)
    }
    next()
  }
}

// comment auth
exports.comment = {
  hasAuthorization: function (req, res, next) {
    // if the current user is comment owner or article owner, give them authority to delete
    if (req.user.id === req.comment.user.id || req.user.id === req.article.user.id) {
      next()
    } else {
      req.flash('info', 'You are not authorized')
      res.redirect('/articles/' + req.article.id)
    }
  }
}

