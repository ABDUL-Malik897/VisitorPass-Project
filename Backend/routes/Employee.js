const express = require('express');
const requireAdmin = require("../middleWare/requireAdmin")
const requireAuth = require('../middleWare/requireAuth');
const { MakeEmp ,AllEmps , EmpReq ,updateEmp , deleteEmp , approveEmp , empLogin } = require('../controllers/Employee-controller');

const router = express.Router()
// router.use(requireAuth)
// router.use(requireAdmin)


router.post("/request" , MakeEmp);
router.post("/login", empLogin);
router.get("/", requireAuth, requireAdmin, AllEmps);
router.get("/:id", requireAuth, requireAdmin, EmpReq);
router.patch("/:id", requireAuth, requireAdmin, updateEmp);
router.delete("/:id", requireAuth, requireAdmin, deleteEmp);
router.patch("/approve/:id",requireAuth,requireAdmin, approveEmp);

module.exports = router