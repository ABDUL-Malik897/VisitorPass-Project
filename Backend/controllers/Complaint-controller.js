const Complaint = require("../models/Complaint-Model")


exports.getallComplaints = async (req,res) => {
    try{
        const complaints = await Complaint.find()
        res.status(200).json(complaints)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

exports.createComplaint = async (req,res) => {

    const { Name , Email , ComplaintType , Message } = req.body

    let emptyFields = []
    if (!Name) {
        emptyFields.push('Name');
    }if (!Email) {
        emptyFields.push('Email');
    }if(!ComplaintType) {
        emptyFields.push('ComplaintType')
    }if(!Message) {
        emptyFields.push('Message')
    }
    
    
    if (emptyFields.length > 0){
        return res.status(400).json({ error : `${emptyFields.join(', ')} is required`})
    }
    try {
        const complaint = await Complaint.create({ Name , Email , ComplaintType , Message })
        res.status(200).json(complaint)
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}

exports.updateComplaint = async (req,res) => {
    try{
        const complaint = await Complaint.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new : true}
        )
        res.status(200).json(complaint)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

exports.deleteComplaint = async (req,res) => {
    try{
        await Complaint.findByIdAndDelete(req.params.id)
        res.status(200).json('Deleted')
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

