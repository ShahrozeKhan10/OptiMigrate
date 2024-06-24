const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const PaymentPlan = sequelize.define(
    "PaymentPlan",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name_ur: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      price_variants: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      featureList: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      feature_list_ur: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      underscored: true,
    }
  );

  PaymentPlan.associate = (models) => {
    PaymentPlan.hasMany(models.AccessLevel, {
      foreignKey: "paymentPlanId",
      sourceKey: "id",
    });

    // Associate PaymentPlan with PaymentStatus
    PaymentPlan.hasMany(models.PaymentStatus, {
      foreignKey: "payment_plan_id", // Match the foreign key used in PaymentStatus
    });
  };

  return PaymentPlan;
};
