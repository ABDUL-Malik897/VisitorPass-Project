const jwt = require('jsonwebtoken');
const User = require('../models/User-model')


const requireAuth = async (req,res,next)=>{

    // verify authentication

    const {authorization} = req.headers


    if(!authorization){
        return res.status(401).json({error : "Authentication token required"})
    }

    const token = authorization.split(' ')[1]

    try{
        // console.log("Decoded ID:", _id);
        const {_id} = jwt.verify(token , process.env.SECRET)

        req.user = await User.findById(_id) 
    // console.log("User:", req.user);
        next()


    }catch(error){
        console.error(error);
        // console.error("JWT Error:", error);
        res.status(401).json({error : "Reqest is not authorised"})
        
    }
}


module.exports = requireAuth