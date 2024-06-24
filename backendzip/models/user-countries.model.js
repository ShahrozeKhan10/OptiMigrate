const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const UserCountry = sequelize.define(
    "UserCountry",
    {
      is_free: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      underscored: true,
    }
  );

  UserCountry.associate = (models) => {
    UserCountry.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });

    UserCountry.belongsTo(models.Country, {
      foreignKey: "country_id",
      as: "country",
    });
  };

  return UserCountry;
};
