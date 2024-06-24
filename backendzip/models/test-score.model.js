module.exports = (sequelize, DataTypes) => {
    let TestScore = sequelize.define('TestScore', {
      id: {
        primaryKey: true,
        type: sequelize.Sequelize.UUID,
        defaultValue: sequelize.Sequelize.UUIDV4,
      },
      value: {
        type: sequelize.Sequelize.TEXT
      },
      type: {
        type: sequelize.Sequelize.ENUM('skills', 'future', 'total', 'emp', 'other'),
        allowNull: false,
        defaultValue: 'other',
      },
      user_id: {
        type: sequelize.Sequelize.UUID,
        allowNull: false,
      },
    },
    {
      underscored: true,
    });
    return TestScore;
  };
