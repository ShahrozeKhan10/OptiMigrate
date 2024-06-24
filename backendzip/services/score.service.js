const httpStatus = require("http-status");
const { ErrorHandler } = require("../helper/error");
const {
  Score,
  Skill,
  UserSkill,
  User,
  Formulae,
  ActiveFormulae,
  TestConfig,
} = require("../models");
const ScoreScript = require("../python/score_scripts/fetch-score");
const { executor } = require("../python/executer");
const appRoot = require("app-root-path");
const Sequelize = require("sequelize");
const chatService = require("./chat.service");

let scoreService = {
  calculateScore: async (userId, userAssessment, assessmentCountries) => {
    const userService = require("../services/user.service");
    try {
      let user = await userService.getFullUserProfile(userId);

      let qualification = [];
      if (user[0].dataValues.education.length) {
        qualification = user[0].dataValues.education.map(
          (education) => education.dataValues
        );
      }

      let skills = [];
      if (user[0].dataValues.user_skills.length) {
        skills = user[0].dataValues.user_skills.map(
          (user_skill) => user_skill.dataValues.name
        );
      }

      let experience = [];
      if (user[0].dataValues.experience.length) {
        experience = user[0].dataValues.experience.map(
          (_experience) => _experience.dataValues
        );
      }

      /**
       * Calculate Score
       */

      await Score.destroy({
        where: {
          user_id: userId,
          assessment_id: userAssessment.id,
        },
      });
      for (let i = 0; i < assessmentCountries.length; i++) {
        const { id, name } = assessmentCountries[i];
        const score = await ScoreScript.fetchScore({
          qualification: qualification,
          skills: skills,
          experience: experience,
          field: user[0].dataValues.profession_name,
          location: name,
        });
        console.log("USER ======== > ", userAssessment?.user);
        const opportunitySummary = await chatService.handleChat({
          content: userAssessment.resume_text_content,
          question:
            "I would like to explore a list of job positions in " +
            name +
            " that align with my skills, qualifications, and career goals. Please provide details of potential job positions I can fit into, along with their respective salary ranges and any information about the passport worth. I'm open to considering a range of international options, including opportunities that can facilitate acquiring citizenship or work visas.",
        });

        const opportunitySummaryUr = await chatService.translateSummary(opportunitySummary);

        /**
         * Store Score in Database
         */
        await scoreService.addSkillsScore(
          userId,
          score.skillReadiness,
          score.jobAvailabilityScore,
          score.futureReadinessScore,
          score.overallScore,
          opportunitySummary,
          opportunitySummaryUr,
          id,
          userAssessment.id,
          score?.salary
        );
      }
    } catch (e) {
      console.log("calculateScore: error: ", e.message);
      console.log("calculateScore: error: ", e.response);
      if (e.response && e.response.data && e.response.data.error) {
        console.log(
          "calculateScore: e.response.data.error: ",
          e.response.data.error
        );
      }
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },
  getUserScore: async (userData) => {
    let sr_formulae = await Formulae.findOne({
      include: [
        {
          model: ActiveFormulae,
          where: {
            variant: "skill-readiness",
          },
          attributes: [],
        },
      ],
    });
    let es_formula = await Formulae.findOne({
      include: [
        {
          model: ActiveFormulae,
          where: {
            variant: "employability-score",
          },
          attributes: [],
        },
      ],
    });
    let fr_formula = await Formulae.findOne({
      include: [
        {
          model: ActiveFormulae,
          where: {
            variant: "future-readiness",
          },
          attributes: [],
        },
      ],
    });
    let ta_formula = await Formulae.findOne({
      include: [
        {
          model: ActiveFormulae,
          where: {
            variant: "total-assessment",
          },
          attributes: [],
        },
      ],
    });

    let configs = await TestConfig.findAll();
    configs = configs && configs.length > 0 ? configs[0] : {};

    let data = {
      ...userData,
      country: userData.country ? JSON.parse(userData.country).name : "",
      city: userData.city ? JSON.parse(userData.city).name : "",
      sr_formula: sr_formulae.expression,
      es_formula: es_formula.expression,
      fr_formula: fr_formula.expression,
      ta_formula: ta_formula.expression,
      top_cand_skills_ctrl: configs["top_cand_skills_ctrl_prod"] + "",
      total_cand_skills_ctrl: configs["total_cand_skills_ctrl_prod"] + "",
    };

    try {
      let rawData = await executor.execute(
        appRoot + "/python/score_scripts/scores.py",
        JSON.stringify(data)
      );

      return rawData.replace("\r\n", "");
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },
  addSkillsScore: async (
    userId,
    skillReadiness,
    employee,
    future,
    total,
    opportunitySummary,
    opportunitySummaryUr,
    countryId,
    assessmentId,
    salary
  ) => {
    try {
      let response = await Score.bulkCreate([
        {
          user_id: userId,
          score: skillReadiness,
          type: "skills",
          country_id: countryId,
          assessment_id: assessmentId,
        },
        {
          user_id: userId,
          score: employee,
          type: "emp",
          country_id: countryId,
          assessment_id: assessmentId,
        },
        {
          user_id: userId,
          score: future,
          type: "future",
          country_id: countryId,
          assessment_id: assessmentId,
        },
        {
          user_id: userId,
          score: total,
          type: "total",
          country_id: countryId,
          assessment_id: assessmentId,
        },
        {
          user_id: userId,
          score: JSON.stringify(salary),
          type: "salary",
          country_id: countryId,
          assessment_id: assessmentId,
        },
        {
          user_id: userId,
          score: opportunitySummary,
          type: "opportunitySummary",
          country_id: countryId,
          assessment_id: assessmentId,
        },
        {
          user_id: userId,
          score: opportunitySummaryUr,
          type: "opportunitySummaryUr",
          country_id: countryId,
          assessment_id: assessmentId,
        },
      ]);

      return response;
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  shouldUpdate: async (id) => {
    const lastUpdateScore = await Score.findAll({
      where: { user_id: id },
      raw: true,
    });
    const lastUpdateActive = await ActiveFormulae.findAll();

    let shouldUpdate = false;

    for (let userScore of lastUpdateScore) {
      for (let active of lastUpdateActive) {
        if (active.updatedAt > userScore.updatedAt) {
          shouldUpdate = true;
          break;
        }
      }
      if (shouldUpdate) {
        break;
      }
    }
    return shouldUpdate;
  },

  getSkillsScore: async (
    userId,
    userAssessmentId
    // orderBy = "ASC",
    // jobPage = 0,
    // jobSize = 6,
    // coursePage = 0,
    // courseSize = 3
  ) => {
    try {
      let skillScore = await User.findOne({
        where: {
          id: userId,
        },
        attributes: [
          [
            Sequelize.literal(
              `(SELECT ilo FROM professions WHERE professions.id = (SELECT ilo_id FROM profession_details WHERE id = User.profession_id))`
            ),
            "ilo",
          ],
        ],
        include: [
          {
            model: Skill,
            required: false,
            through: {
              model: UserSkill,
              attributes: [],
              where: {
                user_id: userId,
              },
            },
            as: "user_skills",
            attributes: {
              include: [
                [
                  Sequelize.literal(
                    `(select weightage from profession_skills where profession_skills.skill_id = user_skills.id AND profession_skills.profession_id = User.profession_id)`
                  ),
                  "weight",
                ],
                [
                  Sequelize.literal(
                    `(SELECT skill_rate FROM user_skills WHERE user_skills.user_id = User.id AND user_skills.skill_id = user_skills.id)`
                  ),
                  "rate",
                ],
              ],
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Score,
            required: true,
            as: "scores",
            where: {
              assessment_id: userAssessmentId,
            },
            attributes: {
              exclude: ["createdAt", "updatedAt", "user_id"],
            },
          },
        ],
      });
      // let job = await Job.findAll({
      //   limit: [Number(jobPage) * Number(jobSize), Number(jobSize)],
      //   include: [
      //     {
      //       model: User,
      //       as: "recommended_job",
      //       attributes: [],
      //       through: {
      //         model: UserRecommendedJob,
      //         where: {
      //           user_id: userId,
      //         },
      //       },
      //     },
      //   ],
      //   order: [["matched_skills", orderBy]],
      // });

      // let course = await Course.findAll({
      //   limit: [Number(coursePage) * Number(courseSize), Number(courseSize)],
      //   include: [
      //     {
      //       model: User,
      //       as: "recommended_course",
      //       attributes: [],
      //       through: {
      //         model: UserRecommendedCourse,
      //         where: {
      //           user_id: userId,
      //         },
      //       },
      //       order: [["matched_skills", orderBy]],
      //     },
      //   ],
      // });

      const localSkillScore = JSON.parse(JSON.stringify(skillScore));

      const iloScore =
        (localSkillScore.ilo === null
          ? 0
          : Number(localSkillScore.ilo[0]) / 9) * 25;
      let totalIndex = -1;
      let employabilityScore = 0;
      let skillsScore = 0;
      let futureScore = 0;
      localSkillScore.scores.map((skillScore, index) => {
        if (skillScore.type === "emp") {
          employabilityScore = (localSkillScore.scores[index].score / 33) * 25;
        } else if (skillScore.type === "skills") {
          skillsScore = (localSkillScore.scores[index].score / 33) * 25;
        } else if (skillScore.type === "future") {
          futureScore = (localSkillScore.scores[index].score / 33) * 25;
        } else if (skillScore.type === "total") {
          totalIndex = index;
        }
      });
      const total = parseInt(
        employabilityScore + skillsScore + futureScore + iloScore
      );
      localSkillScore.scores[totalIndex].score = total;
      return { skillScore: localSkillScore /* job, course */ };
    } catch (e) {
      console.log(e);
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  getPakistaniMuslimsPercentage: async (countries) => {
    const visaPercentages = countries.map((country) => {
      /* 
        TPPWRM = C.P / C.M
        TPPWRCP = C.P / C.TP
      */
      const totalPakPopulationWRTMuslims =
        (country.pakistanis / country.muslim_population) * 100;
      const totalPakPopulationWRTTotalPop =
        (country.pakistanis / country.total_population) * 100;
      const visaPercentage =
        (totalPakPopulationWRTMuslims + totalPakPopulationWRTTotalPop) / 2;

      //   const totalPakPopulation = (country.pakistanis / country.muslimPopulation) *100;
      //   const visaPercentage = (country.pakistanis / totalPopulation) * 100;

      return {
        name: country.name,
        visaPercentage: visaPercentage.toFixed(2),
        muslimPercentage: country.muslim_percentage,
        pakistaniPercentage: totalPakPopulationWRTTotalPop,
      };
    });
    return visaPercentages;
  },
};

module.exports = scoreService;
