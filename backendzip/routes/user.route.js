const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controller");

router.post(
  "/",
//   uploadToS3bucket("profile").fields([{ name: "image", maxCount: 1 }]),
  userCtrl.createUserProfile
);
router.get("/status", userCtrl.getProfileStatus);
router.put(
  "/",
//   uploadToS3bucket("profile").fields([{ name: "image", maxCount: 1 }]),
  userCtrl.editBasicInfo
);
router.get("/get_full_user_profile", userCtrl.getFullUserProfile);
router.get("/", userCtrl.getUserProfileWithPayment);
router.post("/disclaimer", userCtrl.updateDisclaimerStatus);

// user skills

router.get("/skills", userCtrl.getUserSkills);
router.put("/skills", userCtrl.editUserSkills);
router.delete("/skill/:id", userCtrl.deleteUserSkill);

// user experience

router.post("/experience", userCtrl.addUserExperience);
router.get("/experiences", userCtrl.getUserExperience);
router.get("/experience/:id", userCtrl.getUserExperienceById);
router.put("/experience/:id", userCtrl.editUserExperience);
router.delete("/experience/:id", userCtrl.deleteUserExperience);

// user education

router.get("/education", userCtrl.getUserEducation);
router.get("/education/:id", userCtrl.getUserEducationById);
router.put("/education/:id", userCtrl.editUserEducation);
router.post("/education", userCtrl.addUserEducation);
router.delete("/education/:id", userCtrl.deleteUserEducation);

// user interests

router.get("/interests", userCtrl.getUserInterests);
router.put("/interests", userCtrl.editUserInterests);
router.delete("/interest/:id", userCtrl.deleteUserInterest);

// user projects

router.post(
  "/project",
//   uploadToS3bucket("project").fields([{ name: "image", maxCount: 1 }]),
  userCtrl.addUserProject
);
router.get("/projects", userCtrl.getUserProjects);
router.get("/project/:id", userCtrl.getUserProjectById);
router.put(
  "/project/:id",
//   uploadToS3bucket("project").fields([{ name: "image", maxCount: 1 }]),
  userCtrl.editUserProject
);
router.delete("/project/:id", userCtrl.deleteUserProject);

// user certificates

router.get("/certificates", userCtrl.getUserCertificates);
router.get("/certificate/:id", userCtrl.getUserCertificateById);
router.post("/certificate", userCtrl.addUserCertificate);
router.put("/certificate/:id", userCtrl.editUserCertificate);
router.delete("/certificate/:id", userCtrl.deleteUserCertificate);

module.exports = router;
