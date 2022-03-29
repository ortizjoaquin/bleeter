const express = require('express')
const router = express.Router()
const { getAllBleets, getBleet, setBleet, updateBleet, deleteBleet } = require('../controllers/bleetControllers')

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(getAllBleets)

router.route('/me').get(protect, getBleet).post(protect, setBleet)

router.route('/:id').put(protect, updateBleet).delete(protect, deleteBleet)

module.exports = router