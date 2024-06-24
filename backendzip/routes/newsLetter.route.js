const express = require("express");
const router = express.Router();
const newsLetterCtrl = require("../controllers/newsLetter.controller");
const { verifyToken } = require("../helper/middleware");

router.get("/", verifyToken, newsLetterCtrl.getEmailsList);
router.post("/subscribe", newsLetterCtrl.subscribe);
router.delete("/unsubscribe", newsLetterCtrl.unsubscribe);

module.exports = router;
