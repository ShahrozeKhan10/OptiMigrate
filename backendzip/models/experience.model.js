module.exports = (sequelize, DataTypes) => {
  let Experience = sequelize.define(
    "Experience",
    {
      id: {
        primaryKey: true,
        type: sequelize.Sequelize.UUID,
        defaultValue: sequelize.Sequelize.UUIDV4
      },
      user_id: {
        type: sequelize.Sequelize.UUID,
        allowNull: false
      },
      description: {
        type: sequelize.Sequelize.STRING,
        defaultValue: ""
      },
      designation: {
        type: sequelize.Sequelize.STRING,
        defaultValue: ""
      },
      company: {
        type: sequelize.Sequelize.STRING
      },
      start_year: {
        type: sequelize.Sequelize.STRING(4)
      },
      start_year_utc: {
        type: sequelize.Sequelize.STRING
      },
      end_year_utc: {
        type: sequelize.Sequelize.STRING
      },
      end_year: {
        type: sequelize.Sequelize.STRING(4),
        defaultValue: ""
      },
      is_working: {
        type: sequelize.Sequelize.BOOLEAN,
        defaultValue: false
      },
      location: {
        type: sequelize.Sequelize.STRING,
        allowNull: true
      }
    },
    {
      underscored: true
    }
  );

  return Experience;
};
