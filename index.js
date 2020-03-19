const express = require('express')
const setUpDb = require('./config/dataBase')
const router = require('./config/routes')
const app = express()
const port = 3030

app.use(express.json())
app.use('/', router)
setUpDb()

app.listen(port,()=>{
    console.log('listening on port ', port)
})