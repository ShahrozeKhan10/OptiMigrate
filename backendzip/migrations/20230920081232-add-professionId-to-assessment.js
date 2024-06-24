"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("assessments", "profession_id", {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "profession_details",
        key: "id",
      },
      onUpdate: "CASCADE",
      // onDelete: "SET NULL",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("assessments", "profession_id");
  },
};
