module.exports = (sequelize, DataTypes) => {
  let Score = sequelize.define(
    "Score",
    {
      id: {
        primaryKey: true,
        type: sequelize.Sequelize.UUID,
        defaultValue: sequelize.Sequelize.UUIDV4,
      },
      score: {
        type: sequelize.Sequelize.TEXT,
        allowNull: false,
        defaultValue: "",
      },
      type: {
        type: sequelize.Sequelize.ENUM(
          "skills",
          "future",
          "total",
          "emp",
          "other",
          "salary",
          "opportunitySummary",
          "opportunitySummaryUr"
        ),
        allowNull: false,
        defaultValue: "other",
      },
      user_id: {
        type: sequelize.Sequelize.UUID,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  Score.associate = (models) => {
    // Add associations here
    Score.belongsTo(models.Country, { foreignKey: "country_id" });
    Score.belongsTo(models.Assessments, { foreignKey: "assessment_id" });
  };

  return Score;
};
