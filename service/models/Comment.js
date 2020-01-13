const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  ip: String,
  name:  String,
  avatar: String,
  content: String,
  email: String,
  verify: {
    type: String,
    default: '未审核'
  },
  time: {
    type: Date,
    default: new Date()
  },
  article: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Article'
  }
})
module.exports = mongoose.model('Comment',schema)