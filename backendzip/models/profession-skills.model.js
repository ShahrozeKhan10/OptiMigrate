module.exports = (sequelize, DataTypes) => {
  let ProfessionSkill = sequelize.define('ProfessionSkill', {
      skill_id: {
        type: sequelize.Sequelize.UUID,
      },
      profession_id: {
        type: sequelize.Sequelize.UUID,
      },
      weightage: {
        type: sequelize.Sequelize.DOUBLE,
        allowNull: false,
      },
    },
    {
      underscored: true,
    });

  return ProfessionSkill;
};
