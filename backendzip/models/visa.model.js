module.exports = (sequelize, DataTypes) => {
  let Visa = sequelize.define(
    "Visa",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: sequelize.Sequelize.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      visaType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      visaRequirements: {
        type: DataTypes.TEXT,
      },
      visaDuration: {
        type: DataTypes.STRING,
      },
      meta: {
        type: DataTypes.JSON,
      },
      link: {
        type: DataTypes.STRING,
        allowNull: true
      },
    },
    {
      underscored: true,
    }
  );

  Visa.associate = (models) => {
    Visa.belongsTo(models.Country, {
      foreignKey: "country_id",
      as: "country",
    });
    Visa.belongsTo(models.Country, {
      foreignKey: "origin_country_id",
      as: "originCountry",
    });
  };
  return Visa;
};
