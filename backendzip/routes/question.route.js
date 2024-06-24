const express = require("express");
const router = express.Router();
const questionCtrl = require("../controllers/question.controller");

router.get("/", questionCtrl.getQuestions);
router.get("/:id", questionCtrl.getQuestion);
router.post("/create", questionCtrl.createQuestion);

module.exports = router;
