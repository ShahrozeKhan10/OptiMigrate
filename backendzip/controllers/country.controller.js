const { MESSAGE_CODES } = require("../config/constants");
const helperFunction = require("../helper/common");
const { ErrorHandler } = require("../helper/error");
const countryServices = require("../services/country.service");
const paymentService = require("../services/payment.service");
const httpStatus = require("http-status");

exports.getCountries = async (req, res, next) => {
  try {
    const { groupBy = "" } = req.query;
    let response = await countryServices.getCountries(groupBy);
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

exports.getCountryVideos = async (req, res, next) => {
  try {
    let response = await countryServices.getCountryVideos();
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

exports.getCountryById = async (req, res, next) => {
  try {
    const freemiumCountries = JSON.parse(
      FREEMIUM_COUNTRIES || "[]"
    );

    const countryId = +req.params.id;

    if (!freemiumCountries.includes(+countryId)) {
      let response = await paymentService.getPaymentStatus(req.decoded.id);

      if (!response) {
        throw new ErrorHandler(
          httpStatus.UNAUTHORIZED,
          MESSAGE_CODES.AUTH.unauthorized_country
        );
      }
    }

    let response = await countryServices.getCountryById(
      req.params.id,
      req.decoded.id
    );
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

exports.updateCountryById = async (req, res, next) => {
  try {
    let response = await countryServices.updateCountryById(
      req.body,
      req.params.id
    );
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};
