const express = require('express')
const bcrypt = require('bcryptjs')
const pool = require('./db')

const router = express.Router()

router.post('/', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: 'กรุณากรอกอีเมลและรหัสผ่าน' })
    }

    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email])

        if (rows.length === 0) {
            return res.status(404).json({ message: 'ไม่พบบัญชีนี้' })
        }

        const user = rows[0]
        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            return res.status(401).json({ message: 'รหัสผ่านไม่ถูกต้อง' })
        }

        res.json({ message: 'เข้าสู่ระบบสำเร็จ', user: { id: user.id, fullname: user.fullname, email: user.email } })
    } catch (err) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: err.message })
    }
})

module.exports = router
