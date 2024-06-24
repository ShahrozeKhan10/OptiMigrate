const customEnv = require("custom-env");
customEnv.env(true);
module.exports = {
  "development-test": {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect:process.env.DB_DIALECT,
  },
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect:process.env.DB_DIALECT,
  },
  endpoint: process.env.USER_APP_ENDPOINT,
  port:process.env.port ,
  NODE_ENV: process.env.NODE_ENV || "development",
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_HOST: process.env.DB_HOST,
  DB_PASS: process.env.DB_PASS,
  DB_PORT: process.env.DB_PORT,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
  AWS_SES_REGION: process.env.AWS_SES_REGION,
  DB_DIALECT:process.env.DB_DIALECT,
  JWT_SECRET: process.env.JWT_SECRET,
  USER_APP_ENDPOINT: process.env.USER_APP_ENDPOINT,
  FREEMIUM_COUNTRIES: process.env.FREEMIUM_COUNTRIES,
  sgOptions: {
    templateIDs: {
      forgotPasswordTemplate: "d-00ed0c09257e4e07be6af5bbb5591002",
      newPasswordTemplate: "d-767f06d33efb471cac13bb414c93abf8",
    },
  },
};
