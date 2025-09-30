const express = require('express')
const registerRoute = require('../controller/user/register')
const loginRoute = require('../controller/user/login')

const router = express.Router()

router.use('/register', registerRoute)
router.use('/login', loginRoute)

module.exports = router