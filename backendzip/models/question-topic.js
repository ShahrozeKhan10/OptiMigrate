module.exports = (sequelize, DataTypes) => {
  let QuestionTopic = sequelize.define(
    "QuestionTopic",
    {
      question_id: {
        type: DataTypes.INTEGER,
      },
      topic_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      underscored: true,
    }
  );

  QuestionTopic.associate = (models) => {
    QuestionTopic.belongsTo(models.Question, {
      foreignKey: "question_id",
      as: "question",
    });

    QuestionTopic.belongsTo(models.Topic, {
      foreignKey: "topic_id",
      as: "topic",
    });
  };

  return QuestionTopic;
};
