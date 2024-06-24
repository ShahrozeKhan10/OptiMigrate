const httpStatus = require("http-status");
const { ErrorHandler } = require("../helper/error");
const { EmailList, UserTests } = require("../models");
const { MESSAGE_CODES } = require("../config/constants");

let emailListService = {
  getEmailList: async () => {
    try {
      const emails = await EmailList.findAll();
      return emails;
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },
  subscribe: async (data) => {
    const { email } = data;
    if (!email) return false;
    try {
      const data = await EmailList.create({ email });
      return data;
    } catch (e) {
      if (e?.errors?.[0]?.validatorKey === "not_unique") {
        throw new ErrorHandler(
          httpStatus.CONFLICT,
          MESSAGE_CODES.AUTH.already_subscribed
        );
      }
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },
  unsubscribe: async (data) => {
    const { email } = data;
    if (!email) return false;
    try {
      return EmailList.destroy({ where: { email } });
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },
};

module.exports = emailListService;
