const asyncHandler = require('express-async-handler')

// @desc    Get stuff
// @route   GET /api/stuff
// @access  Private
const getStuff = asyncHandler (async (req, res) => {
  res.status(200).json({ message: 'Get stuff' })
})

// @desc    Set stuff
// @route   POST /api/stuff
// @access  Private
const setStuff = asyncHandler (async (req, res) => {
  if(!req.body.text) {
    res.status(400)
    throw new Error ('Dude add a text field! 😡')
  }
  res.status(200).json({ message: 'Set stuff' })
})

// @desc    Update stuff
// @route   PUT /api/stuff/:id
// @access  Private
const updateStuff = asyncHandler (async (req, res) => {
  res.status(200).json({ message: `Update stuff N° ${req.params.id}` })
})

// @desc    Delete stuff
// @route   DELETE /api/stuff/:id
// @access  Private
const deleteStuff = asyncHandler (async (req, res) => {
  res.status(200).json({ message: `Delete stuff N° ${req.params.id}` })
})

module.exports = {
  getStuff,
  setStuff,
  updateStuff,
  deleteStuff
}