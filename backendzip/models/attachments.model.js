module.exports = (sequelize, DataTypes) => {
  let Attachment = sequelize.define('Attachment', {
    id: {
      primaryKey: true,
      type: sequelize.Sequelize.UUID,
      defaultValue: sequelize.Sequelize.UUIDV4,
    },
    key: {
      type: sequelize.Sequelize.STRING,
      allowNull: true,
    },
    name: {
      type: sequelize.Sequelize.STRING,
      allowNull: true,
    },
    type: {
      type: sequelize.Sequelize.ENUM('cv', 'profile', 'project', 'other'),
      allowNull: true,
    },
    url: {
      type: sequelize.Sequelize.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    user_id: {
      type: sequelize.Sequelize.UUID,
      allowNull: true,
    },
    project_id: {
      type: sequelize.Sequelize.UUID,
      allowNull: true,
    },
  },
  {
    underscored: true,
  });
  return Attachment;
};
