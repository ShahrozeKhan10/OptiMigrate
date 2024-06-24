module.exports = (sequelize, DataTypes) => {
  let ProfessionCategory = sequelize.define('ProfessionCategory', {
    category_id: {
      type: sequelize.Sequelize.UUID,
    },
    profession_id: {
      type: sequelize.Sequelize.UUID,
    },
  },
  {
    underscored: true,
  });
  return ProfessionCategory;
};
