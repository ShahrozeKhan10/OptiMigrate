const helperFunction = require("../helper/common");
const httpStatus = require("http-status");
const scoreCtrl = require("../controllers/score.controller");
const paymentService = require("../services/payment.service");
const { UserCountry } = require("../models");
const { MESSAGE_CODES } = require("../config/constants");
const { ErrorHandler } = require("../helper/error");

exports.getPaymentPlans = async (req, res, next) => {
  try {
    let response = await paymentService.getPaymentPlans();
    helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

exports.initiatePayment = async (req, res, next) => {
  let { priceId, countryIds = [] } = req.body;
  let { id: userId, email } = req.decoded;
  try {
    const data = { userId, email, priceId };
    console.log("=====", data);

    await UserCountry.destroy({ where: { user_id: userId, is_free: false } });
    const userCountryRecords = countryIds.map((country_id) => ({
      is_free: false,
      user_id: userId,
      country_id,
    }));
    // validate count in countryIds
    const x = await UserCountry.bulkCreate(userCountryRecords);
    console.log(x)
    // return helperFunction.apiResponse(x, false, httpStatus.OK, res);

    let response = await paymentService.initiatePayment(data);
    helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

exports.paymentSuccessful = async (req, res, next) => {
  let { sessionId } = req.body;
  let { id: userId, email } = req.decoded;
  const data = { userId, email, sessionId };

  try {
    let response = await paymentService.paymentSuccessful(data);

    const updateAssessmentStatus = true;
    scoreCtrl.getSkillScore(userId, email, updateAssessmentStatus);

    helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    console.log("Error: paymentSuccessful:", e);
    next(e);
  }
};

exports.getUserPaymentStatus = async (req, res, next) => {
  let { id: userId } = req.decoded;
  try {
    let response = await paymentService.getPaymentStatus(userId);
    helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    console.log(e, "response");
    next(e);
  }
};

exports.paymentHook = async (req, res, next) => {
  try {
    let response = await paymentService.paymentHook(req, res);
    helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

exports.cancelPayment = async (req, res, next) => {
  let { id: userId } = req.decoded;
  try {
    let userPayment = await paymentService.getPaymentStatus(userId);
    if (!userPayment?.subscription_id) {
      throw new ErrorHandler(
        httpStatus.NOT_FOUND,
        MESSAGE_CODES.COMMON.record_not_found
      );
    }
    let response = await paymentService.cancelPayment(
      userPayment?.subscription_id
    );
    helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

exports.getUserInvoices = async (req, res, next) => {
  try {
    let { id: userId } = req.decoded;

    let paymentStatus = await paymentService.getPaymentStatus(userId);
    if (!paymentStatus) {
      return helperFunction.apiResponse([], false, httpStatus.OK, res);
    }
    let response = await paymentService.getUserInvoices(
      paymentStatus.customer_id
    );
    helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    console.log(e);
    next(e);
  }
};
