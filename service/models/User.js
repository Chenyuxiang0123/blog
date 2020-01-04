const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  name: String,
  email: String,
  time: {
    type: Date,
    default: new Date()
  },
  avatar:String,
  ip:String,
  view:Array,
  like:Array
})
module.exports = mongoose.model('User',schema)