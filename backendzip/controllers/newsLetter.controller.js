const { MESSAGE_CODES } = require("../config/constants");
const helperFunction = require("../helper/common");
const { ErrorHandler } = require("../helper/error");
const newsLetterServices = require("../services/newsLetter.service");
const httpStatus = require("http-status");

exports.getEmailsList = async (req, res, next) => {
  try {
    let response = await newsLetterServices.getEmailList(req.body);
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

exports.subscribe = async (req, res, next) => {
  try {
    await newsLetterServices.subscribe(req.body);
    return helperFunction.apiResponse(
      MESSAGE_CODES.AUTH.subscribed,
      false,
      httpStatus.OK,
      res
    );
  } catch (e) {
    next(e);
  }
};

exports.unsubscribe = async (req, res, next) => {
  try {
    let response = await newsLetterServices.unsubscribe(req.body);

    let message = MESSAGE_CODES.AUTH.unsubscribed;
    if (response === 0) message = MESSAGE_CODES.AUTH.already_unsubscribed;

    return helperFunction.apiResponse(message, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};
