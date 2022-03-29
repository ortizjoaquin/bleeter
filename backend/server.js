const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 4000
//MacOS Monterey uses port 5000 for AirPlay receiver

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended:false }))

app.use('/api/bleeter', require('./routes/bleetRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port: ${port} ✅`))