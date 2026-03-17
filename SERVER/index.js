require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { connectDB } = require('./src/config/db')

const launcherRoutes = require('./src/routes/launcher.routes.js')
const authRoutes = require('./src/routes/auth.routes.js')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/launchers', launcherRoutes)
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})




















