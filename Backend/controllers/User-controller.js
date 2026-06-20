const User = require("../models/User-model")
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id} , process.env.SECRET , {expiresIn : '2h'})
}

//* Login Route

const loginUser = async (req,res) =>{

    const { email, password } = req.body

    try{
        const user = await User.login(email , password)

        //*create a token

        const token = createToken(user._id)

        res.status(200).json({
            name : user.name,
            email : user.email,
            token,
            role : user.role
        })
    }catch(error){
        res.status(400).json({error : error.message})
    }
}


//* SignUp pages

const signupUser = async (req,res) =>{
    
    const { name , email, password } = req.body

    try{
        const user = await User.signup(name, email , password)

        //*create a token

        const token = createToken(user._id)

        res.status(200).json({
            name : user.name,
            email : user.email,
            token,
            role : user.role
        })
    }catch(error){
        res.status(400).json({error : error.message})
    }
}


module.exports = {
    signupUser,
    loginUser
}