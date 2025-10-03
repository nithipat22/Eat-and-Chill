const express = require('express')
const app = express()
const port = 3000

// import routes 
const userRoutes = require('./routes/routes')     //  อันนี้สำหรับ login/register
const apiRoutes = require('./routes/api.routes') //  อันนี้สำหรับสินค้า

app.use(express.json())
app.use(express.static('public'))

// ใช้งาน routes
app.use('/user', userRoutes);   //  http://localhost:3000/user/login
app.use('/api', apiRoutes) //  http://localhost:3000/api/products


app.listen(port, () => {
    console.log(`app running on http://localhost:${port}`)
})
