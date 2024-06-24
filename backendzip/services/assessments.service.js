const httpStatus = require("http-status");
const { ErrorHandler } = require("../helper/error");
const { Assessments, Country, User, Visa } = require("../models");
const Sequelize = require("sequelize");
const { ASSESSMENT_STATUS } = require("../config/constants");

const Op = Sequelize.Op;

let assessmentService = {
  createAssessment: async (data, userId) => {
    const {
      originCountryId: origin_country_id,
      residenceCountryId: residence_country_id,
      desiredCountries,
      dob,
      professionId: profession_id,
      saving: savings_in_dollars,
    } = data;

    console.log({data})

    try {
      const assessment = await Assessments.create({
        user_id: userId,
        profession_id,
        origin_country_id,
        residence_country_id,
        savings_in_dollars,
        status: ASSESSMENT_STATUS.PENDING,
      });
      console.log({assessment})
      if (dob) {
        const user = await User.findByPk(userId);
        if (user !== null) {
          user.dob = dob;
          await user.save();
        }
      }

      // Associate the assessment with countries
      const _desiredCountries = await assessment.setAssessment_country(
        desiredCountries
      ); // Assuming countryIds is an array of country IDs

      console.log({_desiredCountries})

      return {
        ...assessment.toJSON(),
        desiredCountries: _desiredCountries,
      };
    } catch (e) {
      console.log(e);
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },
  getAssessments: async () => {
    try {
      const assessments = await Assessments.findAll({
        include: {
          model: Country,
          as: "assessment_country",
          attributes: [
            "id",
            "name",
            "code",
            "continent",
            "isActive",
            // "hasDetails",
          ],
        },
      });

      return assessments;
    } catch (error) {
      console.error(error);
      throw new ErrorHandler(httpStatus.BAD_REQUEST, error.message);
      // res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Get a single assessment with associated countries by ID
  getUserAssessment: async (userId) => {
    try {
      const assessments = await Assessments.findAll({
        order: [["createdAt", "DESC"]],
        limit: 1,
        plain: true,
        include: [
          {
            model: Country,
            as: "assessment_country",
            attributes: [
              "id",
              "name",
              "code",
              "continent",
              "isActive",
              "hasDetails",
              "gdp",
              "total_population",
              "pakistanis",
              "muslim_population",
              "muslim_percentage",
              "world_muslim_percentage",
              "video_links",
              "stats",
              "flag",
              "short_description",
            ],
          },
          {
            model: User,
            as: "user",
            where: { id: userId },
          },
        ],
      });

      if (assessments?.result) {
        assessments.result = JSON.parse(assessments.result);
      }

      return assessments;
    } catch (error) {
      console.error(error);
      throw new ErrorHandler(httpStatus.BAD_REQUEST, error.message);
      // res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Get a single assessment with associated countries by ID
  getUserAssessmentWithResult: async (userId) => {
    try {
      let assessments = await Assessments.findAll({
        order: [["createdAt", "DESC"]],
        limit: 2,
        logging: false,
        where: {
          status: {
            [Op.in]: [
              ASSESSMENT_STATUS.IN_PROGRESS,
              ASSESSMENT_STATUS.COMPLETED,
            ],
          },
        },
        include: [
          {
            model: Country,
            as: "assessment_country",
            plain: true,
            include: [
              {
                model: Visa,
                as: "visas",
              },
            ],
            attributes: [
              "id",
              "name",
              "name_ur",
              "code",
              "continent",
              "isActive",
              "hasDetails",
              "gdp",
              "total_population",
              "pakistanis",
              "muslim_population",
              "muslim_percentage",
              "world_muslim_percentage",
              "video_links",
              "stats",
              "flag",
              "short_description",
              "short_description_ur",
            ],
          },
          {
            model: User,
            as: "user",
            where: { id: userId },
          },
        ],
      });

      if (!assessments || assessments.length === 0) {
        console.log("getUserAssessmentWithResult: ", 1);
        return null;
      }

      const assessmentsPlain = assessments.map((assessment) =>
        assessment.get({ plain: true })
      );

      // Case 1: Default case
      let assessment = assessmentsPlain[0];

      if (assessmentsPlain.length === 1) {
        console.log("getUserAssessmentWithResult: ", 2);
        // Case 2: If we have 1 assessment and it's in_progress
        if (assessmentsPlain[0].status === ASSESSMENT_STATUS.IN_PROGRESS) {
          console.log("getUserAssessmentWithResult: ", 3);
          assessment = { retry: true };
        } else {
          console.log("getUserAssessmentWithResult: ", 4);
          assessment = assessmentsPlain[0];
        }
      } else if (assessmentsPlain.length === 2) {
        console.log("getUserAssessmentWithResult: ", 5);
        const inProgressAssessment = assessmentsPlain.find(
          (assessment) => assessment.status === ASSESSMENT_STATUS.IN_PROGRESS
        );
        const completedAssessment = assessmentsPlain.find(
          (assessment) => assessment.status === ASSESSMENT_STATUS.COMPLETED
        );

        // Case 3: If we have 2 assessments, one in_progress, and one completed
        if (inProgressAssessment && completedAssessment) {
          console.log("getUserAssessmentWithResult: ", 6);
          assessment = { ...completedAssessment, retry: true };
        }
      }

      if (assessment?.result) {
        console.log("getUserAssessmentWithResult: ", 7);
        const countryScoreMap = {};
        assessment.assessment_country.forEach(
          (country) => (countryScoreMap[country.id] = country)
        );

        assessment.result = JSON.parse(assessment.result);

        assessment.result.skillScore.scores.forEach((score) => {
          const countryData = countryScoreMap[score.country_id];
          if (countryData) {
            if (score.type === "salary")
              countryScoreMap[score.country_id][score.type] = JSON.parse(
                score.score
              );
            else countryScoreMap[score.country_id][score.type] = score.score;
          }
        });
        assessment.assessment_country = [...Object.values(countryScoreMap)];
      }
      console.log("getUserAssessmentWithResult: ", 8, "\n\n");

      return assessment;
    } catch (error) {
      console.error(error);
      throw new ErrorHandler(httpStatus.BAD_REQUEST, error.message);
    }
  },

  updateAssessment: async (data, id) => {
    try {
      return Assessments.update(data, { where: { id } });
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },
};

module.exports = assessmentService;
