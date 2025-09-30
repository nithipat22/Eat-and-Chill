const express = require('express');
const bcrypt = require('bcryptjs'); // ใช้เข้ารหัส password
const pool = require('../../controller/db'); // เชื่อม DB จาก db.js

const router = express.Router();

//  POST /api/register
router.post('/', async (req, res) => {
    // ดึงข้อมูลจาก body ที่ส่งมา
    const { fullname, email, password } = req.body;

    // ถ้ากรอกไม่ครบ
    if (!fullname || !email || !password) {
        return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบ' });
    }

    try {
        // เข้ารหัส password ก่อนเก็บ
        const hashed = await bcrypt.hash(password, 10);

        // บันทึกลง database
        await pool.query(
            'INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)',
            [fullname, email, hashed]
        );

        res.json({ message: 'สมัครสมาชิกสำเร็จ' });
    } catch (err) {
        // ถ้า email ซ้ำ จะแจ้ง error
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'อีเมลนี้มีอยู่แล้ว' });
        }

        res.status(500).json({ message: 'มีข้อผิดพลาด', error: err.message });
    }
});

module.exports = router;
