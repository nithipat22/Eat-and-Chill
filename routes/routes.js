const express = require('express');
const router = express.Router();

// import route
const registerRoute = require('../controller/user/registre');
const loginRoute = require('../controller/user/login');

// กำหนด path API
router.use('/register', registerRoute);
router.use('/login', loginRoute);

module.exports = router;
