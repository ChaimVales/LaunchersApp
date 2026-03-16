
const { createUser, findByFullName } = require('../models/user.model')

async function register(req, res) {
  try {
    const {  password, fullName } = req.body

    if (!password || !fullName) {
      return res.status(400).json({ message: 'need password and fullName ' })
    }
    await createUser({  password, fullName })
    return res.status(200).json({ message: 'User created' })
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message })
  }
}

async function login(req, res) {
  try {
    const { fullName, password } = req.body
    if (!password || !fullName) {
      return res.status(400).json({ message: 'need password and fullName ' })
    }
    const user = findByFullName(fullName)
    if (!user) return res.status(404).json({ message: 'user not found' })
    return res.status(200).json({ message: 'is login' })
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message })
  }
}

module.exports = { register, login }