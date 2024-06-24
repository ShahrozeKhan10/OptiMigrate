module.exports = (sequelize, DataTypes) => {
  let Skill = sequelize.define('Skill', {
    id: {
      primaryKey: true,
      type: sequelize.Sequelize.UUID,
      defaultValue: sequelize.Sequelize.UUIDV4,
    },
    name: {
      type: sequelize.Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: sequelize.Sequelize.ENUM('s', 'h', 'u')
    },
  },
  {
    underscored: true,
  });

  Skill.associate = (models) => {
    Skill.belongsToMany(models.Profession, {
      through: 'ProfessionSkill',
      foreignKey: 'skill_id',
      as: 'profession',
      otherKey: 'profession_id',
    });
    Skill.belongsToMany(models.Course, {
      through: 'SkillCourse',
      foreignKey: 'skill_id',
      as: 'skill_course',
      otherKey: 'category_id',
    });
    Skill.belongsToMany(models.Job, {
      through: 'SkillJob',
      foreignKey: 'skill_id',
      as: 'job',
      otherKey: 'job_id',
    });
    Skill.belongsToMany(models.User, {
      through: 'UserSkill',
      foreignKey: 'skill_id',
      otherKey: 'user_id',
      as: 'user_skills',
    });

  };

  return Skill;
};
