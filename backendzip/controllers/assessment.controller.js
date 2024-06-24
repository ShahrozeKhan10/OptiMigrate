const helperFunction = require("../helper/common");
const assessmentsServices = require("../services/assessments.service");
const httpStatus = require("http-status");

exports.createAssessment = async (req, res, next) => {
  try {
    let response = await assessmentsServices.createAssessment(
      req.body,
      req.decoded.id
    );
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

exports.getAssessments = async (req, res, next) => {
  try {
    let response = await assessmentsServices.getAssessments(req.body);
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

exports.getUserAssessment = async (req, res, next) => {
  try {
    let response = await assessmentsServices.getUserAssessmentWithResult(req.decoded.id);
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

// exports.updateAssessment = async (req, res, next) => {
//   try {
//     let response = await assessmentsServices.updateAssessment(req.body);
//     return helperFunction.apiResponse(response, false, httpStatus.OK, res);
//   } catch (e) {
//     next(e);
//   }
// };
