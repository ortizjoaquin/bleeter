const express = require('express')
const router = express.Router()
const {getAllBleets, getBleet, setBleet, updateBleet, deleteBleet } = require('../controllers/bleetControllers')

const {protect} = require('../middleware/authMiddleware')

router.route('/forum').get(getAllBleets)

router.route('/').get(protect, getBleet).post(protect, setBleet)

router.route('/:id').put(protect, updateBleet).delete(protect, deleteBleet)

module.exports = router