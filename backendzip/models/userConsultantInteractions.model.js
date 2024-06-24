module.exports = (sequelize, DataTypes) => {
  let UserConsultantInteractions = sequelize.define(
    "UserConsultantInteractions",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      underscored: true,
    }
  );

  UserConsultantInteractions.associate = (models) => {
    UserConsultantInteractions.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });

    UserConsultantInteractions.belongsTo(models.Consultant, {
      foreignKey: "consultant_id",
      as: "consultant",
    });
  };

  return UserConsultantInteractions;
};
