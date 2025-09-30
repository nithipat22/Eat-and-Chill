const express = require('express')
const bcrypt = require('bcryptjs')
const pool = require('../../controller/db') // db.js

const router = express.Router()

// สมัครสมาชิก
router.post('/', async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบ' })
    }

    try {
        const hashed = await bcrypt.hash(password, 10)
        await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [
            username,
            hashed,
        ])
        res.json({ message: 'สมัครสมาชิกสำเร็จ' })
    } catch (err) {
        res.status(500).json({ message: 'มีข้อผิดพลาด', error: err.message })
    }
})

module.exports = router
