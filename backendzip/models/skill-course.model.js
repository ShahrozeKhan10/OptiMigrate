let {ERROR_CODES} = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  let SkillCourse = sequelize.define('SkillCourse', {
    course_id: {
      type: sequelize.Sequelize.UUID,
    },
    skill_id: {
      type: sequelize.Sequelize.UUID,
    },

  },
  {
    underscored: true,
  });

  SkillCourse.associate = (models) => {
  };

  return SkillCourse;
};
