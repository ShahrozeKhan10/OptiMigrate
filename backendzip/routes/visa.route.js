const express = require("express");
const router = express.Router();
const visaCtrl = require("../controllers/visa.controller");

router.get("/", visaCtrl.getVisas);
router.get("/:id", visaCtrl.getVisa);
router.post("/create", visaCtrl.createVisa);

module.exports = router;
