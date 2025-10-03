// อันนี้ใช้แสดงสินค้าdb.jsไม่ได้ใช้รวมกับสมัคร
const mysql = require('mysql2/promise')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'eatandchill',   // ใช้สำหรับ products
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

module.exports = pool
