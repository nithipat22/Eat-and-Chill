const express = require('express');
const router = express.Router();

// import route
const registerRoute = require('../controller/user/registre');
const loginRoute = require('../controller/user/login');

// กำหนด path API
router.use('/register', registerRoute);// สมัครสมาชิก

router.use('/login', loginRoute);// เข้าสู่ระบบ

module.exports = router;
