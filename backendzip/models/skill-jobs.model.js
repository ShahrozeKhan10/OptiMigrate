module.exports = (sequelize, DataTypes) => {
  let SkillJob = sequelize.define('SkillJob', {
    skill_id: {
      type: sequelize.Sequelize.UUID,
    },
    job_id: {
      type: sequelize.Sequelize.UUID,
    },

  },
  {
    underscored: true,
  });

  return SkillJob;
};
