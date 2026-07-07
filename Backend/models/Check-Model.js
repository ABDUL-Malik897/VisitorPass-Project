const mongoose = require('mongoose');

const ChecklogSchema = new mongoose.Schema(
    {
        Visitor : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Visitor",
            required : true
        },
        CheckIn : {
            type : Date,
            default : null
        },
        CheckOut: {
            type: Date,
            default: null
        },
        Status : {
            type : String,
            enum : ["Checked In" , "Checked Out"],
            default : "Checked In"
        }
    },{timestamps : true}
)

module.exports = mongoose.model("Checklog" , ChecklogSchema)