const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema  = mongoose.Schema

const userSchema = new Schema({
    name :{
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true,
        unique : true
    },
    password :{
        type : String,
        required : true
    },
    role :{
        type : String,
        default : "user"
    }
})

//? static signup method

userSchema.statics.signup = async function (name, email, password) {
    const exists = await this.findOne({email})

    if(!name || !email || !password){
        throw Error ('All fields are mandatory')
    }

    if (!validator.isEmail(email)) {
        throw Error ('Email not valid')
    }

    if(!validator.isStrongPassword(password)){
        throw Error ('Password not strong')
    }

    if (exists) {
        throw Error('Email already exists!!!')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({name ,email , password : hash , role : 'user'})

    return user
}


//? statics login method

userSchema.statics.login = async function(email , password) {
    if(!email || !password){
        throw Error ("All fields are mandatory")
    }

    const user = await this.findOne({email})

    if (!user) {
        throw Error('Invalid Email')
    }

    const match = await bcrypt.compare(password , user.password)

    if (!match) {
        throw Error ("Invalid Password")
    }

    return user;

}

module.exports = mongoose.model ('User', userSchema)

