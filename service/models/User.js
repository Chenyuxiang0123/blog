const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  time: {
    type: Date,
    default: new Date()
  },
  name: String,
  email: String,
  avatar: String,
  ip:String,
  view:Array,
  like:Array
})
module.exports = mongoose.model('User',schema)