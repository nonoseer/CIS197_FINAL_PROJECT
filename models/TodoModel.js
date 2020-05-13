const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  cadance: {
    type: Number,
  },
  hoursRemaining: {
    type: Number,
  },
  active: {
    type: Boolean,
  },
  owner: {
    type: String,
  },
  contact: {
    type: Number,
  },
})

module.exports = mongoose.model('TodoModel', todoSchema)
