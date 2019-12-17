const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  commentator: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  conent: String,
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