module.exports = (sequelize, Datatypes) => {
  let UserSurvey = sequelize.define(
    "UserSurvey",
    {
      user_id: {
        type: sequelize.Sequelize.UUID
      },
      survey_id: {
        type: sequelize.Sequelize.UUID
      },
      type: {
        type: sequelize.Sequelize.ENUM("new", "completed", "visited"),
        defaultValue: "new"
      }
    },
    { underscored: true }
  );

  return UserSurvey;
};
