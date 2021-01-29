'use strict'

const
  mongoose = require('mongoose')
, Article  = mongoose.model('Article')
, User     = mongoose.model('User')

exports.cleanup = function * (t) {
  yield User.remove()
  yield Article.remove()
  t.end()
}

