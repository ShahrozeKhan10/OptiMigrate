const httpStatus = require("http-status");
const { ErrorHandler } = require("../helper/error");
const { Consultant, UserConsultantInteractions } = require("../models");
const { genericEmailTemplate } = require("../helper/emailTemplates");
const {
  createSendEmailCommand,
  sesClient,
} = require("./aws-config/aws-config");
const { MESSAGE_CODES } = require("../config/constants");

let consultantService = {
  getConsultants: async (type) => {
    const params = {};
    if (["consultant", "country_expert"].includes(type)) {
      params.where = { type };
    }
    try {
      return Consultant.findAll(params);
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },
  getConsultant: async (id) => {
    try {
      return Consultant.findByPk(id);
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },
  updateConsultant: async (data, id) => {
    try {
      return Consultant.update(data, { where: { id } });
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },
  createConsultant: async (data) => {
    const {
      name,
      email,
      short_description,
      picture,
      bio,
      url,
      countryId,
      type,
    } = data;

    try {
      if (
        !countryId ||
        !name ||
        !email ||
        !short_description ||
        !picture ||
        !bio ||
        !url ||
        !["consultant", "country_expert"].includes(type)
      ) {
        throw new ErrorHandler(
          httpStatus.BAD_REQUEST,
          MESSAGE_CODES.COMMON.validation
        );
      }
      return Consultant.create({ ...data, country_id: countryId });
    } catch (e) {
      console.log(e);
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },
  sendMessageToConsultant: async (data, user_id) => {
    const { email, message, consultantId: consultant_id } = data;

    if (!email || !message) return false;

    try {
      const consultant = await consultantService.getConsultant(consultant_id);

      if (!consultant) {
        throw new ErrorHandler(
          httpStatus[400],
          MESSAGE_CODES.AUTH.invalid_format
        );
      }
      await UserConsultantInteractions.create({
        ...data,
        user_id,
        consultant_id,
      });

      const sendEmailCommand = createSendEmailCommand({
        emailTemplate: genericEmailTemplate({
          emailType: "userConsultantInteraction",
          email,
          message,
        }),
        toAddress: consultant?.email,
        fromAddress: process.env.AWS_SES_SENDER_EMAIL,
        toBccAddress: process.env.AWS_SES_BCC_REFERRAL_EMAIL,
        subject: "ZindaBhag - New Message from a User",
      });

      await sesClient.send(sendEmailCommand);

      return true;
    } catch (e) {
      console.log("ERROR sendMessageToConsultant: ", e);
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },
};

module.exports = consultantService;
