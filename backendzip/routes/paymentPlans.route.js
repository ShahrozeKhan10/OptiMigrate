const express = require("express");
const router = express.Router();
const paymentCtrl = require("../controllers/payment.controller");

router.get("/plans", paymentCtrl.getPaymentPlans);

module.exports = router;
