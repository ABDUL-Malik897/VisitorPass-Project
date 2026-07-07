const express = require('express');
const { getAllVisitors, getVisitor, createVisitor, updatevisitor, deletevisitor , completeVisit } = require('../controllers/Visitors-controllers');

const requireAdmin = require('../middleWare/requireAdmin');
const requireAuth = require('../middleWare/requireAuth');
const upload = require('../middleWare/upload')

const router = express.Router()

router.use(requireAuth)

//todo =====> To get all the visitor
router.get('/', getAllVisitors)


//todo =====> To get the visitor by id 
router.get('/:id',getVisitor)


//todo =====> To add/create the visitor
router.post("/", upload.single("photo"),createVisitor)


//todo =====> User completes visit
router.patch("/complete/:id", requireAuth, completeVisit);


//todo =====> To update a visitor by id
router.patch('/:id', requireAdmin , updatevisitor)


//todo =====> To delete a visitor by id
router.delete('/:id', requireAdmin , deletevisitor)


module.exports = router