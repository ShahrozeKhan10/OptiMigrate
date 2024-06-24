// @ts-check
const httpStatus = require("http-status");
const Sequelize = require("sequelize");
const { QueryTypes } = require("sequelize");
const _ = require("lodash");
const helperFunction = require("../helper/common");
const professionService = require("../services/profession.service");
const attachmentService = require("../services/attachment.service");
const scoreService = require("../services/score.service");
const { ErrorHandler } = require("../helper/error");
const {
  User,
  UserSkill,
  Skill,
  sequelize,
  Education,
  Experience,
  ProfileStatus,
  PaymentStatus,
  Interest,
  Project,
  Certificate,
  UserInterest,
  Country,
} = require("../models");
const paymentService = require("./payment.service");
const db = require("../models/index");
const { MESSAGE_CODES } = require("../config/constants");

let userService = {
  getUserProfileWithPayment: async (id) => {
    const user = await User.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Country,
          as: "countries",
          attributes: ["id"],
        },
      ],
      logging: false,
    }).then((user) => (user !== null ? user.get({ plain: true }) : []));

    const paymentData = await paymentService.getPaymentStatus(id);

    return { ...user, paymentData };
  },

  updateDisclaimerStatus: async (userId, acceptedDisclaimer) => {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new ErrorHandler(
        httpStatus.BAD_REQUEST,
        MESSAGE_CODES.COMMON.record_not_found
      );
    }

    user.terms_accepted = acceptedDisclaimer;
    await user.save();

    return user;
  },

  getUserInfoById: async (id) => {
    const user = await db.sequelize.query(
      `SELECT U.*, P.name as profession_name from users U
        inner join profession_details P
        WHERE U.id = '${id}'`,
      {
        type: QueryTypes.SELECT,
      }
    );
    return user[0];
  },

  updateBasicInfo: async (objectToUpdate) => {
    await User.update(objectToUpdate, { where: { id: objectToUpdate.id } });
  },

  getUserInfoByIdForAdmin: async (id) => {
    let userWithSkill = await db.sequelize.query(
      `SELECT U.*, P.name as profession_name, SK.name as skill_name from users U
        inner join profession_details P on P.id = U.profession_id
        left outer join user_skills USK on USK.user_id = U.id
        left outer join skills SK on SK.id = USK.skill_id
        WHERE U.id = '${id}'`,
      {
        type: QueryTypes.SELECT,
      }
    );
    let user;
    let skills = [];
    for (let u of userWithSkill) {
      skills.push(u.skill_name);
    }
    user = { ...userWithSkill[0], ...{ skills: skills } };
    user.email_verified = user.email_verified !== 0;
    delete user.skill_name;
    delete user.password;
    return user;
  },

  getUserInfoByEmail: async (email) => {
    let user = await User.findOne({
      where: {
        email: email,
      },
      logging: false,
    }).then((user) => (user !== null ? user.get({ plain: true }) : []));
    return user;
  },

  createProfile: async (
    userId,
    userInfo,
    image,
    skill,
    experience,
    education
  ) => {
    let userData;
    let userSkills;
    let experiences;
    let educations;
    let transaction;
    let userImage;

    let profileStatus = {
      general_info: false,
      skills: false,
      experience: false,
      education: false,
    };

    if (image) {
      userImage = image.originalname;
      await attachmentService.updateUserProfileKey(
        userId,
        image.key,
        "profile",
        image.location
      );
    }

    try {
      transaction = await sequelize.transaction();
      userData = await User.update(
        {
          profession_id: userInfo.profession_id,
          dob: userInfo.dob,
          image: userImage,
          city: userInfo.city,
          country: userInfo.country,
        },
        {
          where: {
            id: userId,
          },
        },
        { transaction }
      );
      if (userData[0] === 1) profileStatus.general_info = true;

      if (skill) {
        userSkills = skill.map((obj) => {
          let rate = parseInt(obj.rate);
          return { user_id: userId, skill_id: obj.id, skill_rate: rate };
        });

        await UserSkill.bulkCreate(userSkills, { transaction });
        if (userSkills && userSkills.length > 0) {
          profileStatus.skills = true;
        }
      }

      if (experience) {
        experiences = experience.map((obj) => {
          return {
            user_id: userId,
            designation: obj.designation,
            company: obj.company,
            start_year: obj.start_year,
            start_year_utc: obj.start_year_utc,
            end_year: obj.end_year,
            end_year_utc: obj.end_year_utc,
            is_working: obj.is_working,
            location: obj.location,
          };
        });

        await Experience.bulkCreate(experiences, { transaction });
        if (experiences && experiences.length > 0) {
          profileStatus.experience = true;
        }
      }

      if (education) {
        educations = education.map((obj) => {
          return {
            user_id: userId,
            degree_id: obj.degree_id,
            study_field_id: obj.study_field_id,
            start_year: obj.start_year,
            start_year_utc: obj.start_year_utc,
            end_year: obj.end_year,
            end_year_utc: obj.end_year_utc,
            is_studying: obj.is_studying,
            grade: obj.grade,
            location: obj.location,
            university_name: obj.university_name,
          };
        });

        await Education.bulkCreate(educations, { transaction });
        if (educations && educations.length > 0) {
          profileStatus.education = true;
        }
      }
      await transaction.commit();
      await userService.addProfileStatus(userId, profileStatus);
      // await scoreService.calculateScore(userId);
      return await userService.getFullUserProfile(userId);
    } catch (e) {
      console.log(e);
      if (transaction) await transaction.rollback();
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  getFullUserProfile: async (userId) => {
    try {
      let response = await User.findAll({
        where: {
          id: userId,
        },
        attributes: {
          include: [
            [
              Sequelize.literal(
                `(select name from profession_details where User.profession_id = profession_details.id)`
              ),
              "profession_name",
            ],
            [
              Sequelize.literal(
                `(select percentage from profile_statuses where User.id = profile_statuses.user_id)`
              ),
              "profile_status",
            ],
            [
              Sequelize.literal(
                `(select url from attachments where attachments.user_id = User.id AND type = 'profile')`
              ),
              "image_url",
            ],
            // [
            //   Sequelize.literal(
            //     `(select score from scores where scores.user_id = User.id and type = 'total')`
            //   ),
            //   "total",
            // ],
            // [
            //   Sequelize.literal(
            //     `(select score from scores where scores.user_id = User.id and type = 'emp')`
            //   ),
            //   "employability",
            // ],
            // [
            //   Sequelize.literal(
            //     `(select score from scores where scores.user_id = User.id and type = 'skills')`
            //   ),
            //   "skill_readiness",
            // ],
            // [
            //   Sequelize.literal(
            //     `(select score from scores where scores.user_id = User.id and type = 'future')`
            //   ),
            //   "future_readiness",
            // ],
          ],
          exclude: ["createdAt", "updatedAt", "password"],
        },
        include: [
          {
            model: Skill,
            required: false,
            attributes: {
              include: [
                [
                  Sequelize.literal(
                    `(select weightage from profession_skills where profession_skills.skill_id = user_skills.id AND profession_skills.profession_id = User.profession_id)`
                  ),
                  "weight",
                ],
                [
                  Sequelize.literal(
                    `(SELECT skill_rate FROM user_skills WHERE user_skills.user_id = User.id AND user_skills.skill_id = user_skills.id)`
                  ),
                  "rate",
                ],
              ],
              exclude: ["createdAt", "updatedAt"],
            },
            as: "user_skills",
            through: {
              model: UserSkill,
              attributes: {
                exclude: [
                  "skill_id",
                  "user_id",
                  "skill_rate",
                  "createdAt",
                  "updatedAt",
                ],
              },
              where: {
                user_id: userId,
              },
            },
          },
          {
            model: Experience,
            required: false,
            as: "experience",
            attributes: {
              exclude: ["user_id", "updatedAt"],
            },
            where: {
              user_id: userId,
            },
          },
          {
            model: Education,
            required: false,
            as: "education",
            attributes: {
              include: [
                [
                  Sequelize.literal(
                    `(select title from degrees where degrees.id = education.degree_id)`
                  ),
                  "degree_name",
                ],
                [
                  Sequelize.literal(
                    `(select title from study_fields where study_fields.id = education.study_field_id)`
                  ),
                  "field_name",
                ],
              ],
              exclude: ["user_id", "updatedAt"],
            },
            where: {
              user_id: userId,
            },
          },
          {
            model: Interest,
            required: false,
            as: "user_interests",
            attributes: {
              exclude: ["updatedAt", "createdAt", "type", "rate"],
            },
            through: {
              model: UserInterest,
              attributes: [],
              where: {
                user_id: userId,
              },
            },
          },
          {
            model: Project,
            required: false,
            as: "projects",
            attributes: {
              include: [
                [
                  Sequelize.literal(
                    `(select url from attachments where attachments.project_id = projects.id AND type = 'project')`
                  ),
                  "image_url",
                ],
              ],
              exclude: ["updatedAt", "createdAt", "user_id"],
            },
            where: {
              user_id: userId,
            },
          },
          {
            model: Certificate,
            required: false,
            as: "certificates",
            attributes: {
              exclude: [
                "updatedAt",
                "createdAt",
                "user_id",
                "description",
                "location",
                "start_year",
                "end_year",
                "grade",
                "is_continue",
                "field_name",
                "study_field_id",
              ],
            },
            where: {
              user_id: userId,
            },
          },
        ],
      });

      return response;
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  getUserProfileByRaw: async (userId) => {
    try {
      let userProfile = await sequelize.query(
        `SELECT 
   users.*, professions.name, user_skills.skill_id, skills.name,
   experiences.id as experience_id, experiences.designation, experiences.company, experiences.start_year, experiences.end_year, experiences.is_working,
   education.start_year, education.end_year, education.grade,education.location, degrees.title as degree_name, study_fields.title as specialization
   
FROM
   users inner join professions on users.profession_id = professions.id
   inner join user_skills on user_skills.user_id = '${userId}' 
   inner join skills on skills.id = user_skills.skill_id 
   inner join experiences on experiences.user_id = '${userId}' 
   inner join education on education.user_id = '${userId}'
   inner join degrees on degrees.id = education.degree_id
   inner join study_fields on study_fields.id = education.study_field_id`,
        { type: sequelize.QueryTypes.SELECT }
      );
      return userProfile;
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  addUserIdToProfileStatus: async (userId) => {
    try {
      await ProfileStatus.create({
        user_id: userId,
      });
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  addProfileStatus: async (userId, data) => {
    let count = 0;
    let percentage;

    // from db
    let profile = await userService.getUserProfileStatus(userId);

    // merged two objects
    let profileObject = { ...profile, ...data };

    try {
      if (profileObject.general_info) {
        count++;
      }
      if (profileObject.skills) {
        count++;
      }
      if (profileObject.experience) {
        count++;
      }
      if (profileObject.education) {
        count++;
      }
      if (profileObject.interests) {
        count++;
      }
      if (profileObject.project) {
        count++;
      }
      if (profileObject.certificate) {
        count++;
      }
      if (profileObject.cv) {
        count++;
      }

      percentage = ((count / 8) * 100).toFixed(2);

      await ProfileStatus.update(
        { ...profileObject, percentage },
        {
          where: {
            user_id: userId,
          },
        }
      );
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  getUserProfileStatus: async (userId) => {
    try {
      let status = await ProfileStatus.findOne({
        attributes: {
          include: [
            [
              Sequelize.literal(
                `(select name from users where users.id = ProfileStatus.user_id)`
              ),
              "name",
            ],
            [
              Sequelize.literal(
                `(select email_verified from users where users.id = ProfileStatus.user_id)`
              ),
              "email_verified",
            ],
            [
              Sequelize.literal(
                `(select email from users where users.id = ProfileStatus.user_id)`
              ),
              "email",
            ],
            [
              Sequelize.literal(
                `(select url from attachments where attachments.user_id = ProfileStatus.user_id AND type = 'profile')`
              ),
              "image_url",
            ],
          ],
          exclude: ["user_id", "updatedAt", "createdAt"],
        },
        where: {
          user_id: userId,
        },
      }).then((res) => res.get({ plain: true }));

      return status;
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  editUserInformation: async (userId, basic, image, r_image, adm) => {
    let updatedAttachment;
    let getProfileStatus = {
      general_info: false,
    };
    try {
      if (adm === "1") {
        await User.update(basic, { where: { id: userId } });
        return basic;
      }
      let user = await userService.getUserInfoById(userId);
      if (user.profession_id !== basic.profession_id) {
        await UserSkill.destroy({
          where: {
            user_id: userId,
          },
        });
      }

      let profession = await professionService.getProfessionById(
        user.profession_id
      );
      let status = await userService.getUserProfileStatus(user.id);
      let attachment = await attachmentService.getAllUserAttachmentKey(
        user.id,
        "profile"
      );

      //merged two user objects

      let userObject = { ...user, ...basic };
      if (r_image === "true") {
        userObject.image = "";
        attachment.key &&
          (await helperFunction.deleteItemByKey(attachment.key));
        await attachmentService.updateUserProfileKey(
          user.id,
          "",
          "profile",
          null
        );
      } else {
        if (image) {
          userObject.image = image.originalname;
          updatedAttachment = await attachmentService.updateUserProfileKey(
            user.id,
            image.key,
            "profile",
            image.location
          );
        }
      }
      if (user.id) {
        let userData = await User.update(userObject, {
          where: { id: user.id },
        });
        if (userData[0] === 1) {
          getProfileStatus.general_info = true;
          await userService.addProfileStatus(user.id, getProfileStatus);
        }
        userObject.profile_status = status.percentage;
        userObject.profession_name = profession ? profession.name : "";
        updatedAttachment && updatedAttachment.length
          ? (userObject.image_url = updatedAttachment[0].url)
          : (userObject.image_url = null);
        // await scoreService.calculateScore(userObject.id);
        return userObject;
      }
    } catch (e) {
      console.log(e, "e");
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  // skills

  getSkills: async (userId) => {
    try {
      let user = await userService.getUserInfoById(userId);

      let response = await User.findOne({
        where: {
          id: user.id,
        },
        attributes: [],
        include: [
          {
            model: Skill,
            through: {
              model: UserSkill,
              attributes: [],
              where: {
                user_id: user.id,
              },
            },
            as: "user_skills",
            attributes: {
              include: [
                "name",
                "type",
                [
                  Sequelize.literal(
                    `(select weightage from profession_skills where profession_skills.skill_id = user_skills.id AND profession_skills.profession_id = User.profession_id)`
                  ),
                  "weight",
                ],
                [
                  Sequelize.literal(
                    `(SELECT skill_rate FROM user_skills WHERE user_skills.user_id = User.id AND user_skills.skill_id = user_skills.id)`
                  ),
                  "rate",
                ],
              ],
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });
      return response;
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  addSkill: async (userId, skills) => {
    let userSkill;
    let profileStatus = {
      skills: false,
    };
    try {
      if (skills) {
        userSkill = skills.map((obj) => {
          let rate;
          if (obj.rate) {
            rate = parseInt(obj.rate);
          }
          return {
            user_id: userId,
            skill_id: obj.id,
            skill_rate: rate,
          };
        });
        await UserSkill.bulkCreate(userSkill);
      }
      if (userSkill && userSkill.length > 0) profileStatus.skills = true;
      await userService.addProfileStatus(userId, profileStatus);

      return "skill added";
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  editSkills: async (userId, skills) => {
    let userSkill;
    let transaction;
    let profileStatus = {
      skills: false,
    };
    // console.log({ skills });
    try {
      transaction = await sequelize.transaction();

      await UserSkill.destroy(
        {
          where: {
            user_id: userId,
          },
        },
        { transaction }
      );
      if (skills) {
        userSkill = skills.map((obj) => {
          let rate;
          if (obj.rate) {
            rate = parseInt(obj.rate);
          }
          return {
            user_id: userId,
            skill_id: obj.id,
            skill_rate: rate,
          };
        });
        await UserSkill.bulkCreate(userSkill, { transaction });
      }
      if (userSkill && userSkill.length > 0) profileStatus.skills = true;

      await userService.addProfileStatus(userId, profileStatus);

      transaction.commit();
      // await scoreService.calculateScore(userId);
      return await userService.getSkills(userId);
    } catch (e) {
      if (transaction) transaction.rollback();
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  deleteSkill: async (userId, skillId) => {
    let profileStatus = {
      skills: false,
    };
    try {
      let user = await userService.getUserInfoById(userId);

      await UserSkill.destroy({
        where: {
          skill_id: skillId,
          user_id: user.id,
        },
      });
      let response = await userService
        .getSkills(userId)
        .then((res) => res.get({ plain: true }));
      if (response.user_skills.length === 0) {
        await userService.addProfileStatus(userId, profileStatus);
      }
      // await scoreService.calculateScore(userId);
      return response;
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  // experience

  getExperience: async (userId) => {
    try {
      let user = await userService.getUserInfoById(userId);

      let response = await Experience.findAll({
        where: {
          user_id: user.id,
        },
        raw: true,
        attributes: {
          exclude: ["updatedAt", "user_id"],
        },
      });
      response = _.orderBy(
        response,
        ["end_year", "start_year", "createdAt"],
        ["desc", "desc", "desc"]
      );
      return response;
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  getExperienceById: async (userId, id) => {
    try {
      let user = await userService.getUserInfoById(userId);

      let response = await Experience.findOne({
        where: {
          user_id: user.id,
          id: id,
        },
        attributes: {
          exclude: ["updatedAt", "createdAt", "user_id"],
        },
      });
      return response;
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  getExperienceByDesignationAndCompany: async (userId, des, comp) => {
    try {
      return await Experience.findOne({
        where: {
          user_id: userId,
          designation: des,
          company: comp,
        },
        raw: true,
        attributes: {
          exclude: ["updatedAt", "createdAt", "user_id"],
        },
      });
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  editExperience: async (userId, expId, experience) => {
    try {
      let userExperience = await userService
        .getExperienceById(userId, expId)
        .then((res) => res.get({ plain: true }));

      let experienceObj = { ...userExperience, ...experience };

      await Experience.update(experienceObj, {
        where: {
          id: expId,
          user_id: userId,
        },
      });
      // await scoreService.calculateScore(userId);
      return await userService.getExperience(userId);
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  addExperience: async (userId, experience) => {
    let profileStatus = {
      experience: true,
    };
    try {
      await Experience.create({ ...experience, user_id: userId });
      await userService.addProfileStatus(userId, profileStatus);
      // await scoreService.calculateScore(userId);
      return await userService.getExperience(userId);
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  deleteExperience: async (userId, expId) => {
    let profileStatus = {
      experience: false,
    };
    try {
      let user = await userService.getUserInfoById(userId);

      await Experience.destroy({
        where: {
          id: expId,
          user_id: user.id,
        },
      });
      let response = await userService.getExperience(userId);
      if (response.length === 0) {
        await userService.addProfileStatus(userId, profileStatus);
      }
      // await scoreService.calculateScore(userId);
      return response;
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  // education

  getEducation: async (userId) => {
    try {
      let user = await userService.getUserInfoById(userId);

      let response = await Education.findAll({
        where: {
          user_id: user.id,
        },
        raw: true,
        attributes: {
          include: [
            [
              Sequelize.literal(
                `(select title from degrees where Education.degree_id = degrees.id)`
              ),
              "degree_name",
            ],
            [
              Sequelize.literal(
                `(select title from study_fields where Education.study_field_id = study_fields.id)`
              ),
              "field_name",
            ],
          ],
          exclude: ["updatedAt", "user_id"],
        },
      });
      response = _.orderBy(
        response,
        ["end_year", "start_year", "createdAt"],
        ["desc", "desc", "desc"]
      );
      return response;
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  getEducationById: async (userId, id) => {
    try {
      let user = await userService.getUserInfoById(userId);

      let response = await Education.findAll({
        where: {
          id: id,
          user_id: user.id,
        },
        attributes: {
          include: [
            [
              Sequelize.literal(
                `(select title from degrees where Education.degree_id = degrees.id)`
              ),
              "degree_name",
            ],
            [
              Sequelize.literal(
                `(select title from study_fields where Education.study_field_id = study_fields.id)`
              ),
              "field_name",
            ],
          ],
          exclude: ["updatedAt", "createdAt", "user_id"],
        },
      });
      return response;
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  getEducationByMultipleProp: async (where) => {
    try {
      return await Education.findOne({ where, raw: true });
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  editEducation: async (userId, eduId, education) => {
    try {
      let userEducation = await userService.getEducationById(userId, eduId);

      let educationObj = { ...userEducation, ...education };

      await Education.update(educationObj, {
        where: {
          id: eduId,
          user_id: userId,
        },
      });
      // await scoreService.calculateScore(userId);
      return await userService.getEducation(userId);
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  addEducation: async (userId, education) => {
    let profileStatus = {
      education: true,
    };
    try {
      await Education.create({ ...education, user_id: userId });
      await userService.addProfileStatus(userId, profileStatus);
      // await scoreService.calculateScore(userId);
      return await userService.getEducation(userId);
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  deleteEducation: async (userId, eduId) => {
    let profileStatus = {
      education: false,
    };
    try {
      let user = await userService.getUserInfoById(userId);

      await Education.destroy({
        where: {
          id: eduId,
          user_id: user.id,
        },
      });
      let response = await userService.getEducation(userId);
      if (response.length === 0) {
        await userService.addProfileStatus(userId, profileStatus);
      }
      // await scoreService.calculateScore(userId);
      return response;
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  // interests

  getInterests: async (userId) => {
    try {
      let response = await Interest.findAll({
        attributes: {
          exclude: ["updatedAt", "createdAt", "type", "rate"],
        },
        include: [
          {
            model: User,
            through: {
              model: UserInterest,
              attributes: [],
              where: {
                user_id: userId,
              },
            },
            as: "user_interests",
            where: {
              id: userId,
            },
            attributes: [],
          },
        ],
      });
      return response;
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  editInterests: async (userId, interests) => {
    let userInterests;
    let transaction;

    let profileStatus = {
      interests: false,
    };

    try {
      transaction = await sequelize.transaction();
      let user = await userService.getUserInfoById(userId);
      await UserInterest.destroy(
        {
          where: {
            user_id: user.id,
          },
        },
        { transaction }
      );

      if (interests) {
        userInterests = interests.map((obj) => {
          return {
            user_id: user.id,
            interest_id: obj.id,
          };
        });
        await UserInterest.bulkCreate(userInterests, { transaction });
      }

      if (userInterests && userInterests.length > 0)
        profileStatus.interests = true;

      await userService.addProfileStatus(userId, profileStatus);
      transaction.commit();
      return await userService.getInterests(user.id);
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  deleteInterest: async (userId, interestId) => {
    let profileStatus = {
      interests: false,
    };
    try {
      await UserInterest.destroy({
        where: {
          interest_id: interestId,
          user_id: userId,
        },
      });
      let response = await userService
        .getInterests(userId)
        .then((edu) => edu.map((t) => t.get({ plain: true })));
      if (response.length === 0) {
        await userService.addProfileStatus(userId, profileStatus);
      }
      return response;
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  // projects

  getProjects: async (userId) => {
    try {
      let user = await userService.getUserInfoById(userId);
      let response = await Project.findAll({
        where: {
          user_id: user.id,
        },
        attributes: {
          include: [
            [
              Sequelize.literal(
                `(select url from attachments where attachments.project_id = Project.id AND type = 'project')`
              ),
              "image_url",
            ],
          ],
          exclude: ["updatedAt", "createdAt", "user_id"],
        },
      });
      // await scoreService.calculateScore(userId);
      console.log("projects response:", response);
      return response;
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  getProjectById: async (userId, projectId) => {
    try {
      let response = await Project.findOne({
        where: {
          id: projectId,
          user_id: userId,
        },
        attributes: { exclude: ["user_id", "updatedAt", "createdAt"] },
        raw: true,
      });
      return response;
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  addProject: async (userId, project, projectImage) => {
    let image;
    let userProject;
    let profileStatus = {
      project: false,
    };
    try {
      let user = await userService.getUserInfoById(userId);

      if (projectImage) {
        image = projectImage.originalname;
      }

      userProject = await Project.create({
        ...project,
        image,
        user_id: user.id,
      });

      if (projectImage) {
        await attachmentService.createUserProjectKey(
          user.id,
          userProject.dataValues.id,
          projectImage.key,
          "project",
          projectImage.location
        );
      }

      if (userProject) profileStatus.project = true;

      await userService.addProfileStatus(user.id, profileStatus);
      // await scoreService.calculateScore(user.id);
      return await userService.getProjects(user.id);
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  editProject: async (userId, projectId, project, image, r_image) => {
    try {
      let userProject = await userService.getProjectById(userId, projectId);
      let attachment = await attachmentService.getUserProjectKey(
        userId,
        projectId
      );
      let projectObj = { ...userProject, ...project };

      if (r_image === "true") {
        projectObj.image = "";
        await helperFunction.deleteItemByKey(attachment.key);
        await attachmentService.updateUserProjectKey(
          userId,
          projectId,
          "",
          null,
          "project"
        );
      } else {
        if (image) {
          projectObj.image = image.originalname;
          await attachmentService.updateUserProjectKey(
            userId,
            projectId,
            image.key,
            image.location,
            "project"
          );
        }
      }

      await Project.update(projectObj, {
        where: {
          id: projectId,
          user_id: userId,
        },
      });
      // await scoreService.calculateScore(userId);
      return await userService.getProjects(userId);
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  deleteProject: async (userId, projectId) => {
    let profileStatus = {
      project: false,
    };
    try {
      await attachmentService.deleteUserProjectKey(projectId, userId);
      await Project.destroy({
        where: {
          id: projectId,
          user_id: userId,
        },
      });
      let response = await userService
        .getProjects(userId)
        .then((res) => res.map((t) => t.get({ plain: true })));
      if (response.length === 0) {
        await userService.addProfileStatus(userId, profileStatus);
      }
      // await scoreService.calculateScore(userId);
      return response;
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  // certificates

  getCertificates: async (userId) => {
    try {
      let user = await userService.getUserInfoById(userId);
      let response = await Certificate.findAll({
        where: {
          user_id: user.id,
        },
        attributes: {
          exclude: [
            "updatedAt",
            "createdAt",
            "user_id",
            "description",
            "location",
            "start_year",
            "end_year",
            "grade",
            "is_continue",
            "field_name",
            "study_field_id",
          ],
        },
      });
      return response;
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  addCertificate: async (userId, certificate) => {
    let profileStatus = {
      certificate: false,
    };
    try {
      let userCertificate = await Certificate.create({
        ...certificate,
        user_id: userId,
      });

      if (userCertificate) profileStatus.certificate = true;

      await userService.addProfileStatus(userId, profileStatus);
      // await scoreService.calculateScore(userId);

      return await userService.getCertificates(userId);
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  getCertificateById: async (userId, certId) => {
    try {
      let response = await Certificate.findOne({
        where: {
          id: certId,
          user_id: userId,
        },
        attributes: {
          include: [
            [
              Sequelize.literal(
                `(title from study_fields where study_fields.id = Certificate.study_field_id)`
              ),
              "field_name",
            ],
          ],
          exclude: ["updatedAt", "createdAt", "user_id"],
        },
      });
      return response;
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  editCertificate: async (userId, certId, certificate) => {
    try {
      let userCertificate = await userService.getCertificateById(
        userId,
        certId
      );

      let certificateObj = { ...userCertificate, ...certificate };

      await Certificate.update(certificateObj, {
        where: {
          id: certId,
          user_id: userId,
        },
      });
      // await scoreService.calculateScore(userId);
      return await userService.getCertificates(userId);
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  deleteCertificate: async (userId, certId) => {
    let profileStatus = {
      certificate: false,
    };
    try {
      await Certificate.destroy({
        where: {
          id: certId,
          user_id: userId,
        },
      });
      let response = await userService
        .getCertificates(userId)
        .then((res) => res.map((t) => t.get({ plain: true })));
      if (response.length === 0) {
        await userService.addProfileStatus(userId, profileStatus);
      }
      // await scoreService.calculateScore(userId);
      return response;
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },
};

module.exports = userService;
