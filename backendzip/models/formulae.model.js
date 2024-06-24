module.exports = (sequelize, DataTypes) => {
  let Formulae = sequelize.define('Formulae', {
    id: {
      primaryKey: true,
      type: sequelize.Sequelize.UUID,
      defaultValue: sequelize.Sequelize.UUIDV4,
    },
    expression: {
      type: sequelize.Sequelize.STRING(5000),
      allowNull: false,
    },
    variant: {
      type: sequelize.Sequelize.ENUM('skill-readiness', 'employability-score', 'future-readiness', 'total-assessment'),
      allowNull: false
    }
  },
  {
    underscored: true,
  });

  Formulae.associate = (models) => {
    Formulae.hasMany(models.ActiveFormulae, {foreignKey: 'id'});
  };

  return Formulae;
};
