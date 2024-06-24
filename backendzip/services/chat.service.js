// @ts-check
const pdf = require("pdf-parse");
const path = require("path");
const httpStatus = require("http-status");
const openai = require("openai");
const { ChatCompletionRequestMessageRoleEnum } = require("openai");
const Sequelize = require("sequelize");
const { Translate } = require("@google-cloud/translate").v2;

const {
  MESSAGE_CODES,
  PAYMENT_STATUS,
  PDF_FILE_SIZE,
  PDF_CHAR_LIMIT,
  COMMON_CHAT_MESSAGE,
} = require("../config/constants");
const { ErrorHandler } = require("../helper/error");
const { Skill, StudyField, Degree } = require("../models");

const assessmentService = require("./assessments.service");
const { getResumeChatCompletion } = require("../helper/chat-completion");
const {
  createSendEmailCommand,
  sesClient,
} = require("./aws-config/aws-config");
const { genericEmailTemplate } = require("../helper/emailTemplates");

const Op = Sequelize.Op;

const configuration = new openai.Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openaiApi = new openai.OpenAIApi(configuration);
const translate = new Translate({
  keyFilename: path.resolve(
    "./config/zindabhag-translation-405600-361423e8f27a.json"
  ),
});

const DegreeMapping = {
  intermediate: "High school or equivalent",
  inter: "High school or equivalent",
  "h.s.c": "High school or equivalent",
  hsc: "High school or equivalent",
  "pre engineering": "High school or equivalent",
  matric: "Matriculation",
  matriculation: "Matriculation",
  ssc: "Matriculation",
  "s.s.c": "Matriculation",
  phd: "Doctorate",
  "p.h.d": "Doctorate",
  masters: "Master",
  ms: "Master",
  mscs: "Master",
  "ms-cs": "Master",
};

