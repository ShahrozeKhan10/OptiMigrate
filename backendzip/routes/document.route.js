const express = require("express");
const router = express.Router();
const documentController = require("../controllers/document.controller");
const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

router.post(
  "/uploadAndExtract",
  upload.single("document"),
  documentController.uploadAndExtractDocument
);

module.exports = router;
