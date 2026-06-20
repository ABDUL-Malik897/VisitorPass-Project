const express = require('express');
const router = express.Router()

//* User Controller Functions
const { loginUser, signupUser } = require('../controllers/User-controller');


//? Login Route
router.post('/login', loginUser)


//? SignUp Page
router.post('/signup', signupUser)


module.exports = router