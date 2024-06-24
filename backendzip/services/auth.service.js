const httpStatus = require("http-status");
const pdf = require("pdf-parse");
const Sequelize = require("sequelize");

const {
  sesClient,
  createSendEmailCommand,
} = require("./aws-config/aws-config");
const userService = require("./user.service");
const attachmentService = require("./attachment.service");
const professionService = require("./profession.service");
const paymentService = require("./payment.service");
const openai = require("openai");
const { ChatCompletionRequestMessageRoleEnum } = require("openai");

const {
  User,
  AuthToken,
  UserSkill,
  Education,
  Experience,
  Certificate,
  Project,
  Country,
  UserCountry,
} = require("../models");
const helper = require("../helper/common");
const { ErrorHandler } = require("../helper/error");
const { MESSAGE_CODES } = require("../config/constants");
const { genericEmailTemplate } = require("../helper/emailTemplates");
const { FREEMIUM_COUNTRIES, USER_APP_ENDPOINT } = require("../config/config");

const Op = Sequelize.Op;
// const fetch = require("node-fetch");

// const configuration = new openai.Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const messages = [
//   {
//     role: ChatCompletionRequestMessageRoleEnum.System,
//     content:
//       "Based on the information by the user, please provide the answer related the information provided.",
//   },
// ];

// const openaiApi = new openai.OpenAIApi(configuration);

