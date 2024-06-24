"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("assessments", "residence_country_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "countries",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    await queryInterface.addColumn("assessments", "savings_in_dollars", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("assessments", "residence_country_id");
    await queryInterface.removeColumn("assessments", "savings_in_dollars");
  },
};
