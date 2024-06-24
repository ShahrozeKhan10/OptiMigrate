module.exports = (sequelize, DataTypes) => {
  let TestUser = sequelize.define(
    "TestUser",
    {
      user_id: {
        type: sequelize.Sequelize.UUID
      },
    },
    {
      underscored: true,
    }
  );

  return TestUser;
};
