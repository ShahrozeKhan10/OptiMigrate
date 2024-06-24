const { ASSESSMENT_STATUS } = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  let Assessments = sequelize.define(
    "Assessments",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      savings_in_dollars: {
        type: DataTypes.INTEGER,
      },
      career_summary: {
        type: DataTypes.TEXT,
      },
      career_summary_ur: {
        type: DataTypes.TEXT,
      },
      resume_text_content: {
        type: DataTypes.TEXT,
      },
      result: {
        type: DataTypes.JSON,
      },
      status: {
        type: sequelize.Sequelize.ENUM(
          ASSESSMENT_STATUS.PENDING,
          ASSESSMENT_STATUS.IN_PROGRESS,
          ASSESSMENT_STATUS.COMPLETED,
          ASSESSMENT_STATUS.FAILED
        ),
      },
    },
    {
      underscored: true,
    }
  );
  Assessments.associate = (models) => {
    Assessments.belongsTo(models.Country, {
      foreignKey: "origin_country_id",
      as: "originCountry",
    });
    Assessments.belongsTo(models.Country, {
      foreignKey: "residence_country_id",
      as: "residenceCountry",
    });
    Assessments.belongsTo(models.ProfessionDetails, {
      foreignKey: "profession_id",
      as: "professionIdFK",
      allowNull: true,
      onUpdate: "CASCADE",
    });
    Assessments.belongsToMany(models.Country, {
      through: "AssessmentDesiredCountries",
      foreignKey: "assessment_id",
      otherKey: "country_id",
      as: "assessment_country",
    });
    // Assessments.belongsTo(models.VisaType, { as: "visaType" });
    Assessments.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
  };
  return Assessments;
};
