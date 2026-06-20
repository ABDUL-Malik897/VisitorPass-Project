
// Importing packages
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');   
const mongoose = require('mongoose');
const visitorRoutes = require('./routes/visitors')
const userRoutes = require('./routes/user')
const complaintRoutes = require('./routes/Complaint')

dotenv.config()

//expess app
const app = express()

app.use(cors({origin : ["http://localhost:3000","https://visitor-pass-project-x669.vercel.app"],
    credentials : true}))
app.use(express.json())


const port = process.env.PORT
const DB = process.env.MONGO_URL


app.get('/',(req,res)=>{
    res.json({msg : `Welcome to Our Appln`})
})


app.use('/visitors', visitorRoutes)
app.use('/users', userRoutes)
app.use("/complaints",complaintRoutes)


// Connection to Database
mongoose.connect(DB).then(()=>{
    app.listen(port ,()=>{
        console.log(`Running at http://localhost:${port} & Connected to Our Database`);
    })
}).catch((error)=>{
    console.error(error);
})