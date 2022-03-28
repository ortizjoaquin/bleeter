const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const port = process.env.PORT || 3000
//MacOS Monterey uses port 5000 for AirPlay receiver

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended:false }))

app.use('/api/stuff', require('./routes/routes'))

app.use(errorHandler)

app.listen(port, () => console.log(`🟢 Server started on port ${port}`))