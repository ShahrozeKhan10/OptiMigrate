module.exports = (sequelize, DataTypes) => {
  let Survey = sequelize.define(
    "Survey",
    {
      id: {
        primaryKey: true,
        type: sequelize.Sequelize.UUID,
        defaultValue: sequelize.Sequelize.UUIDV4
      },
      title: {
        type: sequelize.Sequelize.STRING,
        allowNull: false,
        defaultValue: ""
      },
      description: {
        type: sequelize.Sequelize.TEXT,
        allowNull: false,
        defaultValue: ""
      },
      type: {
        type: sequelize.Sequelize.STRING,
        allowNull: false,
        defaultValue: ""
      },
      url: {
        type: sequelize.Sequelize.STRING,
        allowNull: false,
        defaultValue: ""
      }
    },
    {
      underscored: true
    }
  );
  Survey.associate = models => {
    Survey.belongsToMany(models.User, {
      through: "UserSurvey",
      foreignKey: "survey_id",
      otherKey: "user_id",
      as: "user_survey"
    });
  };
  return Survey;
};
