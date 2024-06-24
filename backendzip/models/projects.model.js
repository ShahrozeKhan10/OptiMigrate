let { ERROR_CODES } = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  let Project = sequelize.define(
    "Project",
    {
      id: {
        primaryKey: true,
        type: sequelize.Sequelize.UUID,
        defaultValue: sequelize.Sequelize.UUIDV4
      },
      title: {
        type: sequelize.Sequelize.STRING,
        allowNull: true
      },
      description: {
        type: sequelize.Sequelize.STRING,
        defaultValue: ""
      },
      location: {
        type: sequelize.Sequelize.STRING,
        allowNull: true
      },
      company_name: {
        type: sequelize.Sequelize.STRING,
        allowNull: true,
        defaultValue: ""
      },
      link: {
        type: sequelize.Sequelize.STRING,
        allowNull: true
      },
      start_year: {
        type: sequelize.Sequelize.STRING(4),
        allowNull: true
      },
      start_year_utc: {
        type: sequelize.Sequelize.STRING
      },
      end_year_utc: {
        type: sequelize.Sequelize.STRING
      },
      end_year: {
        type: sequelize.Sequelize.STRING(4),
        allowNull: true
      },
      is_working: {
        type: sequelize.Sequelize.BOOLEAN,
        defaultValue: false
      },
      image: {
        type: sequelize.Sequelize.STRING,
        allowNull: true
      },
      user_id: {
        type: sequelize.Sequelize.UUID
      }
    },
    {
      underscored: true
    }
  );
  Project.associate = models => {
    Project.hasMany(models.Attachment, { foreignKey: "project_id" });
  };

  return Project;
};
