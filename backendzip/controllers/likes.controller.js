// @ts-check
const helperFunction = require("../helper/common");
const likesService = require("../services/likes.service");
const questionService = require("../services/question.service");
const replyService = require("../services/replies.service");
const { createNotification } = require("../services/notifications.service");
const httpStatus = require("http-status");
const { NOTIFICATION_TYPES } = require("../config/constants");

exports.reactOnQuestion = async (req, res, next) => {
  try {
    const { questionId, action } = req.params;
    const { id: userId, name } = req.decoded;
    let response;

    if (action === "like") {
      response = await likesService.likeQuestion(userId, questionId);
      let question = await questionService.getQuestion(questionId);

      await createNotification(
        userId, // initiatorUserId,
        question.user_id, // recipientUserId,
        NOTIFICATION_TYPES.QUESTION_LIKE,
        `${name} liked your question`, // content
        JSON.stringify({ questionId: question.id }) // data
      );
    } else if (action === "unlike") {
      response = await likesService.unlikeQuestion(userId, questionId);
    }
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};

exports.reactOnReply = async (req, res, next) => {
  try {
    const { replyId, action } = req.params;
    const { id: userId, name } = req.decoded;
    let response;

    if (action === "like") {
      response = await likesService.likeReply(userId, replyId);
      let reply = await replyService.getAuthorOfReply(replyId);

      await createNotification(
        userId, // initiatorUserId,
        reply.user_id, // recipientUserId,
        NOTIFICATION_TYPES.REPLY_LIKE, // type
        `${name} liked your reply`, // content
        JSON.stringify({ questionId: reply.question_id, replyId: reply.id }) // data
      );
    } else if (action === "unlike") {
      response = await likesService.unlikeReply(userId, replyId);
    }
    return helperFunction.apiResponse(response, false, httpStatus.OK, res);
  } catch (e) {
    next(e);
  }
};
