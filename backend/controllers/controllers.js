const asyncHandler = require('express-async-handler')

const Stuff = require('../models/stuffModel')

// @desc    Get stuff
// @route   GET /api/stuff
// @access  Private
const getStuff = asyncHandler (async (req, res) => {
  const stuff = await Stuff.find()
  res.status(200).json(stuff)
})

// @desc    Set stuff
// @route   POST /api/stuff
// @access  Private
const setStuff = asyncHandler (async (req, res) => {
  if(!req.body.text) {
    res.status(400)
    throw new Error ('Dude add some stuff! 😡')
  }
  const stuff = await Stuff.create({
    text: req.body.text
  })
  res.status(200).json(stuff)
})

// @desc    Update stuff
// @route   PUT /api/stuff/:id
// @access  Private
const updateStuff = asyncHandler (async (req, res) => {
  const stuff = await Stuff.findById(req.params.id)
  if(!stuff) {
    res.status(400)
    throw new Error('Stuff not found')
  }
  const updatedStuff = await Stuff.findByIdAndUpdate(req.params.id, req.body, {new: true})

  res.status(200).json(updatedStuff)
})

// @desc    Delete stuff
// @route   DELETE /api/stuff/:id
// @access  Private
const deleteStuff = asyncHandler (async (req, res) => {
  const stuff = await Stuff.findByIdAndDelete(req.params.id)
  if(!stuff) {
    res.status(400)
    throw new Error('Stuff not found')
  }
  res.status(200).json({ message: `Stuff with the ID N° ${req.params.id} deleted successfully` })
})

module.exports = {
  getStuff,
  setStuff,
  updateStuff,
  deleteStuff
}