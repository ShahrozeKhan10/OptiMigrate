module.exports = (sequelize, DataTypes) => {
  let Education = sequelize.define('Education', {
      id: {
        primaryKey: true,
        type: sequelize.Sequelize.UUID,
        defaultValue: sequelize.Sequelize.UUIDV4,
      },
      degree_id: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false,
      },
      study_field_id: {
        type: sequelize.Sequelize.INTEGER,
      },
      user_id: {
        type: sequelize.Sequelize.UUID,
        allowNull: false,
      },
      start_year: {
        type: sequelize.Sequelize.STRING(4),
      },
      start_year_utc: {
        type: sequelize.Sequelize.STRING
      },
      end_year_utc: {
        type: sequelize.Sequelize.STRING
      },
      end_year: {
        type: sequelize.Sequelize.STRING(4),
      },
      is_studying: {
        type: sequelize.Sequelize.BOOLEAN,
        defaultValue: false,
      },
      university_name: {
        type: sequelize.Sequelize.STRING,
        defaultValue: ''
      },
      grade: {
        type: sequelize.Sequelize.STRING,
        allowNull: true,
      },
      location: {
        type: sequelize.Sequelize.STRING,
        allowNull: true,
      },

    },
    {
      underscored: true,
    });

  return Education;
};
