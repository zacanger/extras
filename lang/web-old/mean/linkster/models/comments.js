const
  mongoose      = require('mongoose')
, objId         = mongoose.Schema.Types.ObjectId
, CommentSchema = new mongoose.Schema({
    body    : String
  , author  : String
  , upvotes : {type : Number , default : 0}
  , post    : {type : objId  , ref     : 'Post'}
})

CommentSchema.methods.upvote = cb => {
  this.upvotes += 1
  this.save(cb)
}

mongoose.model('Comment', CommentSchema)

