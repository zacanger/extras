'use strict'

const
  mongoose      = require('mongoose')
, notify        = require('../mailer')
, Schema        = mongoose.Schema
, getTags       = tags => tags.join(',')
, setTags       = tags => tags.split(',')
, ArticleSchema = new Schema({
  title : {type : String, default : '', trim : true}
, body  : {type : String, default : '', trim : true}
, user  : {type : Schema.ObjectId, ref : 'User'}
, comments : [{
    body      : {type : String, default : ''}
  , user      : {type : Schema.ObjectId, ref : 'User'}
  , createdAt : {type : Date, default : Date.now}
  }]
, tags : {type : [], get : getTags, set : setTags}
, createdAt : {type : Date, default : Date.now}
})

ArticleSchema.path('title').required(true, 'title please')
ArticleSchema.path('body').required(true, 'words please')

ArticleSchema.methods = {
  uploadAndSave (images) {
    const err = this.validateSync()
    if (err && err.toString()) {
      throw new Error(err.toString())
    }
    return this.save()
  },

  addComment (user, comment) {
    this.comments.push({
      body : comment.body
    , user : user._id
    })

    if (!this.user.email) {
      this.user.email = 'ayuba@zacanger.com'
    }

    notify.comment({
      article     : this
    , currentUser : user
    , comment     : comment.body
    })
    return this.save()
  }
}

ArticleSchema.statics = {
  load (_id) {
    return this.findOne({ _id})
    .populate('user', 'name email username')
    .populate('comments.user')
    .exec()
  },

  list (options) {
    const
      criteria = options.criteria || {}
    , page     = options.page     || 0
    , limit    = options.limit    || 30
    return this.find(criteria)
    .populate('user', 'name username')
    .sort({createdAt : -1})
    .limit(limit)
    .skip(limit * page)
    .exec()
  }
}

mongoose.model('Article', ArticleSchema)

