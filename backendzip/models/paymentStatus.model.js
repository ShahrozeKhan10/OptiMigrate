module.exports = (sequelize, DataTypes) => {
  let PaymentStatus = sequelize.define(
    "PaymentStatus",
    {
      id: {
        primaryKey: true,
        type: sequelize.Sequelize.UUID,
        defaultValue: sequelize.Sequelize.UUIDV4,
      },
      transaction_id: {
        primaryKey: true,
        type: sequelize.Sequelize.UUID,
        defaultValue: sequelize.Sequelize.UUIDV4,
      },
      date_creation: {
        type: sequelize.Sequelize.JSON,
        defaultValue: null,
      },
      user_id: {
        type: sequelize.Sequelize.STRING,
        defaultValue: null,
      },
      email: {
        type: sequelize.Sequelize.STRING,
        defaultValue: null,
      },
      payment_intent: {
        type: sequelize.Sequelize.STRING,
        defaultValue: null,
      },
      payment_status: {
        type: sequelize.Sequelize.STRING,
        defaultValue: null,
      },
      payment_id: {
        type: sequelize.Sequelize.STRING,
        defaultValue: null,
      },
      customer_id: {
        type: sequelize.Sequelize.STRING,
        defaultValue: null,
      },
      subscription_id: {
        type: sequelize.Sequelize.STRING,
        defaultValue: null,
      },
    },
    {
      underscored: true,
    }
  );

  PaymentStatus.associate = (models) => {
    PaymentStatus.belongsTo(models.PaymentPlan, {
      foreignKey: "payment_plan_id",
    });
  };

  return PaymentStatus;
};
