const express = require('express')
const bcrypt = require('bcryptjs')
const pool = require('../../controller/db')

const router = express.Router()

// ล็อกอิน
router.post('/', async (req, res) => {
    const { username, password } = req.body
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE username=?', [
            username,
        ])

        if (rows.length === 0) {
            return res.status(400).json({ message: 'ไม่พบบัญชีผู้ใช้' })
        }

        const user = rows[0]
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'รหัสผ่านไม่ถูกต้อง' })
        }

        res.json({ message: 'เข้าสู่ระบบสำเร็จ' })
    } catch (err) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: err.message })
    }
})

module.exports = router
