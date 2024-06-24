module.exports = (sequelize, Datatypes) => {
    let UserRecommendedCourse = sequelize.define(
        "UserRecommendedCourse",
        {
            user_id: {
                type: sequelize.Sequelize.UUID
            },
            course_id: {
                type: sequelize.Sequelize.UUID
            }
        },
        { underscored: true }
    );


    return UserRecommendedCourse;
};
