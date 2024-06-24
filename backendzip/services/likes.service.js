const httpStatus = require("http-status");
const { ErrorHandler } = require("../helper/error");
const { Like } = require("../models");
const { MESSAGE_CODES } = require("../config/constants");

let likesService = {
  likeQuestion: async (userId, questionId) => {
    try {
      await Like.create({
        user_id: userId,
        question_id: questionId,
        like_date: new Date(),
      });
      return true;
    } catch (e) {
      console.log(e);
      if (e?.errors?.[0]?.validatorKey === "not_unique") {
        return true;
      }
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  unlikeQuestion: async (userId, questionId) => {
    try {
      const like = await Like.destroy({
        where: {
          user_id: userId,
          question_id: questionId,
        },
      });

      return like;
    } catch (error) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  likeReply: async (userId, replyId) => {
    try {
      await Like.create({
        user_id: userId,
        reply_id: replyId,
        like_date: new Date(),
      });
      return true;
    } catch (error) {
      if (error?.errors?.[0]?.validatorKey === "not_unique") {
        return true;
      }
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  unlikeReply: async (userId, replyId) => {
    try {
      const like = await Like.destroy({
        where: {
          user_id: userId,
          reply_id: replyId,
        },
      });

      return like;
    } catch (error) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },
};

module.exports = likesService;
