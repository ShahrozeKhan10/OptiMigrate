const express = require("express");
const router = express.Router();
const repliesCtrl = require("../controllers/replies.controller");

router.get("/:questionId", repliesCtrl.getRepliesOfQuestion);
router.post("/:questionId/create", repliesCtrl.createReplies);
router.put("/:replyId", repliesCtrl.updateReply);
router.delete("/:replyId", repliesCtrl.deleteReply);

module.exports = router;
