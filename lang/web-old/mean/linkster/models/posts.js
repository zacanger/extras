const
  mongoose   = require('mongoose')
, objId      = mongoose.Schema.Types.ObjectId
, PostSchema = new mongoose.Schema({
    title    : String
  , link     : String
  , upvotes  : { type : Number , default : 0}
  , comments : [{type : objId  , ref     : 'comment'}]
})

PostSchema.methods.upvote = cb => {
  this.upvotes += 1
  this.save(cb)
}

mongoose.model('Post', PostSchema)

