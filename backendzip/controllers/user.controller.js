// @ts-check
const helperFunction = require("../helper/common");
const userService = require("../services/user.service");
const httpStatus = require("http-status");
const { MESSAGE_CODES } = require("../config/constants");
// const userRecommendedService = require("../services/recommendation.service");

exports.createUserProfile = async (req, res, next) => {
  let { general, skill, experience, education } = req.body;
  let image = JSON.parse(JSON.stringify(req.files));

  let basics;
  let skills;
  let experiences;
  let educations;
  let userImage;

  if (general) basics = JSON.parse(general);
  if (skill) skills = JSON.parse(skill);
  if (experience) experiences = JSON.parse(experience);
  if (education) educations = JSON.parse(education);

  userImage = image ? (image.image ? image.image[0] : null) : null;

  try {
    if (basics) {
      let response = await userService
        .createProfile(
          req.decoded.id,
          basics,
          userImage,
          skills,
          experiences,
          educations,
          res
        )
        .then((user) => user.map((t) => t.get({ plain: true })));
      return helperFunction.apiResponse(response[0], false, httpStatus.OK, res);
    } else {
      return helperFunction.apiResponseWithMessage(
        [],
        MESSAGE_CODES.COMMON.field_missing,
        true,
        httpStatus.BAD_REQUEST,
        res
      );
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
};

exports.getProfileStatus = async (req, res, next) => {
  try {
    let response = await userService.getUserProfileStatus(req.decoded.id);
    helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

exports.editBasicInfo = async (req, res, next) => {
  let { general, remove_image } = req.body;
  // let image = JSON.parse(JSON.stringify(req.files));
  let userImage;
  let user;

  if (general) user = JSON.parse(general);

  userImage = null;

  try {
    let response = await userService.editUserInformation(
      req.decoded.id,
      user,
      userImage,
      remove_image
    );
    // if (user.role === "user") {
    //   userRecommendedService.getRecommendedJobs(req.decoded.id, 10, 0, true);
    //   userRecommendedService.getRecommendedCourses(req.decoded.id, 10, 0, true);
    // }
    helperFunction.apiResponse(response, false, 200, res);
  } catch (e) {
    next(e);
  }
};

exports.getFullUserProfile = async (req, res, next) => {
  const _ = require("lodash");
  try {
    let response = await userService
      .getFullUserProfile(req.decoded.id)
      .then((r) => r.map((t) => t.get({ plain: true })));

    response[0].experience = _.orderBy(
      response[0].experience,
      ["end_year", "start_year", "createdAt"],
      ["desc", "desc", "desc"]
    );
    response[0].education = _.orderBy(
      response[0].education,
      ["end_year", "start_year", "createdAt"],
      ["desc", "desc", "desc"]
    );

    helperFunction.apiResponse(response[0], false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

exports.getUserProfileWithPayment = async (req, res, next) => {
  try {
    const response = await userService.getUserProfileWithPayment(
      req.decoded.id
    );

    helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

exports.updateDisclaimerStatus = async (req, res, next) => {
  try {
    const { acceptedDisclaimer } = req.body;
    const userId = req.decoded.id;

    const response = await userService.updateDisclaimerStatus(
      userId,
      acceptedDisclaimer
    );

    helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

// // user skills

exports.getUserSkills = async (req, res, next) => {
  try {
    let response = await userService.getSkills(req.decoded.id);
    return helperFunction.apiResponse(
      response.user_skills,
      false,
      httpStatus.OK,
      res
    );
  } catch (e) {
    next(e);
  }
};

exports.editUserSkills = async (req, res, next) => {
  let { skill } = req.body;
  let userSkill;

  if (skill) userSkill = JSON.parse(skill);
  try {
    if (userSkill) {
      let response = await userService.editSkills(req.decoded.id, userSkill);
      // TODO: NEEDS REFACTORING
      // userRecommendedService.getRecommendedJobs(req.decoded.id, 10, 0, true);
      // userRecommendedService.getRecommendedCourses(req.decoded.id, 10, 0, true);
      helperFunction.apiResponse(response.user_skills, false, 200, res);
    } else {
      helperFunction.apiResponseWithMessage(
        [],
        MESSAGE_CODES.COMMON.field_missing,
        true,
        httpStatus.BAD_REQUEST,
        res
      );
    }
  } catch (e) {
    next(e);
  }
};

exports.deleteUserSkill = async (req, res, next) => {
  let { id } = req.params;
  try {
    let response = await userService.deleteSkill(req.decoded.id, id);
    // TODO: NEEDS REFACTORING
    // userRecommendedService.getRecommendedJobs(req.decoded.id, 10, 0, true);
    // userRecommendedService.getRecommendedCourses(req.decoded.id, 10, 0, true);
    return helperFunction.apiResponse(
      response.user_skills,
      false,
      httpStatus.OK,
      res
    );
  } catch (e) {
    next(e);
  }
};

// user experience

exports.getUserExperience = async (req, res, next) => {
  try {
    let response = await userService.getExperience(req.decoded.id);
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

exports.getUserExperienceById = async (req, res, next) => {
  let { id } = req.params;
  try {
    let response = await userService.getExperienceById(req.decoded.id, id);
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

exports.addUserExperience = async (req, res, next) => {
  let { experience } = req.body;
  let userExperience;

  if (experience) userExperience = JSON.parse(experience);

  try {
    if (userExperience) {
      let response = await userService.addExperience(
        req.decoded.id,
        userExperience
      );
      return helperFunction.apiResponse(response, false, httpStatus.OK, res);
    } else {
      helperFunction.apiResponseWithMessage(
        [],
        MESSAGE_CODES.COMMON.field_missing,
        true,
        httpStatus.BAD_REQUEST,
        res
      );
    }
  } catch (e) {
    next(e);
  }
};

exports.editUserExperience = async (req, res, next) => {
  let { id } = req.params;
  let { experience } = req.body;
  let userExperience;
  if (experience) userExperience = JSON.parse(experience);
  try {
    if (userExperience) {
      let response = await userService.editExperience(
        req.decoded.id,
        id,
        userExperience
      );
      return helperFunction.apiResponse(response, false, httpStatus.OK, res);
    } else {
      helperFunction.apiResponseWithMessage(
        [],
        MESSAGE_CODES.COMMON.field_missing,
        true,
        httpStatus.BAD_REQUEST,
        res
      );
    }
  } catch (e) {
    next(e);
  }
};

exports.deleteUserExperience = async (req, res, next) => {
  let { id } = req.params;
  try {
    let response = await userService.deleteExperience(req.decoded.id, id);
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

// user education

exports.getUserEducation = async (req, res, next) => {
  try {
    let response = await userService.getEducation(req.decoded.id);
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

exports.getUserEducationById = async (req, res, next) => {
  let { id } = req.params;
  try {
    let response = await userService.getEducationById(req.decoded.id, id);
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

exports.editUserEducation = async (req, res, next) => {
  let { id } = req.params;
  let { education } = req.body;
  let userEducation;
  if (education) userEducation = JSON.parse(education);
  try {
    if (userEducation) {
      let response = await userService.editEducation(
        req.decoded.id,
        id,
        userEducation
      );
      return helperFunction.apiResponse(response, false, httpStatus.OK, res);
    } else {
      helperFunction.apiResponseWithMessage(
        [],
        MESSAGE_CODES.COMMON.field_missing,
        true,
        httpStatus.BAD_REQUEST,
        res
      );
    }
  } catch (e) {
    next(e);
  }
};

exports.addUserEducation = async (req, res, next) => {
  let { education } = req.body;
  let userEducation;

  if (education) userEducation = JSON.parse(education);

  try {
    if (userEducation) {
      let response = await userService.addEducation(
        req.decoded.id,
        userEducation
      );
      return helperFunction.apiResponse(response, false, httpStatus.OK, res);
    } else {
      helperFunction.apiResponseWithMessage(
        [],
        MESSAGE_CODES.COMMON.field_missing,
        true,
        httpStatus.BAD_REQUEST,
        res
      );
    }
  } catch (e) {
    next(e);
  }
};

exports.deleteUserEducation = async (req, res, next) => {
  let { id } = req.params;
  try {
    let response = await userService.deleteEducation(req.decoded.id, id);
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

// user interests

exports.getUserInterests = async (req, res, next) => {
  try {
    let response = await userService.getInterests(req.decoded.id);
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

exports.editUserInterests = async (req, res, next) => {
  let { interest } = req.body;
  let interests;
  if (interest) interests = JSON.parse(interest);
  try {
    if (interests) {
      let response = await userService.editInterests(req.decoded.id, interests);
      return helperFunction.apiResponse(response, false, httpStatus.OK, res);
    } else {
      helperFunction.apiResponseWithMessage(
        [],
        MESSAGE_CODES.COMMON.field_missing,
        true,
        httpStatus.BAD_REQUEST,
        res
      );
    }
  } catch (e) {
    next(e);
  }
};

exports.deleteUserInterest = async (req, res, next) => {
  let { id } = req.params;
  try {
    let response = await userService.deleteInterest(req.decoded.id, id);
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

// user projects

exports.getUserProjects = async (req, res, next) => {
  try {
    let response = await userService.getProjects(req.decoded.id);
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

exports.getUserProjectById = async (req, res, next) => {
  let { id } = req.params;
  try {
    let response = await userService.getProjectById(req.decoded.id, id);
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

exports.addUserProject = async (req, res, next) => {
  let { project } = req.body;
  let image = req.files;
  let userProject;
  let projectImage;

  if (project) userProject = JSON.parse(project);

  projectImage = image ? (image.image ? image.image[0] : null) : null;

  try {
    if (userProject) {
      let response = await userService.addProject(
        req.decoded.id,
        userProject,
        projectImage
      );
      return helperFunction.apiResponse(response, false, httpStatus.OK, res);
    } else {
      helperFunction.apiResponseWithMessage(
        [],
        MESSAGE_CODES.COMMON.field_missing,
        true,
        httpStatus.BAD_REQUEST,
        res
      );
    }
  } catch (e) {
    next(e);
  }
};

exports.editUserProject = async (req, res, next) => {
  let { id } = req.params;
  let { project, remove_image } = req.body;
  let image = req.files;
  let userProject;
  let projectImage;
  if (project) userProject = JSON.parse(project);

  projectImage = image ? (image.image ? image.image[0] : null) : null;
  try {
    if (userProject) {
      let response = await userService.editProject(
        req.decoded.id,
        id,
        userProject,
        projectImage,
        remove_image
      );
      return helperFunction.apiResponse(response, false, httpStatus.OK, res);
    } else {
      helperFunction.apiResponseWithMessage(
        [],
        MESSAGE_CODES.COMMON.field_missing,
        true,
        httpStatus.BAD_REQUEST,
        res
      );
    }
  } catch (e) {
    next(e);
  }
};

exports.deleteUserProject = async (req, res, next) => {
  let { id } = req.params;
  try {
    let response = await userService.deleteProject(req.decoded.id, id);
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

// user certificates

exports.getUserCertificates = async (req, res, next) => {
  try {
    let response = await userService.getCertificates(req.decoded.id);
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

exports.addUserCertificate = async (req, res, next) => {
  let { certificate } = req.body;
  let userCertificate;

  if (certificate) userCertificate = JSON.parse(certificate);
  try {
    if (userCertificate) {
      let response = await userService.addCertificate(
        req.decoded.id,
        userCertificate
      );
      return helperFunction.apiResponse(response, false, httpStatus.OK, res);
    } else {
      helperFunction.apiResponseWithMessage(
        [],
        MESSAGE_CODES.COMMON.field_missing,
        true,
        httpStatus.BAD_REQUEST,
        res
      );
    }
  } catch (e) {
    next(e);
  }
};

exports.getUserCertificateById = async (req, res, next) => {
  let { id } = req.params;
  try {
    let response = await userService.getCertificateById(req.decoded.id, id);
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

exports.editUserCertificate = async (req, res, next) => {
  let { id } = req.params;
  let { certificate } = req.body;
  let userCertificate;
  if (certificate) userCertificate = JSON.parse(certificate);
  try {
    if (userCertificate) {
      let response = await userService.editCertificate(
        req.decoded.id,
        id,
        userCertificate
      );
      return helperFunction.apiResponse(response, false, httpStatus.OK, res);
    } else {
      helperFunction.apiResponseWithMessage(
        [],
        MESSAGE_CODES.COMMON.field_missing,
        true,
        httpStatus.BAD_REQUEST,
        res
      );
    }
  } catch (e) {
    next(e);
  }
};

exports.deleteUserCertificate = async (req, res, next) => {
  let { id } = req.params;
  try {
    let response = await userService.deleteCertificate(req.decoded.id, id);
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};
