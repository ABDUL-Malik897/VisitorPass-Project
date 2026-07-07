
// Importing packages
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');   
const mongoose = require('mongoose');
const path = require('path');
const visitorRoutes = require('./routes/visitors')
const userRoutes = require('./routes/user')
const complaintRoutes = require('./routes/Complaint')
const CheckLogRoutes = require('./routes/Checklog')
const EmployeeRoutes = require("./routes/Employee")

dotenv.config()

//expess app
const app = express()

app.use(cors({origin : ["http://localhost:3000","https://visitor-pass-project.vercel.app/"],
    credentials : true}))
app.use(express.json())


const port = process.env.PORT
const DB = process.env.MONGO_URL


app.get('/',(req,res)=>{
    res.json({msg : `Welcome to Our Appln`})
})

app.use("/upload", express.static(path.join(__dirname, "uploads")))
app.use('/visitors', visitorRoutes)
app.use('/users', userRoutes)
app.use("/complaints",complaintRoutes)
app.use('/checklog', CheckLogRoutes)
app.use("/employee", EmployeeRoutes)


// Connection to Database
mongoose.connect(DB).then(()=>{
    app.listen(port ,()=>{
        console.log(`Running at http://localhost:${port} & Connected to Our Database`);
    })
}).catch((error)=>{
    console.error(error);
})