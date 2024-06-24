const helperFunction = require("../helper/common");
const consultantServices = require("../services/consultant.service");
const httpStatus = require("http-status");

exports.getConsultants = async (req, res, next) => {
  try {
    const { type = "" } = req.query;
    let response = await consultantServices.getConsultants(type);
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

exports.getConsultant = async (req, res, next) => {
  try {
    const { id } = req.params;
    let response = await consultantServices.getConsultant(id);
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

exports.updateConsultant = async (req, res, next) => {
  try {
    const { id } = req.params;
    let response = await consultantServices.updateConsultant(req.body, id);
    return helperFunction.apiResponse(true, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

exports.createConsultant = async (req, res, next) => {
  try {
    let response = await consultantServices.createConsultant(req.body);
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

exports.sendMessageToConsultant = async (req, res, next) => {
  const { id: userId } = req.decoded;
  try {
    let response = await consultantServices.sendMessageToConsultant(
      req.body,
      userId
    );
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};
