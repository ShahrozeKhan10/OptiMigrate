module.exports = (sequelize, DataTypes) => {
  let TestConfig = sequelize.define('TestConfig', {
      top_cand_skills_ctrl: {
        type: sequelize.Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
      total_cand_skills_ctrl: {
        type: sequelize.Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
      top_cand_skills_ctrl_prod: {
        type: sequelize.Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
      total_cand_skills_ctrl_prod: {
        type: sequelize.Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
  },
  {
    underscored: true,
  });

  return TestConfig;
};
