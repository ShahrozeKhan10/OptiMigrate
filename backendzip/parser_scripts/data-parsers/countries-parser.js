const xlsx = require("xlsx");
const _ = require("lodash");
const path = require("path");
const { sequelize, Country } = require("../../models");

const inputFile1 = path.resolve("datasets/countries_23_oct_data.xlsx");

function isJSON(data) {
  try {
    return JSON.parse(data);
  } catch (error) {
    console.log(data);
    return false;
  }
}

const updateCountries = async (req, res, next) => {
  try {
    const workbook = xlsx.readFile(inputFile1);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet, { header: 1, raw: true });

    data.shift();

    // 0 id
    // 1 name
    // 2 code
    // 3 continent
    // 4 name_ur
    // 5 map
    // 6 video_links
    // 7 flag
    const countryPromises = data.map(async (row) => {
      let [id, name, code, continent, name_ur, map, video_links, flag] = row;
      console.log(id, name, video_links);

      // const { id, ...fieldsToUpdate } = update; // Extract id and fields to update
      return Country.update(
        {
          id,
          // name,
          // code,
          // continent,
          name_ur,
          map,
          video_links: isJSON(video_links) ? JSON.parse(video_links) : null,
          flag,
        },
        { where: { id } }
      );
      return {
        id,
        name,
        // code,
        // continent,
        // name_ur,
        // map,
        video_links: isJSON(video_links) ? JSON.parse(video_links) : null,
        // flag,
      };
    });

    // const updatePromises = data.map((update) => {
    //   const { id, ...fieldsToUpdate } = update; // Extract id and fields to update
    //   return Country.update(fieldsToUpdate, { where: { id } });
    // });

    const countryResults = await Promise.all(countryPromises);

    return res.json({
      data: data.length,
      countryResultsLength: countryResults.length,
      countryResults: countryResults,
    });
  } catch (e) {
    next(e);
  }
};

exports.updateCountries = updateCountries;
