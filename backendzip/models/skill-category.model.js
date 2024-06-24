module.exports = (sequelize, DataTypes) => {
  let SkillCategory = sequelize.define('SkillCategory', {
    category_id: {
      type: sequelize.Sequelize.UUID,
    },
    skill_id: {
      type: sequelize.Sequelize.UUID,
    },
  },
  {
    underscored: true,
  });
  return SkillCategory;
};
