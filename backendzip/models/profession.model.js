module.exports = (sequelize, DataTypes) => {
  let Profession = sequelize.define('Profession', {
    id: {
      primaryKey: true,
      type: sequelize.Sequelize.UUID,
      defaultValue: sequelize.Sequelize.UUIDV4,
    },
    ilo: {
      type: sequelize.Sequelize.STRING,
      allowNull: false,
    },
    onet_code: {
      type: sequelize.Sequelize.STRING,
      allowNull: false,
    }
  },
  {
    underscored: true,
    indexes:[
      {
        unique: true,
        fields:['ilo']
      }
    ]
  });

  Profession.associate = (models) => {
    Profession.belongsToMany(models.Category, {
      through: 'ProfessionCategory',
      foreignKey: 'profession_id',
      otherKey: 'category_id',
      as: 'category',
    });
    Profession.belongsToMany(models.Skill, {
      through: 'ProfessionSkill',
      foreignKey: 'profession_id',
      otherKey: 'skill_id',
      as: 'skills',
    });
    Profession.hasMany(models.ProfessionDetails, {foreignKey: 'ilo_id', onUpdate: 'CASCADE'});
  };

  return Profession;
};
