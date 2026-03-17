const { createUser, findByUserType, putUser, deleteUserByRole, findAllUsers, findByUserTypePassword } = require('../models/user.model')

async function register(req, res) {
  try {
    const { username, password, email, user_type } = req.body

    if (!username || !password || !email || !user_type) {
      return res.status(400).json({ message: 'need all parmeters' })
    }

    const existing = await findByUserType(user_type)
    if (existing) {
      return res.status(400).json({ message: 'user_type already exists' })
    }

    const date = new Date();
    let date_text = date.toDateString();
    const user = { username, password, email, user_type, last_login: date_text }
    await createUser(user)
    return res.status(200).json({ message: 'User created' })
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message })
  }
}

async function updateUser(req, res) {
  try {
    const { user_type } = req.body
    if (!user_type) {
      return res.status(400).json({ message: 'need user_type for update' })
    }
    const existing = await findByUserType(user_type)
    if ( !existing ) {
      return res.status(409).json({ message: 'There already is such a role.' })
    }
    const rsult = await putUser(req.body)
    return res.status(200).json({ message: 'User is apdate' })
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message })
  }
}


async function deleteUser(req, res) {
  try {
    const result = await deleteUserByRole(req.params.role)
    if (result.deletedCount === 0)
      return res.status(404).json({ message: 'user not found' })
    res.status(200).json({ message: 'user deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

async function getAll(req, res) {
  try {
    const users = await findAllUsers()
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

async function login(req, res) {
  try {
    const { user_type, password } = req.body
    if (!user_type || !password) {
      return res.status(400).json({ message: 'need user_type and password' })
    }
    const user = await findByUserTypePassword({user_type , password} )
    if (!user) return res.status(404).json({ message: 'Incorrect details' })
    return res.status(200).json({ message: true })
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message })
  }
}

module.exports = { register, login, updateUser, deleteUser, getAll }