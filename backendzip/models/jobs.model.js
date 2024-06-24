module.exports = (sequelize, DataTypes) => {
  let Job = sequelize.define('Job', {
    id: {
      primaryKey: true,
      type: sequelize.Sequelize.UUID,
      defaultValue: sequelize.Sequelize.UUIDV4,
    },
    job_source: {
      type: sequelize.Sequelize.STRING,
      defaultValue: '',
    },
    company_name: {
      type: sequelize.Sequelize.STRING,
      defaultValue: '',
    },
    company_image_url: {
      type: sequelize.Sequelize.STRING,
      defaultValue: '',
    },
    company_city: {
      type: sequelize.Sequelize.STRING,
      defaultValue: '',
    },
    company_country: {
      type: sequelize.Sequelize.STRING,
      defaultValue: '',
    },
    company_industry: {
      type: sequelize.Sequelize.STRING,
      defaultValue: '',
    },
    company_type: {
      type: sequelize.Sequelize.STRING,
      defaultValue: '',
    },
    job_role: {
      type: sequelize.Sequelize.STRING,
      defaultValue: '',
    },
    job_type: {
      type: sequelize.Sequelize.STRING,
      defaultValue: '',
    },
    job_salary: {
      type: sequelize.Sequelize.STRING,
      defaultValue: '',
    },
    job_title: {
      type: sequelize.Sequelize.STRING,
      defaultValue: '',
    },
    job_url: {
      type: sequelize.Sequelize.STRING,
      defaultValue: '',
    },
    job_vacancies: {
      type: sequelize.Sequelize.STRING,
      defaultValue: '',
    },
    job_description: {
      type: sequelize.Sequelize.STRING,
      defaultValue: '',
    },
    job_skills_description: {
      type: sequelize.Sequelize.STRING,
      defaultValue: '',
    },
    job_skills: {
      type: sequelize.Sequelize.STRING,
      defaultValue: '',
    },
    job_city: {
      type: sequelize.Sequelize.STRING,
      defaultValue: '',
    },
    job_country: {
      type: sequelize.Sequelize.STRING,
      defaultValue: '',
    },
    job_degree: {
      type: sequelize.Sequelize.STRING,
      defaultValue: '',
    },
    job_experience: {
      type: sequelize.Sequelize.STRING,
      defaultValue: '',
    },
    job_level: {
      type: sequelize.Sequelize.STRING,
      defaultValue: '',
    },
    job_gender: {
      type: sequelize.Sequelize.STRING,
      defaultValue: '',
    },
    job_nationality: {
      type: sequelize.Sequelize.STRING,
      defaultValue: '',
    },
    job_tags: {
      type: sequelize.Sequelize.STRING,
      defaultValue: '',
    },
    job_age: {
      type: sequelize.Sequelize.STRING,
      defaultValue: '',
    },
    matched_skills: {
      type: sequelize.Sequelize.STRING,
      defaultValue: '',
    },
    posted_date: {
      type: sequelize.Sequelize.DATE,
      allowNull: true,
    },
    scraped_date: {
      type: sequelize.Sequelize.DATE,
      allowNull: true,
    },
  },
  {
    underscored: true,
  });
  Job.associate = (models) => {
    Job.belongsToMany(models.Skill, {
      through: 'SkillJob',
      foreignKey: 'job_id',
      otherKey: 'skill_id',
      as: 'skills',
    });
    Job.belongsToMany(models.User, {
      through: 'UserJob',
      foreignKey: 'job_id',
      otherKey: 'user_id',
      as: 'user_job',
    });
    Job.belongsToMany(models.User, {
      through: 'UserRecommendedJob',
      foreignKey: 'job_id',
      otherKey: 'user_id',
      as: 'recommended_job',
    });
  };

  return Job;
};
