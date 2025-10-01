const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../../controller/db');

const router = express.Router();

// เปลี่ยนรหัสผ่าน
router.put('/', async (req, res) => {
    const { username, oldPassword, newPassword } = req.body;

    if (!username || !oldPassword || !newPassword) {
        return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบ' });
    }

    try {
        // ดึงข้อมูล user เดิม
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'ไม่พบผู้ใช้นี้' });
        }

        const user = rows[0];

        // ตรวจสอบรหัสผ่านเก่า
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'รหัสผ่านเก่าไม่ถูกต้อง' });
        }

        // เข้ารหัสรหัสผ่านใหม่
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // อัปเดตใน database
        await pool.query('UPDATE users SET password = ? WHERE username = ?', [hashedPassword, username]);

        res.json({ message: 'เปลี่ยนรหัสผ่านสำเร็จ' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: err.message });
    }
});

module.exports = router;
