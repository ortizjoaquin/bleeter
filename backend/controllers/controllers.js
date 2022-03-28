const asyncHandler = require('express-async-handler')

const Bleet = require('../models/bleetModel')

// @desc    Get bleet
// @route   GET /api/bleet
// @access  Private
const getBleet = asyncHandler (async (req, res) => {
  const bleet = await Bleet.find()
  res.status(200).json(bleet)
})

// @desc    Set bleet
// @route   POST /api/bleet
// @access  Private
const setBleet = asyncHandler (async (req, res) => {
  if(!req.body.text) {
    res.status(400)
    throw new Error ('Dude add something! 😡')
  }
  const bleet = await Bleet.create({
    text: req.body.text
  })
  res.status(200).json(bleet)
})

// @desc    Update bleet
// @route   PUT /api/bleet/:id
// @access  Private
const updateBleet = asyncHandler (async (req, res) => {
  const bleet = await Bleet.findById(req.params.id)
  if(!bleet) {
    res.status(400)
    throw new Error('Bleet not found')
  }
  const updatedBleet = await Bleet.findByIdAndUpdate(req.params.id, req.body, {new: true})

  res.status(200).json(updatedBleet)
})

// @desc    Delete bleet
// @route   DELETE /api/bleet/:id
// @access  Private
const deleteBleet = asyncHandler (async (req, res) => {
  const bleet = await Bleet.findByIdAndDelete(req.params.id)
  if(!bleet) {
    res.status(400)
    throw new Error('Bleet not found')
  }
  res.status(200).json({ message: `Bleet with the ID N° ${req.params.id} deleted successfully` })
})

module.exports = {
  getBleet,
  setBleet,
  updateBleet,
  deleteBleet
}