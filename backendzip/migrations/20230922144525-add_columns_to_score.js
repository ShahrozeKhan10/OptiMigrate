"use strict";
const { Assessments, Country } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    try {
      await queryInterface.addColumn("scores", "country_id", {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'countries',
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });
    } catch (error) {
      console.log("1111", error);
    }
    try {
      await queryInterface.addColumn("scores", "assessment_id", {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "assessments",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });
    } catch (error) {
      console.log("2222", error);
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("scores", "country_id");
    await queryInterface.removeColumn("scores", "assessment_id");
  },
};
