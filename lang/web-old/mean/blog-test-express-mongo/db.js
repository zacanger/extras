var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId

var db_url = process.env.MONGOHQ_URL || 'mongodb://localhost:27017/blog'
  , db = mongoose.connect(db_url)

var postSchema = new Schema({
    id      : ObjectId
  , title   : String
  , content : String
  , date    : String
})

var commentSchema = new Schema({
    id        : ObjectId
  , postid    : String
  , title_sub : String
  , name      : String
  , comment   : String
  , date      : String
})

var post = db.model('post', postSchema)
var comment = db.model('comment', commentSchema)

