let {ERROR_CODES} = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
    let UserSkill = sequelize.define('UserSkill', {
            user_id: {
                type: sequelize.Sequelize.UUID,
            },
            skill_id: {
                type: sequelize.Sequelize.UUID,
            },
            skill_rate: {
                type: sequelize.Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            }
        },
        {
            underscored: true
        });

    UserSkill.associate = (models) => {
    };

    return UserSkill;
};
