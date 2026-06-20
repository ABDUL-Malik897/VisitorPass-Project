const express = require('express');
const { getallComplaints, updateComplaint, createComplaint, deleteComplaint } = require('../controllers/Complaint-controller');

const router = express.Router()



router.get("/",getallComplaints)

router.post("/", createComplaint)

router.patch('/:id',updateComplaint)

router.delete("/",deleteComplaint)

module.exports = router