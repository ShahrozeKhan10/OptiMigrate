module.exports = (sequelize, DataTypes) => {
  let SkillScrappingData = sequelize.define(
    "SkillScrappingData",
    {
      id: {
        primaryKey: true,
        type: sequelize.Sequelize.UUID,
        defaultValue: sequelize.Sequelize.UUIDV4,
      },
      skill: {
        type: sequelize.Sequelize.STRING,
        defaultValue: "",
      },
      scraping_data: {
        type: sequelize.Sequelize.JSON,
        defaultValue: [],
      },
    },
    {
      underscored: true,
    }
  );

  return SkillScrappingData;
};
