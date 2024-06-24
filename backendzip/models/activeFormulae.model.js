module.exports = (sequelize, DataTypes) => {
  let ActiveFormulae = sequelize.define('ActiveFormulae', {
    id: {
      primaryKey: true,
      type: sequelize.Sequelize.UUID,
      defaultValue: sequelize.Sequelize.UUIDV4,
    },
    target: {
      type: sequelize.Sequelize.ENUM('prod', 'test', 'both')
    },
    variant: {
      type: sequelize.Sequelize.ENUM('skill-readiness', 'employability-score', 'future-readiness', 'total-assessment'),
      allowNull: false,
      unique: true
    },
  },
  {
    underscored: true,
  });

  return ActiveFormulae;
};
