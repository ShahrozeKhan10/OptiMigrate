"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("payment_statuses", "payment_plan_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "payment_plans", // Make sure this matches your actual table name
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("payment_statuses", "payment_plan_id");
  },
};
