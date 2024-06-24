module.exports = (sequelize, DataTypes) => {
  let UserTests = sequelize.define(
    "UserTests",
    {
      id: {
        primaryKey: true,
        type: sequelize.Sequelize.UUID,
        defaultValue: sequelize.Sequelize.UUIDV4,
      },
      test_id: {
        type: sequelize.Sequelize.UUID,
      },
      user_id: {
        type: sequelize.Sequelize.UUID,
      },
      status: {
        type: sequelize.Sequelize.ENUM(
          "PENDING",
          "IN_REVIEW",
          "FAILED",
          "PASSED",
          "OTHERS"
        ),
        allowNull: false,
        defaultValue: "PENDING",
      },
    },
    {
      underscored: true,
    }
  );
  return UserTests;
};
