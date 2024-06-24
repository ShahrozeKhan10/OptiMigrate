module.exports = (sequelize, DataTypes) => {
  let Degree = sequelize.define('Degree', {
    id: {
      primaryKey: true,
      type: sequelize.Sequelize.INTEGER,
      autoIncrement: true,
    },
    title: {
      type: sequelize.Sequelize.STRING,
    },
  },
  {
    underscored: true,
  });

  Degree.associate = (models) => {
    Degree.hasMany(models.Education, { foreignKey: 'degree_id' });
  };
  return Degree;
};
