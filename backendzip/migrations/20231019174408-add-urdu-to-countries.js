"use strict";

const { ASSESSMENT_STATUS } = require("../config/constants");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("countries", "name_ur", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("countries", "details_ur", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("countries", "name_ur");
    await queryInterface.removeColumn("countries", "details_ur");
  },
};
