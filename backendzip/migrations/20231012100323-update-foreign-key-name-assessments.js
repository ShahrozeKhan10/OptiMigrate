"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      "assessments",
      "country_id",
      "origin_country_id"
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      "assessments",
      "origin_country_id",
      "country_id"
    );
  },
};
