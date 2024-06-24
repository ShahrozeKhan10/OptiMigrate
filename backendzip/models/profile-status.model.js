module.exports = (sequelize, DataTypes) => {
  let ProfileStatus = sequelize.define('ProfileStatus', {
    user_id: {
      primaryKey: true,
      type: sequelize.Sequelize.UUID,
    },
    general_info: {
      type: sequelize.Sequelize.BOOLEAN,
      defaultValue: false,
    },
    education: {
      type: sequelize.Sequelize.BOOLEAN,
      defaultValue: false,
    },
    experience: {
      type: sequelize.Sequelize.BOOLEAN,
      defaultValue: false,
    },
    skills: {
      type: sequelize.Sequelize.BOOLEAN,
      defaultValue: false,
    },
    interests: {
      type: sequelize.Sequelize.BOOLEAN,
      defaultValue: false,
    },
    cv: {
      type: sequelize.Sequelize.BOOLEAN,
      defaultValue: false,
    },
    certificate: {
      type: sequelize.Sequelize.BOOLEAN,
      defaultValue: false,
    },
    project: {
      type: sequelize.Sequelize.BOOLEAN,
      defaultValue: false,
    },
    percentage: {
      type: sequelize.Sequelize.STRING,
      defaultValue: '',
    },
  },
  {
    underscored: true,
  });
  return ProfileStatus;
};
