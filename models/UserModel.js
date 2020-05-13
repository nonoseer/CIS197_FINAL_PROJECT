const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
})

module.exports = mongoose.model('UserModel', userSchema)
