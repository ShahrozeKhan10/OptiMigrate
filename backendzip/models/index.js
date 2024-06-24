"use strict";
let fs = require("fs");
let path = require("path");
let Sequelize = require("sequelize");
let basename = path.basename(__filename);
let db = {};
let {
  DB_DIALECT,
  DB_NAME,
  DB_HOST,
  DB_PASS,
  DB_PORT,
  DB_USER,
  USER_APP_ENDPOINT
} = require("../config/config");

console.log("DB_DIALECT: ", DB_DIALECT);
console.log("DB_NAME: ", DB_NAME);
console.log("DB_HOST: ", DB_HOST);
console.log("DB_PASS: ", DB_PASS);
console.log("DB_PORT: ", DB_PORT);
console.log("DB_USER: ", DB_USER);
console.log("DB_USER: ", USER_APP_ENDPOINT);
const FORCE = false;
const LOGGING = false;

let sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  port: DB_PORT,
  logging: LOGGING,
  force: FORCE,
  handleDisconnects: true,
  dialectOptions: {
    decimalNumbers: true,
  },
  pool: {
    max: 10,
    min: 0,
    idle: 2000000,
    // @note https://github.com/sequelize/sequelize/issues/8133#issuecomment-359993057
    acquire: 2000000,
  },
});
// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
//     );
//   })
//   .forEach((file) => {
//     const model = sequelize["import"](path.join(__dirname, file));
//     db[model.name] = model;
//   });
// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });
fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js') // Exclude this file from being imported
  .forEach(file => {
    const modelDefiner = require(path.join(__dirname, file));
    const model = modelDefiner(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Associate models if needed
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
module.exports = db;
