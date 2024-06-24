const helperFunction = require("../helper/common");
const visaServices = require("../services/visa.service");
const httpStatus = require("http-status");

exports.getVisas = async (req, res, next) => {
  try {
    let response = await visaServices.getVisas(req.body);
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

exports.getVisa = async (req, res, next) => {
  try {
    const { id } = req.params;
    let response = await visaServices.getVisa(id);
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

exports.updateVisa = async (req, res, next) => {
  try {
    let response = await visaServices.updateVisa(req.body);
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

exports.createVisa = async (req, res, next) => {
  try {
    let response = await visaServices.createVisa(req.body);
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};
