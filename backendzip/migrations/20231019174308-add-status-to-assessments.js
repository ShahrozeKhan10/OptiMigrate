"use strict";

const { ASSESSMENT_STATUS } = require("../config/constants");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("assessments", "status", {
      type: Sequelize.ENUM(
        ASSESSMENT_STATUS.PENDING,
        ASSESSMENT_STATUS.IN_PROGRESS,
        ASSESSMENT_STATUS.COMPLETED,
        ASSESSMENT_STATUS.FAILED
      ),
      allowNull: false,
      defaultValue: "PENDING",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("assessments", "status");
  },
};
