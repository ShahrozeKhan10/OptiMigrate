module.exports = (sequelize, DataTypes) => {
  let JobAvailabilityScrappingData = sequelize.define(
    "JobAvailabilityScrappingData",
    {
      id: {
        primaryKey: true,
        type: sequelize.Sequelize.UUID,
        defaultValue: sequelize.Sequelize.UUIDV4,
      },
      field: {
        type: sequelize.Sequelize.STRING,
        defaultValue: "",
      },
      city: {
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

  return JobAvailabilityScrappingData;
};
