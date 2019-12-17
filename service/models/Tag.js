const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: String,
  time: {
    type: Date,
    default: new Date()
  },
  router:String
})
module.exports = mongoose.model('Tag',schema)