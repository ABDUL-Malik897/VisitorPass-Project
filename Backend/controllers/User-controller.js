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
            role : user.role,
            profilePic: user.profilePic,
            token
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
            role : user.role,
            profilePic: user.profilePic,
            token
        })
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

// const updateProfilePic = async (req, res) => {
//     try {

//         // console.log("Controller reached");
//         // console.log(req.file);

//         const user = await User.findByIdAndUpdate(
//             req.user._id,
//             {
//                 profilePic: `/upload/profilePics/${req.file.filename}`
//             },
//             { new: true }
//         );

//         // console.log(user);

//         res.json({
//             name: user.name,
//             email: user.email,
//             role: user.role,
//             profilePic: user.profilePic,
//             token
//         });

//     } catch (error) {
//         console.error("UPLOAD ERROR:", error);

//         res.status(500).json({
//             error: error.message
//         });
//     }
// };


module.exports = {
    signupUser,
    loginUser
}