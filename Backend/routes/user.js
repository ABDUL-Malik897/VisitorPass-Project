const express = require('express');
const requireAuth = require('../middleWare/requireAuth');
const router = express.Router()

//* User Controller Functions
const { loginUser, signupUser } = require('../controllers/User-controller');

// const upload = require("../middleWare/uploadProfile");


//? Login Route
router.post('/login', loginUser)


//? SignUp Page
router.post('/signup', signupUser)

// router.patch(
// "/profile-picture",
// requireAuth,
// upload.single("profilePic"),
// updateProfilePic
// )

// router.patch("/profile-picture", (req, res) => {
//     return res.json({
//         message: "THIS IS THE PROFILE ROUTE"
//     });
// });


router.use(requireAuth)



module.exports = router