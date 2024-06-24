const helperFunction = require("../helper/common");
const questionServices = require("../services/question.service");
const httpStatus = require("http-status");

exports.getQuestions = async (req, res, next) => {
  try {
    const { country, topic, user, search, page, pageSize } = req.query;
    const { id: userId } = req.decoded;

    const filter = {
      user: user === "true",
      country,
      topic,
      search,
    };
    const options = {
      filter,
      page: page ? +page : 1,
      pageSize: pageSize ? +pageSize : 20,
      userId,
    };

    let response = await questionServices.getQuestions(options);

    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

exports.getQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.decoded;
    let response = await questionServices.getQuestion(id, userId);
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

exports.updateQuestion = async (req, res, next) => {
  try {
    let response = await questionServices.updateQuestion(req.body);
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

exports.createQuestion = async (req, res, next) => {
  try {
    let response = await questionServices.createQuestion(
      req.body,
      req.decoded.id
    );
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};
