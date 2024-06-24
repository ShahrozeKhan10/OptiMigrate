const httpStatus = require("http-status");
const Sequelize = require("sequelize");
const { ErrorHandler } = require("../helper/error");
const { Country, Consultant, Visa } = require("../models");
const { MESSAGE_CODES } = require("../config/constants");

const Op = Sequelize.Op;

let countryService = {
  // Get a single assessment with associated countries by ID
  getCountries: async (groupBy = "") => {
    try {
      const countriesData = await Country.findAll({
        order: [["name", "ASC"]],
        attributes: ["id", "name", "code", "continent", "hasDetails"],
      });

      if (groupBy === "continents") {
        // group by continents
        const groupedData = {};

        // Loop through the countries and group them by continent
        countriesData.forEach((country) => {
          const continent = country.continent;

          if (!groupedData[continent]) {
            groupedData[continent] = {
              name: continent,
              countries: [],
            };
          }
          groupedData[continent].countries.push({ ...country.dataValues });
        });

        // Convert the groupedData object to an array
        const groupedArray = Object.values(groupedData);
        return groupedArray;
      } else {
        return countriesData;
      }
    } catch (error) {
      console.error(error);
      throw new ErrorHandler(httpStatus.BAD_REQUEST, error.message);
      // res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getCountryVideos: async () => {
    try {
      const countries = await Country.findAll({
        order: [["name", "ASC"]],
        where: { video_links: { [Op.ne]: null } },
        attributes: ["id", "name", "name_ur", "video_links"],
      });

      return countries;
    } catch (error) {
      console.error(error);
      throw new ErrorHandler(httpStatus.BAD_REQUEST, error.message);
    }
  },

  updateCountryById: async (data, id) => {
    const { isActive, hasDetails, details } = data;

    try {
      return Country.update(
        { isActive, hasDetails, details },
        {
          where: {
            id,
          },
        }
      );
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  getCountryById: async (id) => {
    try {
      const countryData = await Country.findByPk(id, {
        include: [
          {
            model: Visa,
            as: "visas",
          },
          {
            model: Consultant,
            as: "consultants",
            where: { type: "consultant" },
            required: false,
          },
          {
            model: Consultant,
            as: "countryExperts",
            where: { type: "country_expert" },
            required: false,
          },
        ],
      });
      return countryData;
    } catch (error) {
      console.error(error);
      throw new ErrorHandler(
        httpStatus.INTERNAL_SERVER_ERROR,
        MESSAGE_CODES.COMMON.server_error
      );
    }
  },
};

module.exports = countryService;
