"use strict";

module.exports = (sequelize, DataTypes) => {
  let Threads = sequelize.define(
    "Threads",
    {
      user_id: {
        type: sequelize.Sequelize.UUID,
        allowNull: false,
      },
      content: {
        type: sequelize.Sequelize.TEXT,
        allowNull: false,
      },
      created_at: {
        type: sequelize.Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: sequelize.Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      underscored: true,
    }
  );

  Threads.associate = (models) => {
    // AuthToken.belongsTo(models.User)
  };
  return Threads;
};
