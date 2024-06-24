module.exports = (sequelize, DataTypes) => {
  let Country = sequelize.define(
    "Country",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      name_ur: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING(2),
        allowNull: false,
      },
      continent: {
        type: DataTypes.STRING(255),
      },
      isActive: {
        type: DataTypes.BOOLEAN,
      },
      hasDetails: {
        type: DataTypes.BOOLEAN,
      },
      details: {
        type: DataTypes.TEXT,
      },
      details_ur: {
        type: DataTypes.TEXT,
      },
      gdp: {
        type: DataTypes.INTEGER,
      },
      total_population: {
        type: DataTypes.BIGINT,
      },
      pakistanis: {
        type: DataTypes.INTEGER,
      },
      muslim_population: {
        type: DataTypes.INTEGER,
      },
      muslim_percentage: {
        type: DataTypes.FLOAT,
      },
      world_muslim_percentage: {
        type: DataTypes.FLOAT,
      },
      flag: {
        type: DataTypes.TEXT,
      },
      video_links: {
        type: DataTypes.JSON,
      },
      stats: {
        type: DataTypes.JSON,
      },
      short_description: {
        type: DataTypes.TEXT,
      },
      map: {
        type: DataTypes.STRING(255),
      },
    },
    {
      underscored: true,
      tableName: "countries", // Set the table name if different from the model name
      timestamps: false, // Set this to true if you want to include timestamps (createdAt and updatedAt) in your table
    }
  );
  Country.associate = (models) => {
    models.Country.hasMany(models.Consultant, {
      foreignKey: "country_id",
      as: "consultants",
    });
    models.Country.hasMany(models.Consultant, {
      foreignKey: "country_id",
      as: "countryExperts",
    });
    models.Country.hasMany(models.Visa, {
      foreignKey: "country_id",
      as: "visas",
    });
    models.Country.belongsToMany(models.User, {
      through: "UserCountry", // Use the junction table model name
      foreignKey: "country_id",
      otherKey: "user_id",
      as: "users", // Define an alias for the association
    });
    models.Country.hasMany(models.Question, {
      foreignKey: "country_id",
      as: "questions",
    });
  };
  return Country;
};
