const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  title: String,
  author: String,
  content: String,
  imgUrl: String,
  likes: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  flag: {
    type:Boolean,
    default: true
  },
  comments: {
    type: Number,
    default: 0
  },
  time: {
    type: Date,
    default: new Date()
  },
  html:String,
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