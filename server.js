const express = require('express')
const app = express()
const port = 3000

// import routes 
const apiRoutes = require('./routes/routes')

app.use(express.json())
app.use(express.static('public'))

// ใช้งาน routes
app.use('/api', apiRoutes)

app.listen(port, () => {
    console.log(`app running on http://localhost:${port}`)
})
