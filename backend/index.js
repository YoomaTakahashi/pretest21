require('dotenv').config({path:".env"})
const cors = require('cors')
const express = require('express')
const fileUp = require('express-fileupload')
const app = express()
const path = require('path')

app.use(cors({
    origin:"http://localhost:3000",
    credentials: true
}))
app.use(express.json())
app.use('/uploads',express.static(path.join(__dirname,'./uploads')))
app.use(fileUp())
const auth = require('./routes/auth')
app.use('/api/auth',auth)

app.use((req,res)=> res.json({message:"Route not Found"}))
app.listen(3001,()=>{

    console.log("Server Running On Port 3001");
    
})
