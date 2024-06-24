const httpStatus = require("http-status");
const { ErrorHandler } = require("../helper/error");
const { ProfessionDetails, Profession, sequelize } = require("../models");
const Sequelize = require("sequelize");

let professionService = {
  getProfessions: async (orderBy = "ASC", page = 0, size = 10, query) => {
    try {
      return sequelize.query(
        `SELECT pd.id as id, pd.name as name, p.ilo as ilo, pd.ilo_id as ilo_id from profession_details pd ` +
          `INNER JOIN professions p ON pd.ilo_id = p.id ` +
          `WHERE pd.name LIKE '%${query}%' ` +
          `ORDER BY ` +
            `CASE ` +
              `WHEN name REGEXP '^[A-Za-z]' THEN 0 ` +
              `ELSE 1 `+
            `END, ` +
            `name ${orderBy} ` +
          `LIMIT ${parseInt(page) * parseInt(size)}, ${parseInt(size)}`,
        {
          type: sequelize.QueryTypes.SELECT,
          nest: true,
        }
      );
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  getOneProfession: async (query) => {
    try {
      return sequelize.query(
        `SELECT pd.id as id, pd.name as name, p.ilo as ilo, pd.ilo_id as ilo_id
        FROM profession_details pd
        INNER JOIN professions p ON pd.ilo_id = p.id
        WHERE pd.name LIKE '%${query}%'
        ORDER BY CASE
            WHEN pd.name = 'so' THEN 1  -- Exact match
            ELSE 2  -- Other matches
        END
        LIMIT 1;`,
        {
          type: sequelize.QueryTypes.SELECT,
          nest: true,
        }
      );
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  getUniqueProfessions: async ({ q, orderBy = "ASC", page = 0, size = 10 }) => {
    try {
      if (!q) {
        let { rows: professions, count } = await Profession.findAndCountAll({
          limit: [Number(page) * Number(size), Number(size)],
          order: [["createdAt", orderBy]],
          raw: true,
        });

        for (let profession of professions) {
          profession["alternative_names"] = await ProfessionDetails.findAll({
            where: { ilo_id: profession.id },
            raw: true,
          });

          profession["skills"] = await sequelize.query(
            `SELECT PS.weightage, SK.* FROM profession_skills PS
          left outer join skills SK on PS.skill_id = SK.id
          where PS.profession_id = '${profession.id}'`,
            { type: sequelize.QueryTypes.SELECT }
          );
        }
        return { rows: professions, count };
      } else {
        let professions = [];
        const uniqueIds = await sequelize.query(
          `SELECT pd.ilo_id FROM profession_details pd where name like '%${q}%'
           group by pd.ilo_id LIMIT ${Number(page) * Number(size)}, ${Number(
            size
          )}`,
          { type: sequelize.QueryTypes.SELECT }
        );

        for (let id of uniqueIds) {
          const profession = await Profession.findOne({
            where: { id: id.ilo_id },
            raw: true,
          });
          professions.push(profession);
        }

        for (let profession of professions) {
          profession["alternative_names"] = await ProfessionDetails.findAll({
            where: { ilo_id: profession.id },
            raw: true,
          });

          profession["skills"] = await sequelize.query(
            `SELECT PS.weightage, SK.* FROM profession_skills PS
          left outer join skills SK on PS.skill_id = SK.id
          where PS.profession_id = '${profession.id}'`,
            { type: sequelize.QueryTypes.SELECT }
          );
        }
        return { rows: professions, count: professions.length };
      }
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },

  getProfessionById: async (id) => {
    try {
      return await ProfessionDetails.findOne({
        where: {
          id: id,
        },
      });
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },
  getProfessionByName: async (name) => {
    try {
      let professions = await Profession.findOne({
        attributes: ["id", "name"],
        raw: true,
        where: {
          name: name,
        },
      });
      return professions;
    } catch (e) {
      throw new ErrorHandler(httpStatus.BAD_REQUEST, e.message);
    }
  },
};

module.exports = professionService;
