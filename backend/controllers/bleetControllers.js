const asyncHandler = require('express-async-handler')
const Bleet = require('../models/bleetModel')
const User = require('../models/userModel')

// @desc    Get all bleets
// @route   GET /api/bleeter
// @access  Public
const getAllBleets = asyncHandler (async (req, res) => {
  const bleet = await Bleet.find()
  res.status(200).json(bleet)
})

// @desc    Get my bleets
// @route   GET /api/bleeter/me
// @access  Private
// const getBleet = asyncHandler (async (req, res) => {
//   const bleet = await Bleet.find({ user: req.user.id })
//   res.status(200).json(bleet)
// })

// @desc    Set bleet
// @route   POST /api/bleeter
// @access  Private
const setBleet = asyncHandler (async (req, res) => {
  if(!req.body.text) {
    res.status(400)
    throw new Error ('Dude add something! 😡')
  }
  const bleet = await Bleet.create({
    username:req.user.username,
    user: req.user.id,
    text: req.body.text
  })
  res.status(200).json(bleet)
})

// @desc    Update bleet
// @route   PUT /api/bleeter/:id
// @access  Private
const updateBleet = asyncHandler (async (req, res) => {
  const bleet = await Bleet.findById(req.params.id)
  if(!bleet) {
    res.status(400)
    throw new Error('Bleet not found')
  }
  // Check for user
  if(!req.user) {
    res.status(401)
    throw new Error('User not found')
  }
  // Make sure the logged user matches de bleet user
  if(bleet.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }
  const updatedBleet = await Bleet.findByIdAndUpdate(req.params.id, req.body, {new: true})

  res.status(200).json(updatedBleet)
})

// @desc    Delete bleet
// @route   DELETE /api/bleeter/:id
// @access  Private
const deleteBleet = asyncHandler (async (req, res) => {
  const bleet = await Bleet.findById(req.params.id)
  if(!bleet) {
    res.status(400)
    throw new Error('Bleet not found 🧐')
  }
  // Check for user
  if(!req.user) {
    res.status(401)
    throw new Error('User not found 🧐')
  }
  // Make sure the logged user matches de bleet user
  if(bleet.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized ⛔️')
  }
  await bleet.delete()
  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getAllBleets,
  // getBleet,
  setBleet,
  updateBleet,
  deleteBleet
}