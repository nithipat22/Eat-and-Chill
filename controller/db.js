const mysql = require('mysql2/promise')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',   //  ถ้าใช้ XAMPP ส่วนมากรหัสผ่านว่าง ชะเพราะXAMPP
    database: 'mydb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

module.exports = pool
