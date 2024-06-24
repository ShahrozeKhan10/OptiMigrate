module.exports = (sequelize, DataTypes) => {
  let Category = sequelize.define('Category', {
    id: {
      primaryKey: true,
      type: sequelize.Sequelize.UUID,
      defaultValue: sequelize.Sequelize.UUIDV4,
    },
    title: {
      type: sequelize.Sequelize.STRING,
    },
  },
  {
    underscored: true,
  });
  return Category;
};
