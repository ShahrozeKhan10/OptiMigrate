const httpStatus = require("http-status");
const { ErrorHandler } = require("../helper/error");
const {
  Skill,
  sequelize,
  ProfessionSkill,
  ProfessionDetails,
  SkillScrappingData,
  UserSaveCourses,
} = require("../models");
const { removedUndefined } = require("../helper/common");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

let skillService = {
  // TODO: Refactoring needed. Can be solved using joins
  getAllSkills: async (query, orderBy = "ASC", page = 0, size = 10, type) => {
    let where = {};
    if (query !== "" || type !== "") {
      where = {
        [Op.or]: [{ name: { [Op.like]: `%${query}%` } }],
        type: type ? type : undefined,
      };
    }
    where = removedUndefined(where);
    try {
      let skills = await Skill.findAndCountAll({
        limit: [Number(page) * Number(size), Number(size)],
        raw: true,
        order: [["createdAt", orderBy]],
        where: where,
      });

      for (let skill of skills.rows) {
        const professionSkills = await ProfessionSkill.findAll({
          where: { skill_id: skill.id },
          raw: true,
        });

        for (let prof of professionSkills) {
          skill["professions"] = await ProfessionDetails.findAll({
            where: { ilo_id: prof.profession_id },
            raw: true,
          }).map((profession) => ({
            ...profession,
            ...{ weightage: prof.weightage },
          }));
        }
      }

      return { skills: skills, count: skills.count };
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  update: async (skill) => {
    if (typeof skill === "object" && !skill.length) {
      await Skill.update(skill, { where: { id: skill.id } });
    } else if (typeof skill === "object" && skill.length > 0) {
      const promiseArray = [];
      for (let sk of skill) {
        promiseArray.push(Skill.update(sk, { where: { id: sk.id } }));
      }
      return Promise.all(promiseArray);
    }
  },

  checkIfProfessionExists: async (skill) => {
    if (typeof skill === "object" && !skill.length) {
      const count = await ProfessionSkill.count({
        where: { skill_id: skill.id },
      });
      return { id: skill.id, found: count > 0, count: count };
    } else if (typeof skill === "object" && skill.length > 0) {
      const arrayToReturn = [];
      for (let sk of skill) {
        const count = await ProfessionSkill.count({
          where: { skill_id: sk.id },
        });
        arrayToReturn.push({ id: sk.id, found: count > 0, count: count });
      }
      return arrayToReturn;
    }
  },

  checkIfSkillsExistsAgainstProfessions: async (profession_id) => {
    const allSkills = ProfessionSkill.findAll({
      where: { profession_id: profession_id },
      raw: true,
    });

    return allSkills.map((skill) => ({ id: skill.skill_id }));
  },

  getSkills: async (
    profession_id,
    type,
    query,
    page = 0,
    size = 10,
    orderBy = "ASC"
  ) => {
    page = Number(page) * Number(size);
    try {
      let skills;
      let count;

      if (type === "s") {
        const { ilo_id } = await ProfessionDetails.findOne({
          where: { id: profession_id },
          attributes: ["ilo_id"],
          raw: true,
        });
        skills = await sequelize.query(
          `SELECT
          skills.id,
          skills.name as name,
          skills.type,
          CASE WHEN ${
            process.env.NODE_ENV === "development"
              ? "profession_skills.weightage"
              : "ANY_VALUE(profession_skills.weightage)"
          }
          IS NULL THEN 0 ELSE ${
            process.env.NODE_ENV === "development"
              ? "profession_skills.weightage"
              : "ANY_VALUE(profession_skills.weightage)"
          }
          END AS weightage
          FROM skills
          LEFT JOIN profession_skills on profession_skills.profession_id = '${ilo_id}' AND
          profession_skills.skill_id = skills.id
          WHERE skills.type = '${type}'
          AND skills.name LIKE '%${query}%'
          GROUP BY skills.id
          ORDER BY skills.name ${orderBy}
          LIMIT ${page}, ${size}`,
          { type: sequelize.QueryTypes.SELECT }
        );

        count = await sequelize.query(
          `SELECT COUNT(*) as count 
          FROM skills
          ${
            type === "s" ? "LEFT" : "INNER"
          } JOIN profession_skills on profession_skills.profession_id = '${ilo_id}'
          WHERE skills.type = '${type}'
          AND skills.name LIKE '%${query}%'
          GROUP BY skills.id
          ORDER BY skills.name ${orderBy}`,
          { type: sequelize.QueryTypes.SELECT }
        );
      } else {
        skills = await sequelize.query(
          `SELECT 
            skills.id,
            skills.name as name,
            skills.type,
            profession_skills.weightage
            FROM
            skills INNER JOIN (profession_skills INNER JOIN professions ON professions.id = profession_skills.profession_id AND
            (profession_skills.profession_id = '${profession_id}' OR profession_skills.profession_id = (SELECT ilo_id from profession_details WHERE id = '${profession_id}'))) 
            ON skills.id = profession_skills.skill_id 
            AND skills.type = '${type}'
            AND skills.name LIKE '%${query}%'
            ORDER BY skills.name ${orderBy}
            LIMIT ${page}, ${size}; `,
          { type: sequelize.QueryTypes.SELECT }
        );

        count = await sequelize.query(
          `SELECT 
            count(*) as count
            FROM
            skills INNER JOIN (profession_skills INNER JOIN professions ON professions.id = profession_skills.profession_id AND
            profession_skills.profession_id = '${profession_id}') ON skills.id = profession_skills.skill_id 
            AND skills.type = '${type}'
            AND skills.name LIKE '%${query}%'
            AND professions.id = '${profession_id}'; `,
          { type: sequelize.QueryTypes.SELECT }
        );
      }

      return { skills: skills, count: count[0].count };
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },
  getUserSkills: async (skills) => {
    try {
      let userCourses = await SkillScrappingData.findAll({
        where: {
          skill: skills,
        },
        raw: true,
        logging: false,
      });

      return userCourses;
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },
  getSaveCourses: async (userId) => {
    try {
      const getSavedCourses = await UserSaveCourses.findAll({
        where: {
          user_id: userId,
        },
      });

      return getSavedCourses;
    } catch (e) {
      console.log(e);
    }
  },

  saveUserSkills: async (link, userId) => {
    console.log(link, userId);
    try {
      const existingRecord = await UserSaveCourses.findOne({
        where: {
          link,
          user_id: userId,
        },
      });
      if (existingRecord) {
        await UserSaveCourses.destroy({
          where: { id: existingRecord.dataValues.id },
        });
        return true;
      } else {
        const response = UserSaveCourses.create({
          link,
          user_id: userId,
        });
        return response;
      }
    } catch (e) {
      console.log(e);
    }
  },

  getSkillsByName: async (name) => {
    try {
      return await Skill.findOne({
        where: {
          name: name,
        },
        attributes: { exclude: ["updatedAt", "createdAt"] },
        raw: true,
      });
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  getSkillsById: async (id) => {
    try {
      let skill = await sequelize.query(
        `SELECT 
            name, type 
            FROM
            skills WHERE id = '${id}';`,
        { type: sequelize.QueryTypes.SELECT }
      );
      return skill;
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },
};

module.exports = skillService;
