const mongoose = require('mongoose')

const bleetSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: [true, 'Please write a bleet']
    },
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Bleet', bleetSchema)