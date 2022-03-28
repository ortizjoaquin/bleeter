const express = require('express')
const router = express.Router()
const { getBleet, setBleet, updateBleet, deleteBlee } = require('../controllers/controllers')

router.route('/').get(getBleet).post(setBleet)

router.route('/:id').put(updateBleet).delete(deleteBleet)

module.exports = router