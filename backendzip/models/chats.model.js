"use strict";

module.exports = (sequelize, DataTypes) => {
  let Chats = sequelize.define(
    "Chats",
    {
      user_id: {
        type: sequelize.Sequelize.UUID,
        allowNull: false,
      },
      thread_id: {
        type: sequelize.Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: sequelize.Sequelize.TEXT,
        allowNull: false,
      },
      sender: {
        type: sequelize.Sequelize.STRING,
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

  Chats.associate = (models) => {
    // AuthToken.belongsTo(models.User)
  };
  return Chats;
};
