const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  parent:{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Category'
  },
  time: {
    type: Date,
    default: new Date()
  },
  childList:{
    type: Array,
    default: []
  },
  articlies:{
    type: Array,
    default:[]
  },
  router: String
})

module.exports = mongoose.model('Category',schema)