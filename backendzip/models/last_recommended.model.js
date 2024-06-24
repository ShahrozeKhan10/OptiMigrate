module.exports = (sequelize, DataTypes) => {
  return sequelize.define('LastRecommended', {
    user_id: {
      type: sequelize.Sequelize.UUID
    },
    type: {
      type: sequelize.Sequelize.ENUM('jobs', 'courses')
    },
    timestamp: {
      type: 'TIMESTAMP',
      defaultValue: sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    }
  }, {
    underscored: true
  });
};
