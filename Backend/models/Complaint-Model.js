const mongoose = require('mongoose');

const Schema = mongoose.Schema

const ComplaintSchema = new Schema({
    Name : {
        type : String,
        required : true
    },
    Email : {
        type : String,
        required : true
    },
    ComplaintType : {
        type : String,
        required : true
    },
    Message : {
        type : String,
        required : true
    },
    Status : {
        type : String,
        default : "Pending"
    },
    ResolvedAt : {
        type : Date,
        default : null
    }
},{timestamps:true})

module.exports = mongoose.model("Complaint",ComplaintSchema)