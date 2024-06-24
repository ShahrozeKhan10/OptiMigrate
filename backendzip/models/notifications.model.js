const { NOTIFICATION_TYPES } = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    "Notification",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.ENUM(
          NOTIFICATION_TYPES.QUESTION_REPLY,
          NOTIFICATION_TYPES.QUESTION_LIKE,
          NOTIFICATION_TYPES.REPLY_LIKE,
          NOTIFICATION_TYPES.ASSESSMENT_SUCCESS,
          NOTIFICATION_TYPES.ASSESSMENT_FAILED
        ),
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      data: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      underscored: true,
    }
  );

  Notification.associate = (models) => {
    Notification.belongsTo(models.User, {
      as: "initiatorUser",
      foreignKey: "initiator_user_id",
      foreignKeyConstraint: true,
      allowNull: true,
    });

    Notification.belongsTo(models.User, {
      as: "recipientUser",
      foreignKey: "recipient_user_id",
      foreignKeyConstraint: true,
    });

    // user_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: "Users", // Replace with the actual model name for Users
    //     key: "id",
    //   },
    // },
  };
  return Notification;
};
