const express = require("express");
const router = express.Router();
const assessmentController = require("../controllers/assessment.controller");
const { checkAccess } = require("../helper/middleware");

router.get("/", assessmentController.getAssessments);
router.get("/user", assessmentController.getUserAssessment);
router.post(
  "/",
  checkAccess("assessment_desired_countries"),
  assessmentController.createAssessment
);

module.exports = router;
