const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  ip: String,
  name: String,
  email: String,
  time: {
    type: Date,
    default: new Date()
  },
  avatar: String,
  content: String,
  verify: {
    type: String,
    default: '未审核'
  }
})
module.exports = mongoose.model('Message',schema)