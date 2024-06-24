module.exports = (sequelize, DataTypes) => {
  let Course = sequelize.define('Course', {
    id: {
      primaryKey: true,
      type: sequelize.Sequelize.UUID,
      defaultValue: sequelize.Sequelize.UUIDV4,
    },
    course_source: {
      type: sequelize.Sequelize.STRING,
    },
    title: {
      type: sequelize.Sequelize.STRING,
    },
    url: {
      type: sequelize.Sequelize.STRING,
    },
    difficulty_level: {
      type: sequelize.Sequelize.STRING,
    },
    matched_skills: {
      type: sequelize.Sequelize.STRING,
    },
    duration: {
      type: sequelize.Sequelize.STRING,
    },
    skills: {
      type: sequelize.Sequelize.STRING,
    },
    image_url: {
      type: sequelize.Sequelize.STRING,
    },
    author: {
      type: sequelize.Sequelize.STRING,
    },
    description: {
      type: sequelize.Sequelize.STRING,
    },
    scraped_date: {
      type: sequelize.Sequelize.DATE,
      allowNull: true,
    },
  },
  {
    underscored: true,
  });

  Course.associate = (models) => {
    Course.belongsToMany(models.User, {
      through: 'UserCourse',
      foreignKey: 'course_id',
      otherKey: 'user_id',
      as: 'user_course',
    });
    Course.belongsToMany(models.Skill, {
      through: 'SkillCourse',
      foreignKey: 'course_id',
      otherKey: 'skill_id',
      as: 'skill_course',
    });
    Course.belongsToMany(models.User, {
      through: 'UserRecommendedCourse',
      foreignKey: 'course_id',
      otherKey: 'user_id',
      as: 'recommended_course',
    });
  };

  return Course;


};
