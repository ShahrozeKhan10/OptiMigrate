const helperFunction = require("../helper/common");
const topicServices = require("../services/topic.service");
const httpStatus = require("http-status");

exports.getTopics = async (req, res, next) => {
  try {
    let response = await topicServices.getTopics(req.body);
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

exports.getTopic = async (req, res, next) => {
  try {
    const { id } = req.params;
    let response = await topicServices.getTopic(id);
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

exports.updateTopic = async (req, res, next) => {
  try {
    let response = await topicServices.updateTopic(req.body);
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

exports.createTopic = async (req, res, next) => {
  try {
    let response = await topicServices.createTopic(req.body);
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};
