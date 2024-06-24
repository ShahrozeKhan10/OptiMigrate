const express = require("express");
const router = express.Router();
const interestCtrl = require("../controllers/interest.controller");

router.get("/", interestCtrl.getInterest);

module.exports = router;
