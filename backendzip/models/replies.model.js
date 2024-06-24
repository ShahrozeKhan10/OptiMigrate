const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Reply = sequelize.define(
    "Reply",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: DataTypes.STRING(1000),
      },
    },
    {
      underscored: true,
    }
  );

  Reply.associate = (models) => {
    // Associate a reply with a user (many-to-one relationship)
    Reply.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
      onDelete: "CASCADE",
    });

    // Associate a reply with a question (many-to-one relationship)
    Reply.belongsTo(models.Question, {
      foreignKey: "question_id",
      as: "question",
      onDelete: "CASCADE",
    });

    // Define a one-to-many relationship with Likes
    Reply.hasMany(models.Like, {
      foreignKey: "reply_id",
      as: "likes", // You can use any alias you prefer
    });
  };

  return Reply;
};
