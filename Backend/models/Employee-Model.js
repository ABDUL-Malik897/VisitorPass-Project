const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    status : {
        type : String,
        enum : ["Pending" , "Approved" , "Rejected"],
        default : "Pending"
    }
},{timestamps : true});

module.exports = mongoose.model("Employee" , EmployeeSchema)