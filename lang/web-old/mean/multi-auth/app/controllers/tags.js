'use strict'

const
  mongoose = require('mongoose')
, wrap     = require('co-express')
, Article  = mongoose.model('Article')

exports.index = wrap(function * (req, res) {
  const
    criteria = {tags : req.params.tag}
  , page     = (req.params.page > 0 ? req.params.page : 1) - 1
  , limit    = 30
  , options  = {
    limit    : limit
  , page     : page
  , criteria : criteria
  }
  , articles = yield Article.list(options)
  , count    = yield Article.count(criteria)

  res.render('articles/index', {
    title    : 'Articles tagged ' + req.params.tag
  , articles : articles
  , page     : page + 1
  , pages    : Math.ceil(count / limit)
  })
})

