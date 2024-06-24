'use strict';

module.exports = (sequelize, DataTypes) => {
  let AuthToken = sequelize.define('AuthToken', {
    user_id: {
      type: sequelize.Sequelize.UUID,
      allowNull: false,
    },
    is_active: {
      type: sequelize.Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false,
      comment: 'false -> Inactive (cannot be used for more than one time) , true -> active',
    },
    token: {
      type: sequelize.Sequelize.STRING,
      allowNull: false,
      comment: 'JWT token, check if expired then make it in-active',
    },
    created_at: {
      type: sequelize.Sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: sequelize.Sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    underscored: true,
  });


  AuthToken.associate = (models) => {
    // AuthToken.belongsTo(models.User)
  };

  return AuthToken;

};
