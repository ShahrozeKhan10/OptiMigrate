module.exports = (sequelize, DataTypes) => {
  let ProfessionDetails = sequelize.define('ProfessionDetails', {
    id: {
      primaryKey: true,
      type: sequelize.Sequelize.UUID,
      defaultValue: sequelize.Sequelize.UUIDV4,
    },
    ilo_id: {
      type: sequelize.Sequelize.UUID,
      allowNull: false,
    },
    name: {
      type: sequelize.Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
  });

  ProfessionDetails.associate = (models) => {
    ProfessionDetails.hasMany(models.User, {foreignKey: 'profession_id', onUpdate: 'CASCADE'});
  };

  return ProfessionDetails;
};
