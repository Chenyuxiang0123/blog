const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  name: String,
  email: String,
  time: {
    type: Date,
    default: new Date()
  },
})
module.exports = mongoose.model('User',schema)