let {ERROR_CODES} = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  let UserCourse = sequelize.define('UserCourse', {
    user_id: {
      type: sequelize.Sequelize.UUID,
    },
    course_id: {
      type: sequelize.Sequelize.UUID,
    },
    type: {
      type: sequelize.Sequelize.ENUM('saved', 'enrolled', 'completed', 'visited', 'visited_saved'),
    },
    saved_on: {
      type: sequelize.Sequelize.DATE,
      allowNull: true,
    },
    enrolled_on: {
      type: sequelize.Sequelize.DATE,
      allowNull: true,
    },
    completed_on: {
      type: sequelize.Sequelize.DATE,
      allowNull: true,
    },
  },
  {
    underscored: true,
  });

  UserCourse.associate = (models) => {
  };

  return UserCourse;
};
