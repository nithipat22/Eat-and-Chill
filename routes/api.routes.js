const express = require('express')
const router = express.Router()
const db = require('../controller/user/db') // ใช้ db.js สำหรับ MySQL

// ดึงสินค้าทั้งหมด
router.get('/products', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM products")
        res.json(rows)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

// ดึงสินค้าตาม id
router.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params
        const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id])
        res.json(rows[0])
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

module.exports = router
