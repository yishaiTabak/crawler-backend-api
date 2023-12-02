const express = require('express')
const cors = require('cors')
const http = require('http')

const app = express()
const server = http.createServer(app);

app.use(cors())
app.use(express.json())

app.use("/", (req,res) =>{
    res.send("ok")
})

module.exports = server