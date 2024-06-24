module.exports = (sequelize) => {
  let UserAssessements = sequelize.define(
    "UserAssessements",
    {
      user_id: {
        type: sequelize.Sequelize.UUID,
      },
      project_id: {
        type: sequelize.Sequelize.UUID,
      },
      type: {
        type: sequelize.Sequelize.ENUM(
          "saved",
          "applied",
          "visited",
          "visited_saved"
        ),
      },
      saved_at: {
        type: sequelize.Sequelize.DATE,
        allowNull: true,
      },
      applied_at: {
        type: sequelize.Sequelize.DATE,
        allowNull: true,
      },
    },
    {
      underscored: true,
    }
  );

  UserAssessements.associate = () => {};

  return UserAssessements;
};
