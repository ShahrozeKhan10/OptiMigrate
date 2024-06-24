
module.exports = (sequelize, DataTypes) => {
    let UserInterest = sequelize.define('UserInterest', {
            user_id: {
                type: sequelize.Sequelize.UUID,
            },
            interest_id: {
                type: sequelize.Sequelize.UUID,
            }
        },
        {
            underscored: true
        });

    UserInterest.associate = (models) => {
    };

    return UserInterest;
};
