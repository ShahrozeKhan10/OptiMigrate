module.exports = (sequelize, DataTypes) => {
  let StudyField = sequelize.define('StudyField', {
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

  StudyField.associate = (models) => {
    StudyField.hasMany(models.Education, {foreignKey: 'study_field_id'});
    StudyField.hasMany(models.Certificate, {foreignKey: 'study_field_id'});
  };
  return StudyField;
};
