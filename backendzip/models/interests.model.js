let {ERROR_CODES} = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  let Interest = sequelize.define('Interest', {
    id: {
      primaryKey: true,
      type: sequelize.Sequelize.UUID,
      defaultValue: sequelize.Sequelize.UUIDV4,
    },
    name: {
      type: sequelize.Sequelize.STRING,
      allowNull: true,
    },
    type: {
      type: sequelize.Sequelize.STRING,
      allowNull: true,
    },
    rate: {
      type: sequelize.Sequelize.INTEGER,
      allowNull: true
    },
  },
  {
    underscored: true,
  });

  Interest.associate = (models) => {
    Interest.belongsToMany(models.User, {
      through: 'UserInterest',
      foreignKey: 'interest_id',
      otherKey: 'user_id',
      as: 'user_interests',
    });
  };

  return Interest;
};
