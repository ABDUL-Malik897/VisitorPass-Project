const mongoose = require('mongoose');
const visitorModel = require('../models/visitor-Model');

// const Visitors = require('../models/visitor-Model') 


exports.getAllVisitors = async (req,res) => {
    try{
        const visitors = await visitorModel.find({}).sort({createdAt:-1})
        res.status(200).json(visitors)
    }catch(error){
        res.status(400).json({ error: error.message })
    }
};


exports.getVisitor = async (req,res) => {

    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error : `No visitor with ${id} `})
    }

    const visitor = await visitorModel.findById(id)
    if(!visitor){
        return res.status(400).json({error : error.message})
    }
    res.status(200).json(visitor)
};


exports.createVisitor = async (req,res) => {

    const { Name , Phone , Email , Purpose , VisitTime , VisitDate , ExpiryTime } = req.body

    let emptyFields = []
    if (!Name) {
        emptyFields.push('Name');
    }if (!Phone) {
        emptyFields.push('Phone');
    }if (!Email) {
        emptyFields.push('Email');
    }if(!Purpose) {
        emptyFields.push('purpose')
    }if(!VisitTime) {
        emptyFields.push('VisitTime')
    }if(!VisitDate) {
        emptyFields.push('VisitDate')
    }
    
    if (emptyFields.length > 0){
        return res.status(400).json({ error : `${emptyFields} is required`})
    }

    try{
        const visitor = await visitorModel.create({Name , Phone , Email , Purpose , VisitTime , VisitDate , ExpiryTime })
        res.status(200).json(visitor)
    }catch(error){
        res.status(400).json({error : error.message})
    }
};


exports.deletevisitor = async (req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error : `No visitor with ${id} id`})
    }

    const visitor = await visitorModel.findByIdAndDelete({_id : id})

    if(!visitor){
        return res.status(400).json({ error : `No Such  Visitor Exists`})
    }
    res.status(200).json(visitor)
};


exports.updatevisitor = async (req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error : `No visitor with ${id} id`})
    }

    const visitor = await visitorModel.findByIdAndUpdate({_id : id},{...req.body},{new : true})

    if(!visitor){
        return res.status(400).json({ error : `No Such  Visitor Exists`})
    }
    res.status(200).json(visitor)
};