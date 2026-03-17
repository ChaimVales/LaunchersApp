const express = require('express')
const router = express.Router()
const { register, login, updateUser, deleteUser } = require('../controllers/auth.controller')

router.post('/register/create', register)
router.put('/register/update', updateUser)
router.delete('/register/delete/:role', deleteUser)
router.get('/register/delete/:role', deleteUser)
router.post('/login', login)

GET http://localhost:3000/api/auth/register/getallusers

module.exports = router