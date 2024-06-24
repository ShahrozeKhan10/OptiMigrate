const httpStatus = require("http-status");
const { ErrorHandler } = require("../helper/error");
const { Topic } = require("../models");

let topicService = {
  getTopics: async (body) => {
    try {
      const topics = await Topic.findAll();
      return topics;
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },
  getTopic: async (id) => {
    try {
      const topics = await Topic.findByPk(id);
      return topics;
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },
  createTopic: async (data) => {
    const { name } = data;
    if (!name) return false;
    try {
      return await Topic.create({ name });
    } catch (e) {
      if (e?.errors?.[0]?.validatorKey === "not_unique") {
        throw new ErrorHandler(
          httpStatus.CONFLICT,
          e?.errors?.[0]?.validatorKey
        );
      }
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },
};

module.exports = topicService;
