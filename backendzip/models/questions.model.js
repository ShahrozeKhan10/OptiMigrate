module.exports = (sequelize, DataTypes) => {
  let Question = sequelize.define(
    "Question",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: sequelize.Sequelize.STRING,
        allowNull: false,
        defaultValue: "",
      },
      description: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        defaultValue: "",
      },
    },
    {
      underscored: true,
    }
  );

  Question.associate = (models) => {
    Question.belongsTo(models.User, { foreignKey: "user_id", as: "user" });

    Question.belongsToMany(models.Topic, {
      through: "QuestionTopic",
      foreignKey: "question_id",
      otherKey: "topic_id",
      as: "topics",
    });

    // Define a one-to-many relationship with Replies
    Question.hasMany(models.Reply, {
      foreignKey: "question_id",
      as: "replies", // You can use any alias you prefer
    });

    // Define a one-to-many relationship with Likes
    Question.hasMany(models.Like, {
      foreignKey: "question_id",
      as: "likes", // You can use any alias you prefer
    });

    // Define a one-to-many relationship with Likes
    Question.hasMany(models.QuestionTopic, {
      foreignKey: "question_id",
      // as: "likes", // You can use any alias you prefer
    });

    // Add this to the Question model
    Question.belongsTo(models.Country, {
      foreignKey: "country_id",
      as: "country",
    });
  };

  return Question;
};
