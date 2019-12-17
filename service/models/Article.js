const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  title: String,
  author: String,
  conent: String,
  imgUrl: String,
  likes: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  comments: {
    type: Number,
    default: 0
  },
  time: {
    type: Date,
    default: new Date()
  },
  tag:[{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Tag'
  }],
  category:{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Category'
  }
})
module.exports = mongoose.model('Article',schema)