'use strict'

const
  Notifier = require('notifier')
, swig         = require('swig')
, config       = require('../../config/config')

Notifier.prototype.processTemplate = (tplPath, locals) => {
  locals.filename = tplPath
  return swig.renderFile(tplPath, locals)
}

module.exports = {
  comment (options, cb) {
    const
      article  = options.article
    , author   = article.user
    , user     = options.currentUser
    , notifier = new Notifier(config.notifier)
    , obj = {
      to      : author.email
    , from    : 'ayuba@zacanger.com'
    , subject : user.name + ' commented on ' + article.title
    , alert   : user.name + ' says: "' + options.comment
    , locals  : {
        to      : author.name
      , from    : user.name
      , body    : options.comment
      , article : article.name
      }
    }

    try {
      notifier.send('comment', obj, cb)
    } catch (err) {
      console.log(err)
    }
  }
}

