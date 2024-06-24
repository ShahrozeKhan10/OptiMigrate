// let { MESSAGE_CODES } = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define(
    "User",
    {
      id: {
        primaryKey: true,
        type: sequelize.Sequelize.UUID,
        defaultValue: sequelize.Sequelize.UUIDV4,
      },
      name: {
        type: sequelize.Sequelize.STRING,
        allowNull: false,
        defaultValue: "",
      },
      email: {
        type: sequelize.Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
        unique: {
          args: true,
          msg: "account already exist",
        },
      },
      password: {
        type: sequelize.Sequelize.STRING,
        allowNull: false,
      },
      gender: {
        type: sequelize.Sequelize.ENUM("male", "female"),
        allowNull: false,
      },
      image: {
        type: sequelize.Sequelize.STRING,
        allowNull: true,
        defaultValue: "",
      },
      phone: {
        type: sequelize.Sequelize.STRING,
        allowNull: false,
        defaultValue: "",
      },
      dob: {
        type: sequelize.Sequelize.DATE,
        allowNull: true,
      },
      email_verified: {
        type: sequelize.Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      profession_id: {
        type: sequelize.Sequelize.UUID,
        allowNull: true,
      },
      role: {
        type: sequelize.Sequelize.ENUM("user", "admin"),
        allowNull: true,
        defaultValue: "user",
      },
      status: {
        type: sequelize.Sequelize.ENUM("active", "deactivate", "pending"),
        allowNull: true,
        defaultValue: "active",
      },
      country: {
        type: sequelize.Sequelize.STRING,
        allowNull: true,
        defaultValue: "",
      },
      city: {
        type: sequelize.Sequelize.STRING,
        allowNull: true,
        defaultValue: "",
      },
      description: {
        type: sequelize.Sequelize.TEXT,
        allowNull: true,
        defaultValue: "",
      },
      terms_accepted: {
        type: sequelize.Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  User.associate = (models) => {
    // User.hasOne(models.ProfileStatus, { foreignKey: "user_id" });
    User.hasMany(models.Education, { foreignKey: "user_id", as: "education" });
    User.hasMany(models.Experience, {
      foreignKey: "user_id",
      as: "experience",
    });
    User.hasMany(models.Project, { foreignKey: "user_id", as: "projects" });
    User.hasMany(models.Certificate, {
      foreignKey: "user_id",
      as: "certificates",
    });
    // User.hasMany(models.Attachment, {
    //   foreignKey: "user_id",
    //   as: "attachments",
    // });
    User.hasMany(models.Score, { foreignKey: "user_id", as: "scores" });
    User.belongsToMany(models.Skill, {
      through: "UserSkill",
      foreignKey: "user_id",
      otherKey: "skill_id",
      as: "user_skills",
    });
    User.belongsToMany(models.Interest, {
      through: "UserInterest",
      foreignKey: "user_id",
      otherKey: "interest_id",
      as: "user_interests",
    });
    User.hasMany(models.Question, { foreignKey: "user_id", as: "questions" });
    User.belongsToMany(models.Country, {
      through: "UserCountry",
      foreignKey: "user_id",
      otherKey: "country_id",
      as: "countries",
    });
  };

  return User;
};
