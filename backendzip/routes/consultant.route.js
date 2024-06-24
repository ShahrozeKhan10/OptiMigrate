const express = require("express");
const router = express.Router();
const consultantCtrl = require("../controllers/consultant.controller");

router.get("/", consultantCtrl.getConsultants);
router.get("/:id", consultantCtrl.getConsultant);
router.put("/:id", consultantCtrl.updateConsultant);
router.post("/create", consultantCtrl.createConsultant);
router.post("/send-message", consultantCtrl.sendMessageToConsultant);

module.exports = router;
