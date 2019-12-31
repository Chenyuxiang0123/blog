const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: String,
  time: {
    type: Date,
    default: new Date()
  },
  router:String,
  articlies: 0
})
module.exports = mongoose.model('Tag',schema)