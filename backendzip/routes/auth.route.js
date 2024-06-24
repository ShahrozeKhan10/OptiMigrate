const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth.controller");
const { verifyToken } = require("../helper/middleware");

router
  // .post("/linked-in-authorization", validate(authValidation.linkedInAuthorization), authCtrl.linkedInAuthorization)
  // .post("/social-sign-on", validate(authValidation.register), authCtrl.socialSignOn)
  .post("/register", authCtrl.register)
  .post("/login", authCtrl.login)
  // .post("/logout", authCtrl.logout)
  .post(
    "/forgot-password",
    // validate(authValidation.email),
    authCtrl.forgotPassword
  )
  .post(
    "/validate-request",
    // validate(authValidation.forgotPassRequest),
    authCtrl.forgotPasswordValidation
  )
  // .post(
  //   "/send-verification",
  //   validate(authValidation.email),
  //   authCtrl.sendVerification
  // )
  .post(
    "/validate-email",
    // validate(authValidation.forgotPassRequest),
    authCtrl.validateEmail
  )
  .put("/reset-password", authCtrl.resetPassword)
  // .put("/change-password", verifyToken, authCtrl.changePassword)
  // .post("/is-user", authCtrl.getUserByEmail)
  .post("/resume-profile-creation", verifyToken, authCtrl.resumeProfileCreation);

module.exports = router;
