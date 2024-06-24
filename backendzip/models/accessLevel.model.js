const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const AccessLevel = sequelize.define(
    "AccessLevel",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      value: {
        // Allowed Countries Count
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      feature: {
        type: DataTypes.ENUM(
          "country",
          "urdu_language",
          "consultant",
          "country_expert",
          "community"
        ),
        allowNull: true,
      },
    },
    {
      underscored: true,
    }
  );

  AccessLevel.associate = (models) => {
    AccessLevel.belongsTo(models.PaymentPlan, {
      foreignKey: "paymentPlanId",
      targetKey: "id",
    });
  };

  return AccessLevel;
};
