const express = require('express');
const bcrypt = require('bcryptjs');  // ใช้ตรวจสอบ password
const pool = require('../../controller/db'); // ดึงการเชื่อม DB

const router = express.Router();

//  POST /api/login
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'กรุณากรอกอีเมลและรหัสผ่าน' });
    }

    try {
        // หา user จาก email
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(400).json({ message: 'ไม่พบบัญชีนี้' });
        }

        const user = rows[0];

        // ตรวจสอบ password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'รหัสผ่านไม่ถูกต้อง' });
        }

        // ถ้าถูกต้อง login สำเร็จ
        res.json({ message: 'เข้าสู่ระบบสำเร็จ', user: { id: user.id, fullname: user.fullname, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: err.message });
    }
});

module.exports = router;
