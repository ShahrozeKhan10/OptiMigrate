const express = require('express');
const router = express.Router();
const profCtrl = require('../controllers/profession.controller');
const validate = require('express-validation');
const authValidation = require('../routes/validations/auth.validation');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

router
  .get('/', profCtrl.getProfessions);

module.exports = router;
