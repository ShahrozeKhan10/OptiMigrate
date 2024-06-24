const xlsx = require("xlsx");
const _ = require("lodash");
const path = require("path");
const { sequelize, Visa } = require("../models");

const inputFile1 = path.resolve("datasets/New_1_Countries_Visas_Database.xlsx");

async function seedVisas() {
  try {
    /* Don't have data of these countries in our Countries Table */
    /* 
     * Burma
     * Kosovo
     * Serbia
     * Vietnam
     * Eswatini
     * */
    /**
     * Use this mapper if DB name is different than data in Excel
     */
    const countryNameMapper = {
      "Benin (Dahomey)": "Benin",
      "Burkina Faso (Upper Volta)": "Burkina Faso",
      "Republic of Korea (South Korea)": "Korea (South)",
      "South Sudan": "Sudan",
    };
    const countriesNotFound = [];

    const workbook = xlsx.readFile(inputFile1);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet, { header: 1, raw: true });

    data.shift();

    const countryPromises = data.map(async (row) => {
      let [, countryName] = row;
      if (countryName) {
        countryName = countryName.replace("’", "'");
      }
      if (countryNameMapper[countryName]) {
        countryName = countryNameMapper[countryName];
      }

      const record = await sequelize.query(
        `SELECT id, name FROM countries WHERE name like "%${countryName}%" ESCAPE '\'`,
        { plain: true }
      );
      if (record === null) {
        countriesNotFound.push(countryName);
      }
      return record;
    });

    const countryResults = await Promise.all(countryPromises);

    const visaData = countryResults
      .map((country, index) => {
        const row = data[index];
        const name = row[2];
        let type = row[3];
        const link = row[4];

        if (!country || !name) {
          console.log("NOT FOUND ____ ", row.length ? row[1] : index);
          return null;
        }
        type = type?.toLowerCase()?.trim();

        return {
          name: name,
          description: row[2],
          visaType: type,
          link,
          country_id: country?.id,
          country_name: country?.name,
        };
      })
      .filter((country, index) => {
        if (country?.country_id) {
          return true;
        } else {
          console.log("NOT FOUND! ", country);
          countriesNotFound.push(data[index]);
          return false;
        }
      });

    await Visa.bulkCreate(visaData);
  } catch (e) {
    console.error("Seeder error:", e);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return seedVisas();
  },

  down: async (queryInterface, Sequelize) => {
    console.log("truncating...");
    await Visa.truncate();
    console.log("truncated");
  },
};
