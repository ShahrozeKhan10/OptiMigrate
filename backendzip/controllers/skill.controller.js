const helperFunction = require("../helper/common");
const skillService = require("../services/skill.service");
const httpStatus = require("http-status");


exports.getProfessionSkills = async (req, res, next) => {
  let {profession_id, type, q, page, size, orderBy} = req.query;
  try {
    q = decodeURIComponent(q);
    let response = await skillService.getSkills(profession_id, type, q, page, size, orderBy);
    return helperFunction.apiResponse(response, false, httpStatus.OK, res, response.count);
  } catch (e) {
    next(e);
  }
};

// exports.getSkillCourses = async (req, res, next) => {
//   const { data } = req.body;
//   try {
//     let response = await skillService.getUserSkills(data.skills);
//     return helperFunction.apiResponse(response, false, httpStatus.OK, res);
//   } catch (e) {
//     next(e);
//   }
// };
// exports.saveSkillCourses = async (req, res, next) => {
//   const { data } = req.body;
//   try {
//     let response = await skillService.saveUserSkills(data.link, data.userId);
//     return helperFunction.apiResponse(response, false, httpStatus.OK, res);
//   } catch (e) {
//     next(e);
//   }
// };

// exports.getSaveCourses = async (req, res, next) => {
//   const { data } = req.body;
//   try {
//     let response = await skillService.getSaveCourses(data.userId);
//     return helperFunction.apiResponse(response, false, httpStatus.OK, res);
//   } catch (e) {
//     next(e);
//   }
// };

