const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  time: {
    type: Date,
    default: new Date()
  },
  ip:String,
  view:Array,
  like:Array
})
module.exports = mongoose.model('User',schema)