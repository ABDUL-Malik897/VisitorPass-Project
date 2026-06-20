const express = require('express');
const { getAllVisitors, getVisitor, createVisitor, updatevisitor, deletevisitor } = require('../controllers/Visitors-controllers');


const router = express.Router()

//todo =====> To get all the visitor
router.get('/', getAllVisitors)


//todo =====> To get the visitor by id 
router.get('/:id',getVisitor)


//todo =====> To add/create the visitor
router.post("/",createVisitor)


//todo =====> To update a visitor by id
router.patch('/:id',updatevisitor)


//todo =====> To delete a visitor by id
router.delete('/:id',deletevisitor)


module.exports = router