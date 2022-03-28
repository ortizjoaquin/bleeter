const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async(req, res) => {
  const { username, email, password } = req.body
  if(!username || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }
  // Check if user already exists
  const userExistsEmail = await User.findOne({email})
  const userExistsUsername = await User.findOne({username})
  if(userExistsEmail && userExistsUsername) {
    res.status(400)
    throw new Error(`The e-mail ${email} and the username ${username} are already taken`)
  } if(userExistsEmail) {
    res.status(400)
    throw new Error(`The e-mail ${email} is already registered`)
  } if (userExistsUsername) {
    res.status(400)
    throw new Error(`The username ${username} is already taken`)
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    username,
    email,
    password: hashedPassword
  })

  if(user) {
    res.status(201).json({
      message: 'User created 👍',
      _id: user.id,
      name: user.username,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }

  res.json({ message: 'Register User' })
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const {username, email, password} = req.body
  const user = await User.findOne({email} && {username})
  if(user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      message: 'Logging in 🙌',
      _id: user.id,
      name: user.username,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials 😐')
  }
})

// @desc    Get user's data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const {_id, username, email} = await User.findById(req.user.id)
  res.status(200).json({
    id: _id,
    username,
    email
  })
})

// JWT Generation
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe
}