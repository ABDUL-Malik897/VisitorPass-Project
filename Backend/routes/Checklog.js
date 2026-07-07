const express = require('express');
const requireAuth = require('../middleWare/requireAuth');
const { scanQR, getLog, getStats } = require('../controllers/Checklog-controller');


const router = express.Router()

router.use(requireAuth)

router.post('/scan',scanQR)
router.get("/logs", getLog)
router.get("/stats", requireAuth, getStats);

module.exports = router