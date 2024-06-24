const httpStatus = require("http-status");
const Sequelize = require("sequelize");
const { ErrorHandler } = require("../helper/error");
const {
  Country,
  Question,
  QuestionTopic,
  Topic,
  User,
  UserCountry,
} = require("../models");
const { FREEMIUM_COUNTRIES } = require("../config/config");

const Op = Sequelize.Op;

let questionService = {
  getQuestions: async (options) => {
    const { page, pageSize, filter, userId } = options;
    const { user, country, topic, search } = filter;
    const offset = (page - 1) * pageSize;

    console.log(options);
    console.log({ page, offset, pageSize });

    let where = {};

    try {
      const include = [
        {
          model: User,
          as: "user",
          required: true,
          attributes: ["id", "name", "email", "image"],
        },
        {
          model: Topic,
          as: "topics",
          required: false,
        },
        {
          model: Country,
          as: "country",
          required: true,
          attributes: ["id", "name", "name_ur", "flag"],
        },
      ];

      // FILTERS (user, country, topic, search)
      // User filter
      if (user) {
        where.user_id = userId;
      }

      // Country filter
      let countries;
      const freemiumCountries = JSON.parse(FREEMIUM_COUNTRIES || "[]");
      let countryWhere = { user_id: userId, country_id: freemiumCountries };
      if (country) {
        countryWhere.country_id = country;
      }

      // Fetch User Accessible Countries with country's filter
      countries = await UserCountry.findAll({
        attributes: ["country_id", "user_id"],
        where: { ...countryWhere },
      });
      countries = countries.map((t) => t.get({ plain: true }).country_id);

      where.country_id = countries;

      // Search filter
      if (search) {
        where = {
          ...where,
          [Op.or]: [
            {
              title: { [Op.like]: `%${search}%` },
            },
            {
              description: { [Op.like]: `%${search}%` },
            },
          ],
        };
      }
      // Topics filter
      if (topic) {
        let qt = await QuestionTopic.findAll({
          where: { topic_id: topic },
        });
        const questionIds = qt.map((t) => t.get({ plain: true }).question_id);

        where = {
          ...where,
          id: questionIds,
        };
      }

      const count = await Question.count({ where });

      const params = { where, include, logging: false };
      const rows = await Question.findAll({
        ...params,
        attributes: [
          "id",
          "title",
          "description",
          "user_id",
          "country_id",
          "created_at",
          [
            Sequelize.literal(
              "(SELECT COUNT(*) FROM `replies` AS `replies` WHERE `Question`.`id` = `replies`.`question_id`)"
            ),
            "repliesCount",
          ],
          [
            Sequelize.literal(
              "(SELECT COUNT(*) FROM `likes` AS `likes` WHERE `Question`.`id` = `likes`.`question_id`)"
            ),
            "likesCount",
          ],
          [
            Sequelize.literal(
              `(SELECT COUNT(*) FROM \`likes\` WHERE \`likes\`.\`question_id\` = \`Question\`.\`id\` AND \`likes\`.\`user_id\` = "${userId}")`
            ),
            "userLiked",
          ],
        ],
        offset,
        limit: pageSize,
        order: [["created_at", "DESC"]],
      });
      return { count, rows };
    } catch (e) {
      console.log(e);
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  getQuestion: async (id, userId) => {
    try {
      const attributes = [
        "id",
        "title",
        "description",
        "user_id",
        "country_id",
        [
          Sequelize.literal(
            "(SELECT COUNT(*) FROM `replies` AS `replies` WHERE `Question`.`id` = `replies`.`question_id`)"
          ),
          "repliesCount",
        ],
        [
          Sequelize.literal(
            "(SELECT COUNT(*) FROM `likes` AS `likes` WHERE `Question`.`id` = `likes`.`question_id`)"
          ),
          "likesCount",
        ],
      ];
      if (userId)
        attributes.push([
          Sequelize.literal(
            `(SELECT COUNT(*) FROM \`likes\` WHERE \`likes\`.\`question_id\` = \`Question\`.\`id\` AND \`likes\`.\`user_id\` = "${userId}")`
          ),
          "userLiked",
        ]);
      const questions = await Question.findByPk(id, {
        attributes,
        include: [
          {
            model: User,
            as: "user",
            required: true,
            attributes: ["id", "name", "email", "image"],
          },
          {
            model: Topic,
            as: "topics",
            required: true,
          },
          {
            model: Country,
            as: "country",
            required: true,
            attributes: ["id", "name", "name_ur", "flag"],
          },
        ],
        logging: false,
      });
      return questions;
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  getAuthorOfQuestion: async (id) => {
    try {
      const question = await Question.findByPk(id, {
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
      return question;
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  createQuestion: async (data, userId) => {
    const { title, description, countryId, topicIds } = data;
    if (!title || !description || !countryId || !topicIds?.length)
      throw new ErrorHandler(httpStatus.BAD_REQUEST, "missing_data");
    try {
      const payload = {
        title,
        description,
        user_id: userId,
        country_id: countryId,
      };

      const question = await Question.create(payload);

      let topics = topicIds.map((topicId) =>
        QuestionTopic.create({
          question_id: question.id,
          topic_id: topicId,
        })
      );
      topics = await Promise.all(topics);
      return { question, topics };
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },
};

module.exports = questionService;
