const express = require("express");
const router = express.Router();
const likesCtrl = require("../controllers/likes.controller");

router.post("/question/:questionId/:action", likesCtrl.reactOnQuestion);
router.post("/reply/:replyId/:action", likesCtrl.reactOnReply);

module.exports = router;
