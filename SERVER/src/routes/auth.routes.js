const express = require('express')
const router = express.Router()
const { register, login, updateUser, deleteUser, getAll } = require('../controllers/auth.controller')

router.post('/register/create', register)
router.put('/register/update', updateUser)
router.delete('/register/delete/:role', deleteUser)
router.get('/register/getallusers', getAll)
router.post('/login', login);

module.exports = router






