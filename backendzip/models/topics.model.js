module.exports = (sequelize, DataTypes) => {
  let Topic = sequelize.define(
    "Topic",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: sequelize.Sequelize.STRING,
        allowNull: false,
        defaultValue: "",
        unique: true,
      },
    },
    {
      underscored: true,
    }
  );

  Topic.associate = (models) => {
    Topic.belongsToMany(models.Question, {
      through: "QuestionTopic",
      foreignKey: "topic_id",
      otherKey: "question_id",
      as: "questions",
    });
  };

  return Topic;
};
