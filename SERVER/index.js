require('dotenv').config()
const { connectDB } = require('./src/config/db')


const express = require('express')
const PORT = process.env.PORT 

const launcherRoutes = require('./src/routes/launcher.routes')

const authRoutes = require('./src/routes/auth.routes')

const app = express()

// const cors = require('cors')
// app.use(cors())
app.use(express.json())

app.use('/api/launchers', launcherRoutes)
app.use('/api/auth', authRoutes)


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})




















