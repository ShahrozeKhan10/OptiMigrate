const express = require("express");
const router = express.Router();
const paymentCtrl = require("../controllers/payment.controller");

router
  .post("/initiate-payment", paymentCtrl.initiatePayment) // To initiate Payment flow
  .post("/payment-successful", paymentCtrl.paymentSuccessful) // Success URL - frontend calls this api after successful payment
  .post("/get-user-payment-status", paymentCtrl.getUserPaymentStatus) // To get payment status of User
  .post("/webhook", paymentCtrl.paymentHook) // Webhook for Stripe
  .post("/cancel-payment", paymentCtrl.cancelPayment) // Cancel User Payment
  .get("/user-invoices", paymentCtrl.getUserInvoices); // Get User Invoices

module.exports = router;
