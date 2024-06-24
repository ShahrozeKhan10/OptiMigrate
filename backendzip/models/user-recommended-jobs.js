module.exports = (sequelize, Datatypes) => {
  let UserRecommendedJob = sequelize.define(
    "UserRecommendedJob",
    {
      user_id: {
        type: sequelize.Sequelize.UUID
      },
      job_id: {
        type: sequelize.Sequelize.UUID
      }
    },
    { underscored: true }
  );

  return UserRecommendedJob;
};