const chatService = {
  handleChat: async (body) => {
    console.log(body)
    // Career Summary: "Make a summary with the information of the resume as 3rd person?"
    // CareerPath: "What future steps I can take, and what should i learn to stay ahead in my field, and make my job not affected by AI?"
    const { content, question } = body;

    const completion = await openaiApi.createChatCompletion({
      model: "gpt-3.5-turbo-16k",
      messages: [
        ...COMMON_CHAT_MESSAGE,
        {
          role: ChatCompletionRequestMessageRoleEnum.User,
          content,
        },
        {
          role: ChatCompletionRequestMessageRoleEnum.User,
          content: question,
        },
      ],
      temperature: 0.1,
      // max_tokens: 16385,
    });

    // if (!completion || !completion.data) return false;

    const message = completion?.data?.choices?.[0]?.message?.content || "";

    return message;
  },

  translateSummary: async (textToTranslate) => {
    const [translation] = await translate.translate(textToTranslate, "ur");

    return translation;
  },

  sendFailedEmail: async (emailType, email, content = "") => {
    const sendEmailCommand = createSendEmailCommand({
      emailTemplate: genericEmailTemplate({
        emailType,
        message: content,
      }),
      toAddress: email,
      fromAddress: process.env.AWS_SES_SENDER_EMAIL,
      subject: "ZindaBhag - Assessment Failed",
    });

    await sesClient.send(sendEmailCommand);
  },

  validateFileSize: ({ paymentStatus, file }) => {
    const { payment_status } = paymentStatus || {};
    if (
      payment_status === PAYMENT_STATUS.PAID &&
      file?.size > PDF_FILE_SIZE.PAID
    ) {
      throw new ErrorHandler(
        httpStatus.BAD_REQUEST,
        MESSAGE_CODES.CHAT.premium_file_size_limit_exceeds
      );
    }

    if (
      (paymentStatus === null || payment_status === PAYMENT_STATUS.NOT_PAID) &&
      file?.size > PDF_FILE_SIZE.FREE
    ) {
      throw new ErrorHandler(
        httpStatus.BAD_REQUEST,
        MESSAGE_CODES.CHAT.free_file_size_limit_exceeds
      );
    }
  },

  validateFileContentSize: async ({ paymentStatus, pdfLength }) => {
    const { payment_status, payment_plan_id } = paymentStatus || {};
    console.log(
      "===> validateFileContentSize: ",
      payment_status,
      payment_plan_id
    );
    if (paymentStatus === null || payment_status === PAYMENT_STATUS.NOT_PAID) {
      throw new ErrorHandler(
        httpStatus.BAD_REQUEST,
        MESSAGE_CODES.AUTH.unauthorized_operation
      );
    }

    if (payment_status === PAYMENT_STATUS.PAID) {
      if (payment_plan_id === 2 && pdfLength > PDF_CHAR_LIMIT.PAID_SILVER) {
        throw new ErrorHandler(
          httpStatus.BAD_REQUEST,
          MESSAGE_CODES.CHAT.silver_limit_exceeded
        );
      }
      if (payment_plan_id === 3 && pdfLength > PDF_CHAR_LIMIT.PAID_GOLD) {
        throw new ErrorHandler(
          httpStatus.BAD_REQUEST,
          MESSAGE_CODES.CHAT.gold_limit_exceeded
        );
      }
      if (payment_plan_id === 4 && pdfLength > PDF_CHAR_LIMIT.PAID_PLATINUM) {
        throw new ErrorHandler(
          httpStatus.BAD_REQUEST,
          MESSAGE_CODES.CHAT.platinum_limit_exceeded
        );
      }
    }
  },

  getResumeData: async (file, body) => {
    console.log("getResumeData Called ------->")
    const { paymentStatus } = body;

    await chatService.validateFileSize({ paymentStatus, file });

    return pdf(file.location).then(async (data) => {
      const pdfLength = data.text.length;

      await assessmentService.updateAssessment(
        {
          resume_text_content: data.text,
        },
        body.assessmentId
      );

      await chatService.validateFileContentSize({ paymentStatus, pdfLength });

      // let i = 1;
      // let interval = setInterval(() => console.log("still loading", i++), 5000);

      const completion = await getResumeChatCompletion(
        data.text.replace(/\n/g, " ")
      );
      const resumeContent = (
        completion?.data?.choices?.[0]?.message?.content || ""
      )
        .replace(/\n/g, "")
        .replace(/ \\ /g, "")
        .replace(/\\/g, "");

      // clearInterval(interval);

      const resumeData = JSON.parse(resumeContent);

      let {
        education = [],
        experience = [],
        softSkills = [],
        hardSkills = [],
        certificates = [],
        projects = [],
        location = [],
        interests = [],
      } = resumeData;

      const formattedEducation = [];
      if (!Array.isArray(education)) education = [];
      if (!Array.isArray(softSkills)) softSkills = [];
      if (!Array.isArray(hardSkills)) hardSkills = [];
      if (!Array.isArray(interests)) interests = [];
      const [formattedSoftSkills, formattedHardSkills] = await Promise.all([
        Skill.findAll({
          where: { name: { [Op.in]: softSkills } },
        }),
        Skill.findAll({
          where: { name: { [Op.in]: hardSkills } },
        }),
      ]);

      const formattedExperience = Array.isArray(experience)
        ? experience.map((item) => {
            return {
              ...item,
              endYear: isNaN(item.endYear) ? null : item.endYear,
            };
          })
        : [];

      const formattedCertificate = Array.isArray(certificates)
        ? certificates.map((item) => {
            return {
              ...item,
              endYear: isNaN(item.endYear) ? null : item.endYear,
            };
          })
        : [];

      const formattedProject = Array.isArray(projects)
        ? projects.map((item) => {
            return {
              ...item,
              end_year: isNaN(item.endYear) ? null : item.endYear,
            };
          })
        : [];

      for (const edu of education) {
        const deg = DegreeMapping[edu.degree?.toLowerCase()];
        const degree = await Degree.findOne({
          where: { title: deg || edu.degree },
        });

        // In case if user not mentioned study field in CV,
        // Major cases are in School and college level Education
        // Therefor using from DB
        const studyFieldTitle =
          !edu.studyField || ["N/A", "null"].includes(edu.studyField)
            ? null
            : edu.studyField;
        let query = studyFieldTitle;
        if (studyFieldTitle?.includes("and")) {
          query = { [Op.in]: studyFieldTitle.split("and") };
        } else if (studyFieldTitle?.includes("&")) {
          query = { [Op.in]: studyFieldTitle.split("&") };
        }
        let studyField = await StudyField.findOne({
          where: { title: query },
        });

        // // // NEED TO ADD PROPER SOLUTION
        // // // BECAUSE studyField CAN BE ANYTHING
        if (!studyField) studyField = { id: 158 };

        if (degree?.id) {
          formattedEducation.push({
            studyField,
            degree,
            startYear: edu.startYear,
            endYear: isNaN(edu.endYear) ? null : edu.endYear,
            onGoing: isNaN(edu.endYear),
            university_name: edu.institution,
            location: edu.location,
            grade: edu.grade,
          });
        }
      }

      return {
        formattedEducation,
        formattedExperience,
        formattedSoftSkills,
        formattedHardSkills,
        formattedCertificate,
        formattedProject,
        // profession,
        location,
        // professionCode,
      };
    });
  },
};

module.exports = chatService;