let service = {
  createAccount: async (name, email, password, gender) => {
    try {
      const freemiumCountries = JSON.parse(FREEMIUM_COUNTRIES || "[]");

      let user = await User.create({ name, email, password, gender });
      await userService.addUserIdToProfileStatus(user.id);
      await attachmentService.addUserIdToAttachment(user.id);

      const userCountryRecords = freemiumCountries.map((countryId) => ({
        is_free: true,
        user_id: user.id,
        country_id: countryId,
      }));

      await UserCountry.bulkCreate(userCountryRecords);

      user = user ? user.get({ plain: true }) : {};
      delete user.password;
      return user;
    } catch (e) {
      console.log("Auth Service:", e);
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  getUserByEmail: async (email) => {
    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });
      return !!user;
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  sendVerificationEmail: async ({ email, id, name }) => {
    try {
      const UUID = await helper.getUUID();
      await AuthToken.create({ user_id: id, is_active: true, token: UUID });
      const linkToVerify = `${USER_APP_ENDPOINT}/verify?token=${UUID}`;

      const sendEmailCommand = createSendEmailCommand({
        emailTemplate: genericEmailTemplate({
          link: linkToVerify,
          emailType: "signup",
        }),
        toAddress: email,
        fromAddress: process.env.AWS_SES_SENDER_EMAIL,
        subject: "Welcome aboard on ZindaBhag",
      });

      return await sesClient.send(sendEmailCommand);
    } catch (e) {
      console.log("sendVerificationEmail", e);
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  login: async (email, password, doLogin) => {
    try {
      let user = await User.findOne({
        attributes: {
          include: [
            [
              Sequelize.literal(
                `(select percentage from profile_statuses where User.id = profile_statuses.user_id)`
              ),
              "profile_status",
            ],
            // [
            //   Sequelize.literal(
            //     `(select name from professions where professions.id = User.profession_id)`
            //   ),
            //   "profession_name",
            // ],
            [
              Sequelize.literal(
                `(select url from attachments where attachments.user_id = User.id AND type = 'profile')`
              ),
              "image_url",
            ],
          ],
        },
        include: [
          {
            model: Country,
            as: "countries",
            attributes: ["id"],
          },
        ],
        where: {
          email: email,
          status: "active",
        },
        logging: false,
      }).then((user) => (user !== null ? user.get({ plain: true }) : []));

      if (user && user.length !== 0) {
        let validatePassword = await helper.validatePassword(
          password,
          user.password
        );

        if (validatePassword || doLogin) {
          if (!user.email_verified) {
            throw new ErrorHandler(
              httpStatus.UNAUTHORIZED,
              MESSAGE_CODES.AUTH.email_not_verified
            );
          }

          delete user.password;

          user.token = helper.generateJWT(user);
          const paymentData = await paymentService.getPaymentStatus(user.id);
          user = { ...user, paymentData };

          return { data: user, error: false };
        } else {
          throw new ErrorHandler(
            httpStatus.BAD_REQUEST,
            MESSAGE_CODES.AUTH.invalid_password
          );
        }
      } else {
        throw new ErrorHandler(
          httpStatus.BAD_REQUEST,
          MESSAGE_CODES.AUTH.invalid_account
        );
      }
    } catch (e) {
      console.log("ERROR + >", e);
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.errorCode);
    }
  },

  emailExist: async (email, isAdmin) => {
    let user = await User.findOne({
      where: { email: email, role: isAdmin ? "admin" : "user" },
      attributes: ["email", "id", "email_verified", "name", "role"],
      logging: false,
    });

    if (user) {
      return { data: user, error: false, status: httpStatus.OK };
    } else {
      throw new ErrorHandler(
        httpStatus.BAD_REQUEST,
        MESSAGE_CODES.AUTH.invalid_account
      );
    }
  },

  getAuthRequest: async (token) => {
    let request = await AuthToken.findOne({
      where: {
        token: {
          [Op.like]: `%${token}%`,
        },
      },
      raw: true,
    });

    if (request) {
      return {
        data: request,
        message: "Request exists",
        error: false,
        status: 200,
      };
    } else {
      return {
        data: {},
        message: "Request does not exist",
        error: true,
        status: 200,
      };
    }
  },

  authRequestLinkExpiry: async (token, userId) => {
    await AuthToken.update(
      {
        is_active: 0,
      },
      {
        where: {
          token: { [Op.like]: `%${token}%` },
          user_id: userId,
        },
        logging: false,
      }
    );
    return true;
  },

  getUser: async (id) => {
    let user = await User.findOne({
      where: {
        id: id,
      },
      raw: true,
      logging: false,
    });

    if (user) {
      return { data: user, error: false, status: 200 };
    } else {
      return { data: {}, error: true, status: 200 };
    }
  },

  setNewPassword: async (id, password) => {
    let hashPassword = await helper.generateHash(password.toString());
    let response = await User.update(
      {
        password: hashPassword,
      },
      {
        where: {
          id: id,
        },
      }
    );
    if (response) {
      return { data: {}, error: false, status: 200 };
    } else {
      return { data: {}, error: true, status: 200 };
    }
  },

  changeUserPassword: async (id, oldPassword, newPassword) => {
    let user = await User.findOne({
      where: {
        id: id,
      },
      attributes: ["password"],
      raw: true,
      logging: false,
    });
    if (user) {
      let oldPasswordCheck = await helper.validatePassword(
        oldPassword,
        user.password
      );
      if (oldPasswordCheck) {
        let newPasswordCheck = await helper.validatePassword(
          newPassword,
          user.password
        );
        if (newPasswordCheck) {
          throw new ErrorHandler(
            httpStatus.NOT_ACCEPTABLE,
            MESSAGE_CODES.AUTH.same_password
          );
        } else {
          const encryptedPassword = await helper.generateHash(
            newPassword.toString()
          );

          try {
            await User.update(
              {
                password: encryptedPassword,
              },
              {
                where: {
                  id: id,
                },
                logging: false,
              }
            );

            return { data: {}, error: false, status: httpStatus.OK };
          } catch (e) {
            throw new ErrorHandler(httpStatus.INTERNAL_SERVER_ERROR, e.message);
          }
        }
      } else {
        throw new ErrorHandler(
          httpStatus.BAD_REQUEST,
          MESSAGE_CODES.AUTH.invalid_password
        );
      }
    }
  },

  resumeProfileCreation: async (body, user_id) => {
    try {
      const {
        soft_skills = [],
        experience,
        education,
        hard_skills = [],
        certificate = [],
        project = [],
        professionId,
        location,
      } = body;

      await Promise.all([
        UserSkill.destroy({
          where: { user_id },
        }),
        Experience.destroy({
          where: { user_id },
        }),
        Certificate.destroy({
          where: { user_id },
        }),
        Project.destroy({
          where: { user_id },
        }),
        Education.destroy({
          where: { user_id },
        }),
      ]);

      const userSoftSkillsToCreate = soft_skills.map((skill) => ({
        skill_id: skill.id,
        user_id,
        skill_rate: 5,
      }));
      const userHardSkillsToCreate = hard_skills.map((skill) => ({
        skill_id: skill.id,
        user_id,
        skill_rate: 5,
      }));
      const experiences = experience?.map((exp) => {
        return {
          user_id,
          designation: exp.position,
          location: exp.location,
          company: exp.company,
          start_year: exp.startYear,
          end_year: exp.endYear === "PRESENT" ? null : exp.endYear,
          is_working: exp.onGoing,
        };
      });
      const certificates = certificate?.map((cer) => {
        return {
          user_id,
          start_year: cer.startYear,
          end_year: cer.endYear,
          title: cer.title,
          description: cer.description,
          is_continue: cer.onGoing,
        };
      });
      const projects = project?.map((pro) => {
        return {
          user_id,
          title: pro.title,
          company_name: pro.company_name,
          link: pro.link,
          start_year: pro.startYear,
          end_year: pro.endYear,
        };
      });
      const educations = education?.map((edu) => ({
        study_field_id: edu.studyField.id,
        degree_id: edu.degree.id,
        user_id,
        start_year: edu.startYear,
        end_year: edu.endYear === "PRESENT" ? null : edu.endYear,
        is_studying: edu.endYear === "PRESENT" ? true : false,
        university_name: edu.institution || edu.university_name,
        location: edu.location,
        grade: edu.grade,
      }));

      await Promise.allSettled([
        UserSkill.bulkCreate(userSoftSkillsToCreate),
        UserSkill.bulkCreate(userHardSkillsToCreate),
        Experience.bulkCreate(experiences),
        Certificate.bulkCreate(certificates),
        Project.bulkCreate(projects),
        Education.bulkCreate(educations),
      ]);

      const professionDB = await professionService.getProfessionById(
        professionId
      );

      await User.update(
        {
          profession_id: professionDB.id,
          city: `{"name": "${location}"}`,
        },
        {
          where: { id: user_id },
        }
      );

      // const profileStatus = await ProfileStatus.update(
      //   {
      //     general_info: 1,
      //     education: 1,
      //     experience: 1,
      //     skills: 1,
      //     cv: 1,
      //     certificate: 1,
      //     project: 1,
      //     // interest: interest ? 1 : 0,
      //     // percentage: interest ? 100 : 95.0,
      //   },
      //   { where: { user_id } }
      // );

      return {};
    } catch (e) {
      console.log("ERROR: ", e);
      throw new ErrorHandler(
        httpStatus[500],
        MESSAGE_CODES.COMMON.server_error
      );
    }
  },
};

module.exports = service;
