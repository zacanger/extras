var mongoose = require('mongoose')
  , ObjID = mongoose.Types.ObjectId

var postSchema = new mongoose.Schema({
    title: {type: String, required: true}
  , body: {type: String, required: true}
  , date: {type: Date, default: new Date()}
  , tags: {type: [{type: String, }], validate: [tagLimit, 'too many tags!']}
  , author: [{type: ObjID, ref: 'User'}]
}, {strict: true})

function tagLimit(val){
  return val.length <= 8
}

module.exports = mongoose.model('Post', postSchema)
