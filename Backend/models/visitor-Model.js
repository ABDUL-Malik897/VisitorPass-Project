const mongoose = require('mongoose');

const Schema  = mongoose.Schema


const visitorSchema = new Schema({
    Name : {
        type : String , 
        required : true
    },
    Phone : {
        type : Number,
        required : true
    },
    Email : {
        type : String,
        required :  true
    },
    Purpose : {
        type : String,
        required : true
    },
    Status : {
        type : String,
        default : "Pending",
        required : false
    },
    VisitTime :{
        type : String,
        required : true
    },
    VisitDate :{
        type : Date,
        required : true
    },
    ExpiryTime : {
        type : Date
    },
    VisitEnd :{
        type :Boolean,
        default: false
    }
},{timestamps : true})

module.exports = mongoose.model('VisitorSchema', visitorSchema)