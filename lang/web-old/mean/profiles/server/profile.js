import mongoose from 'mongoose'

const Profile = mongoose.Schema({
  name            : {type : String  , required : true }
, age             : {type : Number  , required : true }
, profileImage    : {type : String  , default  : 'http://zacanger.com/logo.svg'}
, skills          : [String]
, lovesJavascript : {type : Boolean , default  : true }
})

export default mongoose.model('Profile', Profile)
