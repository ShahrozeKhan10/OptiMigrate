const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const {
  JWT_SECRET,
  // sgOptions,
  // AWS_BUCKET_NAME,
} = require("../config/config");
const { exec } = require("child_process");

// const { s3 } = require("../services/aws-config/aws-config");
// const shortUUID = require("short-uuid");
// const fs = require("fs");
// const appRoot = require("app-root-path");
// const attachmentService = require("../services/attachment.service");

let helperFunction = {
  apiResponse: (data, error, status, res, count = undefined) => {
    res.status(status).send({
      data: data,
      totalCount: count,
      error: error,
    });
  },

  apiResponseWithMessage: (data, message, error, status, res) => {
    res.status(status).send({
      data: data,
      message: message,
      error: error,
    });
  },

  generateHash: async (password) => {
    return new Promise(function (resolve, reject) {
      bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
          return reject(err);
        } else {
          return resolve(hash);
        }
      });
    });
  },
  validatePassword: async (password, hashPassword) => {
    return new Promise(function (resolve, reject) {
      bcrypt.compare(password, hashPassword, function (err, res) {
        if (err) {
          return reject(err);
        } else {
          return resolve(res);
        }
      });
    });
  },

  generateJWT: (user) => {
    if (typeof user === "string") return jwt.sign({ id: user }, JWT_SECRET);
    return jwt.sign(user /* { id: userId } */, JWT_SECRET);
  },

  passwordResetEmailTemplate: ({ link }) => {
    return `
      <div style="background-color:#F6BF46; padding:100px; display:flex; justify-content: center;">
        <div class='margin-left: 38%;'>
        <img src="https://res.cloudinary.com/dvltfa2jx/image/upload/v1695644691/rdgrbyw5ouh5ye0ifqws.png" alt="logo" style="max-width: 100%; height: auto;">
        
        </div>
      </div>
      <div style="display:flex;margin-top:10px;">
        <div style="width: 100%;">
          <h1 style="font-size:34px;font-weight:600;text-align: center; color: #3C3B48;">
            Please confirm your email
          </h1>
          <div style="margin: auto; text-align: center; width: 70%;">
            <p style="font-size:1.5rem;font-weight: 400; color: #475467;">
              Click on this link here:
              <a style="color: #363E76; font-size:20px;font-weight: 600 " href="${link}">
                ${link}
              </a>
            </p>
          </div>
          <div style="width: 100%; margin: auto; text-align: center;margin-top: 50px;">
            <a
            type="button"
            href="${link}"
            style="color: white; margin-top: 20px; background-color: #F0B432; font-weight: 500; width: 15rem; border-radius: 0.375rem; font-size: 20px; padding: 1rem 6rem;"
          >
            Confirm Email
          </a>
          </div>
          
        </div>
      </div>
      <div style="display:flex;margin-top:40px;justify-content: space-between;width: 100%;padding-left: 10px; padding-right: 10px; margin-top: 100px;">
        <div style="font-size: 1.125rem; margin-left: 10px; color: gray;">© ZindaBhag 2023</div>
      </div>
    `;
  },

  assessmentEmailTemplate: ({ scores, pakMuslims }) => {
    return `
      <div style="background-color:#F6BF46; padding:100px; display:flex; justify-content: center;">
        <div class='margin-left: 38%;'>
          <img src="https://res.cloudinary.com/dvltfa2jx/image/upload/v1695644691/rdgrbyw5ouh5ye0ifqws.png" alt="logo" style="max-width: 100%; height: auto;">
          <!-- <h1 style="color: white; font-size: 24px; text-align: center; margin-bottom: 5px;  font-weight: 400px;">
            Welcome to ZindaBhag
          </h1> -->

        </div>
      </div>
      <div style="display:flex;margin-top:10px;">
        <div style="width: 100%;">
          <!-- <h1 style="font-size:34px;font-weight:600;text-align: left; color: #3C3B48;">
            Countries that are more inclined to grant you a visa based on your profile recommendations.
          </h1> -->

          <div style="margin: auto; text-align: left; width: 70%;justify-content:center;">
            <p style="font-size:1.5rem;font-weight: 400; color: #475467;width: fit-content;">
              Countries that are more inclined to grant you a visa based on your profile recommendations.
              
              <ul style="font-size: 16px;text-align:left;">
                ${scores
                  .map(
                    (score) =>
                      "<li>" +
                      score.Country.name +
                      ": " +
                      score.score +
                      "%</li>"
                  )
                  .join("")}
              </ul>
              <table>
                <tr>
                    <td>Country</td>
                    <td>Chances</td>
                    <td>Total Population</td>
                    <td>Muslims</td>
                    <td>Pakistanis</td>
                </tr>
                ${scores
                  .map(
                    (score) =>
                      "<tr>" +
                      "<td>" +
                      score.Country.name +
                      "</td>" +
                      "<td>" +
                      score.score +
                      "</td>" +
                      "<td>" +
                      score.Country.total_population +
                      "</td>" +
                      "<td>" +
                      score.Country.muslim_percentage +
                      "</td>" +
                      "<td>" +
                      score.Country.pakistanis +
                      "</td>" +
                      "<td>" +
                      JSON.stringify(score.Country) +
                      "</td>" +
                      "%</tr>"
                  )
                  .join("")}
                <!-- <tr>
                    <td>$ {score.Country.country}</td>
                    <td>$ {score.Country.chances}</td>
                    <td>$ {score.Country.totalPopulation}</td>
                    <td>$ {score.Country.muslims}</td>
                    <td>$ {score.Country.pakistanis}</td>
                </tr> -->
              </table>
              <div>${JSON.stringify(pakMuslims, null, 2)}</div>

            </p>
          </div>

        </div>
      </div>
      <div style="display:flex;margin-top:40px;justify-content: space-between;width: 100%;padding-left: 10px; padding-right: 10px; margin-top: 100px;">
        <div style="font-size: 1.125rem; margin-left: 10px; color: gray;">© ZindaBhag 2023</div>
      </div>
    `;
  },

  /* createAccountEmailTemplate: ({ link }) => {
    return `
      <div style="background-color:#F6BF46; padding:100px; display:flex; justify-content: center;">
        <div class='margin-left: 38%;'>
          <img src="https://res.cloudinary.com/dvltfa2jx/image/upload/v1695644691/rdgrbyw5ouh5ye0ifqws.png" alt="logo" style="max-width: 100%; height: auto;">
          <h1 style="color: white; font-size: 24px; text-align: center; margin-bottom: 5px;  font-weight: 400px;">
            Welcome to ZindaBhag
          </h1>
          
        </div>
      </div>
      <div style="display:flex;margin-top:10px;">
        <div style="width: 100%;">
          <h1 style="font-size:34px;font-weight:600;text-align: center; color: #3C3B48;">
            Please confirm your email
          </h1>
          <div style="margin: auto; text-align: center; width: 70%;">
            <p style="font-size:1.5rem;font-weight: 400; color: #475467;">
              Click on this link here:
              <a style="color: #363E76; font-size:20px;font-weight: 600 " href="${link}">
                ${link}
              </a>
            </p>
          </div>
          <div style="width: 100%; margin: auto; text-align: center;margin-top: 50px;">
            <a
            type="button"
            href="${link}"
            style="color: white; margin-top: 20px; background-color: #F0B432; font-weight: 500; width: 15rem; border-radius: 0.375rem; font-size: 20px; padding: 1rem 6rem;"
          >
            Confirm Email
          </a>
          </div>
          
        </div>
      </div>
      <div style="display:flex;margin-top:40px;justify-content: space-between;width: 100%;padding-left: 10px; padding-right: 10px; margin-top: 100px;">
        <div style="font-size: 1.125rem; margin-left: 10px; color: gray;">© ZindaBhag 2023</div>
      </div>
    `;
  }, */

  createSubscriptionEmail: ({content}) => {
    return `
<div style="background-color:#F0B432; padding:100px; display:flex; justify-content: center;">
  <div class='margin-left: 38%;'>
    <h1 style="color: white; font-size: 20px; text-align: center; margin-bottom: 5px;  font-weight: 400px; color: #2E3253">
      Welcome to Zinda Bhag
    </h1>
    <img src="https://res.cloudinary.com/dvltfa2jx/image/upload/v1695644691/rdgrbyw5ouh5ye0ifqws.png" alt="logo" style="max-width: 100%; height: auto;">
    </div>
</div>
<div style="display:flex;margin-top:10px;">
  <div style="width: 100%;">
    <div style="margin: auto; text-align: center; width: 70%;">
      <p style="font-size:1.5rem;font-weight: 400; color: #2E3253;margin-top:100px">
      ${content}
      </p>
    </div>
    
  </div>
</div>
<div style="display:flex;margin-top:40px;justify-content: space-between;width: 100%;padding-left: 10px; padding-right: 10px; margin-top: 100px;">
  <div style="font-size: 1.125rem; margin-left: 10px; color: gray;">© ZindaBhag 2023</div>
</div>
    `;
  },

  /* 

  passwordResetEmailTemplate: ({ name, email, link }) => {
    return `
          <h1>ZindaBhag Password Reset</h1>
          <br />
          <p>Hi ${name}, Please click the following link to reset the password for ${email}</p>
          <br />
          <a href="${link}" target="_blank">Password Reset Link</a>
          `;
  },

  hasValidParams: (params) => {
    const schema = Joi.object().keys({
      order: Joi.string().valid("desc", "asc").insensitive(),
      limit: Joi.number().integer(),
      page: Joi.number().integer(),
      size: Joi.number().integer(),
      query: Joi.string(),
    });
    return Joi.validate(params, schema);
  },

  // s3 image
  deleteItemByKey: (key) => {
    return s3
      .deleteObject({
        Bucket: AWS_BUCKET_NAME,
        Key: key,
      })
      .promise();
  },

  convertNullToString: (object) => {
    for (let key in object) {
      if (!object[key]) {
        // for null int/float values set -1
        if (key.includes("_id")) {
          object[key] = -1;
        } else {
          // for null string type set empty string ''
          object[key] = "";
        }
      }
    }
    return object;
  },

  generateUUID: () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }, */

  checkTokenVerification: (token) => {
    const verify = jwt.verify(token, JWT_SECRET);
    return { verified: !!verify, data: jwt.decode(token, JWT_SECRET) };
  },
  /*
  downloadFromS3: async (key, path) => {
    s3.getObject({ Bucket: AWS_BUCKET_NAME, Key: key }, (err, data) => {
      if (err !== null) {
        console.log("Error when downloading", err);
      } else {
        // const str = Buffer.from(data.Body).toString();
        fs.writeFile(path, data.Body, (err) => {
          if (err) console.log("Error WHen writing File");
          console.log("File Wrote");
        });
      }
    });
  },

  createCSVFile: async (data) => {
    // const date = new Date().toISOString();
    // const target = `${appRoot}/admin-csv-assets/${date}.csv`
    // return new Promise((resolve, reject) => {
    //   fs.writeFile(target, data, err => {
    //     if (err) {
    //       reject(err)
    //     } else {
    //       resolve({location: target, filename: `${date}.csv`})
    //     }
    //   })
    // })
    const date = new Date().toISOString();
    const target = `${appRoot}/admin-csv-assets/${date}.csv`;
    console.log("Writing");
    return new Promise((resolve, reject) => {
      const writable = fs.createWriteStream(target);
      writable.write(data, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve({ location: target, filename: `${date}.csv` });
        }
      });
    });
  },

  uploadFile: async (config, filename) => {
    return new Promise((resolve, reject) => {
      fs.readFile(config.source, (err, data) => {
        if (!err) {
          params = {
            Bucket: AWS_BUCKET_NAME,
            Key:
              config.path +
              "/" +
              (filename
                ? filename
                : shortUUID.generate() + "-" + config.target),
            Body: data,
            ACL: "public-read",
            ContentType: config.contentType,
          };
          s3.upload(params, async (err, data) => {
            if (!err) {
              resolve(data);
              // fs.unlink(source); // optionally delete the file
            } else {
              reject(err);
            }
          });
        } else {
          reject(err);
        }
      });
    });
  },

  uploadS3Resume: async (path, source, target, id) => {
    let params;
    await fs.readFile(source, function (err, data) {
      if (!err) {
        params = {
          Bucket: AWS_BUCKET_NAME,
          Key: path + "/" + shortUUID.generate() + "-" + target,
          Body: data,
          ACL: "public-read",
          ContentType: "application/pdf",
        };
        s3.upload(params, async function (err, data) {
          if (!err) {
            // dump user s3 key to db
            await attachmentService.addUserCvKey(
              id,
              data.Key,
              "cv",
              data.Location,
              target
            );
            // fs.unlink(source); // optionally delete the file
          } else {
            console.log(err);
          }
        });
      }
    });
  },

  removedUndefined: (data) => {
    for (let key in data) {
      if (data[key] === undefined) {
        delete data[key];
      }
    }

    return data;
  }, */

  getUUID: () => {
    return new Promise((resolve, reject) => {
      exec("uuidgen", (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }
        if (stderr) {
          reject(stderr);
          return;
        }
        resolve(stdout);
      });
    });
  },
};

module.exports = helperFunction;
