const httpStatus = require("http-status");
const Sequelize = require("sequelize");
const { ErrorHandler } = require("../helper/error");
const { Reply, User } = require("../models");
const { MESSAGE_CODES } = require("../config/constants");
const questionService = require("./question.service");
const { createNotification } = require("./notifications.service");

let repliesService = {
  getRepliesOfQuestion: async (options) => {
    const { page, pageSize, userId, questionId } = options;
    const offset = (page - 1) * pageSize;

    try {
      const params = {
        where: { question_id: questionId },
        include: [
          {
            model: User,
            as: "user",
            required: true,
            attributes: ["id", "name", "email", "image"],
          },
        ],
      };

      const replies = await Reply.findAndCountAll({
        ...params,
        attributes: [
          "id",
          "description",
          "user_id",
          [
            Sequelize.literal(
              "(SELECT COUNT(*) FROM `likes` AS `likes` WHERE `Reply`.`id` = `likes`.`reply_id`)"
            ),
            "likesCount",
          ],
          [
            Sequelize.literal(
              `(SELECT COUNT(*) FROM \`likes\` WHERE \`likes\`.\`reply_id\` = \`Reply\`.\`id\` AND \`likes\`.\`user_id\` = "${userId}")`
            ),
            "userLiked",
          ],
        ],
        order: [["created_at", "DESC"]],
        offset,
        limit: pageSize,
      });
      return replies;
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  getAuthorOfReply: async (id) => {
    try {
      const reply = await Reply.findByPk(id, {
        include: [
          {
            model: User,
            as: "user",
            required: true,
            attributes: ["id", "name", "email", "image"],
          },
        ],
        logging: true,
      });
      return reply;
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  createReplies: async (data, questionId, userId) => {
    const { description } = data;
    if (!userId || !questionId || !description) return false;
    try {
      // const author = await questionService.getAuthorOfQuestion(questionId);
      const reply = await Reply.create({
        user_id: userId,
        question_id: questionId,
        description,
      });

      // await createNotification(
      //   author.user.id, // initiatorUserId,
      //   userId, // recipientUserId,
      //   "question-reply",
      //   `User replied on your question`,
      //   JSON.stringify(reply)
      // );
      // return { author, reply };

      return reply;
    } catch (e) {
      console.error("Error Creating Replies:", e);
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  updateReply: async (replyId, { description }, userId) => {
    const reply = await Reply.findByPk(replyId);

    if (!reply) {
      throw new ErrorHandler(
        httpStatus.NOT_FOUND,
        MESSAGE_CODES.COMMON.record_not_found
      );
    }
    if (reply.user_id !== userId) {
      throw new ErrorHandler(
        httpStatus.UNAUTHORIZED,
        MESSAGE_CODES.AUTH.unauthorized_operation
      );
    }

    reply.description = description;

    await reply.save();
    return reply;
  },

  deleteReply: async (replyId) => {
    try {
      const reply = await Reply.findByPk(replyId);

      if (!reply) {
        throw new ErrorHandler(
          httpStatus.NOT_FOUND,
          MESSAGE_CODES.COMMON.record_not_found
        );
      }
      if (reply.user_id !== userId) {
        throw new ErrorHandler(
          httpStatus.UNAUTHORIZED,
          MESSAGE_CODES.AUTH.unauthorized_operation
        );
      }
      await reply.destroy();
      return "Reply deleted successfully";
    } catch (error) {
      throw new Error("Failed to delete the reply");
    }
  },
};

module.exports = repliesService;
