const express = require('express')
const router = express.Router()
const { getStuff, setStuff, updateStuff, deleteStuff } = require('../controllers/controllers')

router.route('/').get(getStuff).post(setStuff)

router.route('/:id').put(updateStuff).delete(deleteStuff)

module.exports = router