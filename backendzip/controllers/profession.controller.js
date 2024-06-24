const helperFunction = require("../helper/common");
const professionService = require("../services/profession.service");
const httpStatus = require("http-status");

exports.getProfessions = async (req, res, next) => {
  let { orderBy, page, size, q } = req.query;
  try {
    let response = await professionService.getProfessions(
      orderBy,
      page,
      size,
      q
    );
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

exports.getProfessionsById = async (req, res, next) => {
  let { id } = req.query;
  try {
    let response = await professionService.getProfessionById(id);
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};
