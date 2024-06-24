const express = require("express");
const router = express.Router();
const skillCtrl = require("../controllers/skill.controller");

router
  .get("/", skillCtrl.getProfessionSkills)
  // .post("/get-courses", skillCtrl.getSkillCourses)
  // .post("/saved-courses", skillCtrl.saveSkillCourses)
  // .post("/get-saved-courses", skillCtrl.getSaveCourses);

module.exports = router;
