const helperFunction = require("../helper/common");
const httpStatus = require("http-status");
const { ErrorHandler } = require("../helper/error");
const { Interest } = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

let interestService = {
  getAllInterests: async (orderBy = "ASC", page = 0, size = 10, query) => {
    let where = {};
    if (query !== undefined) {
      where = {
        name: {
          [Op.like]: `%${query}%`,
        },
      };
    }

    try {
      return await Interest.findAll({
        limit: [Number(page) * Number(size), Number(size)],
        attributes: ["id", "name"],
        raw: true,
        order: [["name", orderBy]],
        where: where,
      });
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  getInterestByName: async (name) => {
    return Interest.findOne({
      where: {
        name: name,
      },
      attributes: { exclude: ["type", "updatedAt", "createdAt"] },
      raw: true,
    });
  },
};

module.exports = interestService;
