const jwt = require("jsonwebtoken");
const { JWT_SECRET, AWS_BUCKET_NAME } = require("../config/config.js");
const { ErrorHandler } = require("./error");
const httpStatus = require("http-status");
const { MESSAGE_CODES, PAYMENT_STATUS } = require("../config/constants");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { s3 } = require("../services/aws-config/aws-config.js");
const { UserCountry } = require("../models");
const shortUUID = require("short-uuid");
const userService = require("../services/user.service.js");
const paymentService = require("../services/payment.service.js");

const environment = process.env.NODE_ENV;

let middleware = {
  verifyToken: (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    if (token) {
      if (token.startsWith("Bearer ")) {
        // remove bearer from token
        token = token.slice(7, token.length);
      }
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          throw new ErrorHandler(
            httpStatus.UNAUTHORIZED,
            MESSAGE_CODES.AUTH.token_invalid
          );
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      throw new ErrorHandler(
        httpStatus.UNAUTHORIZED,
        MESSAGE_CODES.AUTH.token_required
      );
    }
  },

  checkAccess: (resource) => async (req, res, next) => {
    try {
      const userId = req.decoded.id; // Replace with your actual user identification method

      // check if paid or not paid
      // if free only 5 free details fetchable
      // if paid then 5 free details and bought countries details fetchable

      // Fetch the user's payment plan from the database
      const user = await userService.getUserProfileWithPayment(userId);
      console.log("environment ==========>>> ", environment);
      // if (user?.paymentData?.payment_status !== PAYMENT_STATUS.PAID) {
      //   throw new ErrorHandler(
      //     httpStatus.UNAUTHORIZED,
      //     MESSAGE_CODES.AUTH.unauthorized_operation
      //   );
      // }
      const allowedUsers = [
        "airfan+921@geeksofkolachi.com",
        "hisham+15@geeksofkolachi.com",
        "mirzashahzadsaleem021+101@gmail.com",
        "innocentshahroze@gmail.com",
        //Abcd@1234
        "mbabarwaseem+0066@gmail.com",
        //  
      ];
      if (resource === "country" && !allowedUsers.includes(user.email)) {
        const countryId = req.params.id;

        const userCountry = await UserCountry.findOne({
          where: { user_id: userId, country_id: countryId },
        });

        if (userCountry)
          throw new ErrorHandler(
            httpStatus.UNAUTHORIZED,
            MESSAGE_CODES.AUTH.unauthorized_country
          );
      } else if (resource === "assessment_desired_countries") {
        const { desiredCountries } = req.body;

        const userCountries = await UserCountry.findAll({
          where: { user_id: userId, country_id: desiredCountries },
        });

        // if (desiredCountries.length !== userCountries.length)
        //   throw new ErrorHandler(
        //     httpStatus.UNAUTHORIZED,
        //     MESSAGE_CODES.AUTH.unauthorized_country
        //   );
      }
      next();
    } catch (error) {
      console.log("Error checkAccess: middleware:", error);
      next(error);
    }
  },


  uploadToS3bucket: (path) => {
    return multer({
      storage: multerS3({
        s3: s3,
        acl: "public-read",
        bucket: AWS_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
          cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
          const params = Object.keys(req.params)
            .map((key) => {
              return req.params[key];
            })
            .join("/");
          const key =
            path +
            "/" +
            params +
            (params.length > 0 ? "/" : "") +
            shortUUID.generate() +
            "-" +
            file.originalname;
          cb(null, key);
        },
      }),
    });
  },

  saveFileLocal: () => {
    let storage = multer.diskStorage({
      destination: function(req, file, cb) {
        cb(null, "python/resume_parser/data/input/resume/");
      },
      filename: function(req, file, cb) {
        if (!file.originalname.match(/\.(pdf)$/)) {
          let err = new Error("File type should be pdf");
          err.code = "filetype";
          return cb(err);
        } else {
          let fileName = file.originalname
            .split(" ")
            .join("")
            .replace("(", "")
            .replace(")", "")
            .replace("_", "");
          cb(null, fileName);
        }
      },
    });

    let upload = multer({ storage: storage });
    return upload;
  },
};

module.exports = middleware;
