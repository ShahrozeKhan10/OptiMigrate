const httpStatus = require("http-status");
const { ErrorHandler } = require("../helper/error");
const { Visa } = require("../models");

let professionService = {
  getVisas: async (body) => {
    try {
      const visas = await Visa.findAll();
      return visas;
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },
  getVisa: async (id) => {
    try {
      const visas = await Visa.findByPk(id);
      return visas;
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },
  createVisa: async (data) => {
    const {
      name,
      description,
      countryId,
      visaType,
      visaRequirements,
      visaDuration,
      meta,
      link,
    } = data;
    if (
      !name ||
      !description ||
      !countryId ||
      !visaType ||
      !visaRequirements ||
      !visaDuration ||
      !meta ||
      !link
    )
      return false;
    try {
      return Visa.create({ ...data, country_id: countryId });
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },
};

module.exports = professionService;
