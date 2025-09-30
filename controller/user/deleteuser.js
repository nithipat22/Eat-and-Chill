const express = require('express')
const pool = require('../../controller/db') // ดึง connection มาจาก db.js

const router = express.Router()

// ลบผู้ใช้ตาม username
router.delete('/:username', async (req, res) => {
    const { username } = req.params

    if (!username) {
        return res.status(400).json({ message: 'กรุณาระบุ username ที่ต้องการลบ' })
    }

    try {
        const [result] = await pool.query('DELETE FROM users WHERE username = ?', [
            username,
        ])

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'ไม่พบผู้ใช้ในระบบ' })
        }

        res.json({ message: `ลบผู้ใช้ ${username} สำเร็จ` })
    } catch (err) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: err.message })
    }
})

module.exports = router
