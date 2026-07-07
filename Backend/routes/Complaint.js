const express = require('express');
const requireAuth = require('../middleWare/requireAuth');

const { getallComplaints, updateComplaint, createComplaint, deleteComplaint } = require('../controllers/Complaint-controller');

const router = express.Router()

router.use(requireAuth)

router.get("/",getallComplaints)

router.post("/", createComplaint)

router.patch('/:id',updateComplaint)

router.delete("/",deleteComplaint)

module.exports = router