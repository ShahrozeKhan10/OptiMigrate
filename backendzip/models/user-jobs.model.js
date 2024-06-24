let {ERROR_CODES} = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  let UserJob = sequelize.define('UserJob', {
    user_id: {
      type: sequelize.Sequelize.UUID,
    },
    job_id: {
      type: sequelize.Sequelize.UUID,
    },
    type: {
      type: sequelize.Sequelize.ENUM('saved', 'applied', 'visited', 'visited_saved'),
    },
    saved_at: {
      type: sequelize.Sequelize.DATE,
      allowNull: true,
    },
    applied_at: {
      type: sequelize.Sequelize.DATE,
      allowNull: true,
    },

  },
  {
    underscored: true,
  });

  UserJob.associate = (models) => {
  };

  return UserJob;
};
