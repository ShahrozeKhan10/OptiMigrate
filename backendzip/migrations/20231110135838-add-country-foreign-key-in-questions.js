"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("questions", "country_id", {
      type: Sequelize.INTEGER,
      // allowNull: true,
      references: {
        model: "countries", // Make sure this matches your actual table name
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("questions", "country_id");
  },
};
