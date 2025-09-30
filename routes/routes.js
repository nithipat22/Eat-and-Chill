const express = require('express')
const router = express.Router()

// import route ของ user
const registerRoute = require('../controller/user/registre')
const loginRoute = require('../controller/user/login')
const deleteUserRoute = require('../controller/user/deleteuser')

// 👉 กำหนด path ของ API
router.use('/register', registerRoute)
router.use('/login', loginRoute)
router.use('/delete', deleteUserRoute)

// export ออกไปให้ server.js ใช้
module.exports = router
