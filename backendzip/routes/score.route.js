const express = require("express");
const router = express.Router();
const scoreCtrl = require("../controllers/score.controller");
// const validate = require("express-validation");
// const authValidation = require("../routes/validations/auth.validation");
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

router.get("/score", scoreCtrl.getSkillScore);
router.get("/score-result", scoreCtrl.getScore);

module.exports = router;
