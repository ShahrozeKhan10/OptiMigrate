module.exports = (sequelize, DataTypes) => {
  let Tests = sequelize.define(
    "Tests",
    {
      id: {
        primaryKey: true,
        type: sequelize.Sequelize.UUID,
        defaultValue: sequelize.Sequelize.UUIDV4,
      },
      title: {
        type: sequelize.Sequelize.STRING,
        allowNull: false,
        defaultValue: "",
      },
      description: {
        type: sequelize.Sequelize.STRING,
        allowNull: true,
        defaultValue: "",
      },
      for: {
        type: sequelize.Sequelize.STRING,
        allowNull: true,
        defaultValue: "students",
      },
      skills: {
        type: sequelize.Sequelize.STRING,
        allowNull: true,
        defaultValue: "",
      },
      type: {
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
  return Tests;
};
