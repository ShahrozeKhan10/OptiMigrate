const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define(
    "Like",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      like_date: {
        type: DataTypes.DATE,
      },
    },
    {
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ["user_id", "reply_id"],
          where: {
            reply_id: { [Sequelize.Op.ne]: null },
          },
        },
        {
          unique: true,
          fields: ["user_id", "question_id"],
          where: {
            question_id: { [Sequelize.Op.ne]: null },
          },
        },
      ],
    }
  );

  Like.associate = (models) => {
    // Associate a like with a user (many-to-one relationship)
    Like.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });

    // Associate a like with a question (many-to-one relationship)
    Like.belongsTo(models.Question, {
      foreignKey: "question_id",
      as: "question",
    });

    Like.belongsTo(models.Reply, {
      foreignKey: "reply_id",
      as: "reply",
    });
  };

  return Like;
};
