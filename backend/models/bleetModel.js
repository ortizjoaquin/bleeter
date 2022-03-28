const mongoose = require('mongoose')

const bleetSchema = mongoose.Schema(
  {
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