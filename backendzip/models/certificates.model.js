let {ERROR_CODES} = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  let Certificate = sequelize.define('Certificate', {
    id: {
      primaryKey: true,
      type: sequelize.Sequelize.UUID,
      defaultValue: sequelize.Sequelize.UUIDV4,
    },
    title: {
      type: sequelize.Sequelize.STRING,
      allowNull: true,
    },
    description: {
      type: sequelize.Sequelize.STRING,
      defaultValue: '',
    },
    study_field_id: {
      type: sequelize.Sequelize.INTEGER,
    },
    location: {
      type: sequelize.Sequelize.STRING,
      allowNull: true,
    },
    start_year: {
      type: sequelize.Sequelize.STRING(4),
      allowNull: true,
    },
    end_year: {
      type: sequelize.Sequelize.STRING(4),
      allowNull: true,
    },
    grade: {
      type: sequelize.Sequelize.STRING,
      allowNull: true,
    },
    is_continue: {
      type: sequelize.Sequelize.BOOLEAN,
      defaultValue: false,
    },
    user_id: {
      type: sequelize.Sequelize.UUID,
    },
  },
  {
    underscored: true,
  });

  Certificate.associate = (models) => {
  };

  return Certificate;
};
