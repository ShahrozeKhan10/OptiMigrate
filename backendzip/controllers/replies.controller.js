const { NOTIFICATION_TYPES } = require("../config/constants");
const helperFunction = require("../helper/common");
const { createNotification } = require("../services/notifications.service");
const questionService = require("../services/question.service");
const repliesServices = require("../services/replies.service");
const httpStatus = require("http-status");

exports.getRepliesOfQuestion = async (req, res, next) => {
  try {
    const { page, pageSize } = req.query;
    const { questionId } = req.params;
    const { id: userId } = req.decoded;

    const options = {
      userId,
      questionId,
    };
    options.page = page ? +page : 1;
    options.pageSize = pageSize ? +pageSize : 10;

    let response = await repliesServices.getRepliesOfQuestion(options);
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

exports.deleteReply = async (req, res, next) => {
  try {
    const { replyId } = req.params;
    let response = await repliesServices.deleteReply(replyId);
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

exports.updateReply = async (req, res, next) => {
  try {
    const { replyId } = req.params;
    const { id: userId } = req.decoded;
    let response = await repliesServices.updateReply(replyId, req.body, userId);
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

exports.createReplies = async (req, res, next) => {
  try {
    const { questionId } = req.params;
    const { id: userId, name } = req.decoded;

    let reply = await repliesServices.createReplies(
      req.body,
      questionId,
      userId
    );
    let question = await questionService.getQuestion(questionId);

    await createNotification(
      userId, // initiatorUserId
      question.user_id, // recipientUserId,
      NOTIFICATION_TYPES.QUESTION_REPLY,
      `${name} replied to your question.`,
      JSON.stringify({ questionId: question.id, replyId: reply.id }) // data
    );

    return helperFunction.apiResponse(reply, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};
