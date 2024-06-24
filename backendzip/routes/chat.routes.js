// Code my
const express = require("express");
const router = express.Router();
const chatCtrl = require("../controllers/chat.controller");
const { uploadToS3bucket } = require("../helper/middleware");

router.post(
  "/get-resume-data",
  uploadToS3bucket("resume").single("file"),
  chatCtrl.getResumeData
);

module.exports = router;
