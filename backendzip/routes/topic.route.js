const express = require("express");
const router = express.Router();
const topicCtrl = require("../controllers/topic.controller");

router.get("/", topicCtrl.getTopics);
router.get("/:id", topicCtrl.getTopic);
router.post("/create", topicCtrl.createTopic);

module.exports = router;
