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

const member = require('./routes/Staff/member')
app.use('/api/Staff/member',member)

const topic = require('./routes/Staff/topic')
app.use('/api/Staff/topic',topic)

const indicate = require('./routes/Staff/indicate')
app.use('/api/Staff/indicate',indicate)

const system = require('./routes/Staff/system')
app.use('/api/Staff/system',system)

const eva = require('./routes/Staff/eva')
app.use('/api/Staff/eva',eva)

const commit = require('./routes/Staff/commit')
app.use('/api/Staff/commit',commit)

app.use((req,res)=> res.json({message:"Route not Found"}))
app.listen(3001,()=>{

    console.log("Server Running On Port 3001");
    
})
