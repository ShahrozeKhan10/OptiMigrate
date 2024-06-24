module.exports = (sequelize, DataTypes) => {
  let Consultant = sequelize.define(
    "Consultant",
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
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        type: sequelize.Sequelize.ENUM('consultant', 'country_expert')
      },
      short_description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bio: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      underscored: true,
    }
  );

  Consultant.associate = (models) => {
    Consultant.belongsTo(models.Country, {
      foreignKey: "country_id",
      as: "country",
    });
  };
  return Consultant;
};
