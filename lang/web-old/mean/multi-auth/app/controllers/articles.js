'use strict'

const
  mongoose = require('mongoose')
, assign   = require('object-assign')
, wrap     = require('co-express')
, only     = require('only')
, Article  = mongoose.model('Article')

exports.load = wrap(function * (req, res, next, id) {
  req.article = yield Article.load(id)
  if (!req.article) {
    return next(new Error('no article!'))
  }
  next()
})

exports.index = wrap(function * (req, res) {
  const
    page    = (req.query.page > 0 ? req.query.page : 1) - 1
  , limit   = 30
  , options = {
    limit : limit
  , page  : page
  }
  , articles = yield Article.list(options)
  , count    = yield Article.count()

  res.render('articles/index', {
    title    : 'Articles'
  , articles : articles
  , page     : page + 1
  , pages    : Math.ceil(count / limit)
  })
})

exports.new = (req, res) => {
  res.render('articles/new', {
    title   : 'New Article'
  , article : new Article({})
  })
}

exports.create = wrap(function * (req, res) {
  const
    article = new Article(only(req.body, 'title body tags'))
  , images  = req.files.image ? [req.files.image] : undefined

  article.user = req.user
  yield article.uploadAndSave(images)
  req.flash('success', 'posted!')
  res.redirect('/articles/' + article._id)
})

exports.edit = (req, res) => {
  res.render('articles/edit', {
    title   : 'Edit ' + req.article.title
  , article : req.article
  })
}

exports.update = wrap(function * (req, res) {
  const
    article = req.article
  , images  = req.files.image ? [req.files.image] : undefined

  assign(article, only(req.body, 'title body tags'))
  yield article.uploadAndSave(images)
  res.redirect('/articles/' + article._id)
})

exports.show = (req, res) => {
  res.render('articles/show', {
    title   : req.article.title
  , article : req.article
  })
}

exports.destroy = wrap(function * (req, res) {
  yield req.article.remove()
  req.flash('success', 'deleted!')
  res.redirect('/articles')
})

