const Joi = require("joi");
const PasswordComplexity = require("joi-password-complexity");
const { ErrorHandler } = require("../helper/error");
const httpStatus = require("http-status");
const { MESSAGE_CODES } = require("../config/constants");

const complexityOptions = {
  min: 6,
  max: 20,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 0,
};

module.exports = {
  register: {
    body: {
      name: Joi.string()
        .required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case "string.email":
                throw new ErrorHandler(
                  httpStatus.BAD_REQUEST,
                  MESSAGE_CODES.AUTH.invalid_email
                );
              case "any.required":
                throw new ErrorHandler(
                  httpStatus.BAD_REQUEST,
                  `name_${MESSAGE_CODES.COMMON.field_missing}`
                );
              default:
            }
          });
        }),
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case "string.email":
                throw new ErrorHandler(
                  httpStatus.BAD_REQUEST,
                  MESSAGE_CODES.AUTH.invalid_email
                );
              case "any.required":
                throw new ErrorHandler(
                  httpStatus.BAD_REQUEST,
                  `email_${MESSAGE_CODES.COMMON.field_missing}`
                );
              default:
            }
          });
        }),
      // password1: new PasswordComplexity(complexityOptions)
      //   .required()
      //   .error((errors) => {
      //     errors.forEach((err) => {
      //       switch (err.type) {
      //         case "passwordComplexity.uppercase":
      //           throw new ErrorHandler(400, MESSAGE_CODES.AUTH.invalid_format);
      //         case "any.required":
      //           throw new ErrorHandler(
      //             httpStatus.BAD_REQUEST,
      //             `password_${MESSAGE_CODES.COMMON.field_missing}`
      //           );
      //         default:
      //       }
      //     });
      //   }),
      password: Joi.string()
        .required()
        .custom((value, helpers) => {
          const complexity = new PasswordComplexity(complexityOptions);

          if (!complexity.validate(value)) {
            // Check if password meets complexity requirements
            throw new ErrorHandler(400, MESSAGE_CODES.AUTH.invalid_format);
          }

          return value;
        })
        .messages({
          "any.required": `password_${MESSAGE_CODES.COMMON.field_missing}`,
        }),
    },
  },
  login: {
    body: {
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required()
        .error((error) => {
          error.forEach((err) => {
            switch (err.type) {
              case "string.email":
                throw new ErrorHandler(
                  httpStatus.BAD_REQUEST,
                  MESSAGE_CODES.AUTH.invalid_email
                );
              case "any.required":
                throw new ErrorHandler(
                  httpStatus.BAD_REQUEST,
                  `email_${MESSAGE_CODES.COMMON.field_missing}`
                );
              default:
            }
          });
        }),
      // password1: new PasswordComplexity(complexityOptions)
      //   .required()
      //   .error((errors) => {
      //     errors.forEach((err) => {
      //       switch (err.type) {
      //         case "passwordComplexity.uppercase":
      //           throw new ErrorHandler(400, MESSAGE_CODES.AUTH.invalid_format);
      //         case "passwordComplexity.numeric":
      //           throw new ErrorHandler(400, MESSAGE_CODES.AUTH.invalid_format);
      //         case "any.required":
      //           throw new ErrorHandler(
      //             httpStatus.BAD_REQUEST,
      //             `password_${MESSAGE_CODES.COMMON.field_missing}`
      //           );
      //         default:
      //       }
      //     });
      //   }),
      password: Joi.string()
        .required()
        .custom((value, helpers) => {
          const validationResult = passwordComplexity.validate(value);

          if (validationResult.error) {
            const errType = validationResult.error.details[0].type;
            switch (errType) {
              case "passwordComplexity.uppercase":
              case "passwordComplexity.numeric":
                throw new ErrorHandler(400, MESSAGE_CODES.AUTH.invalid_format);
              default:
                throw new ErrorHandler(400, MESSAGE_CODES.AUTH.invalid_format);
            }
          }

          return value;
        })
        .messages({
          "any.required": `password_${MESSAGE_CODES.COMMON.field_missing}`,
        }),
    },
  },
  email: {
    body: {
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case "string.email":
                throw new ErrorHandler(
                  httpStatus.BAD_REQUEST,
                  MESSAGE_CODES.AUTH.invalid_email
                );
              case "any.required":
                throw new ErrorHandler(
                  httpStatus.BAD_REQUEST,
                  `email_${MESSAGE_CODES.COMMON.field_missing}`
                );
              default:
            }
          });
        }),
    },
  },
  forgotPassRequest: {
    body: {
      token: Joi.string().required(),
    },
  },
  linkedInAuthorization: {
    body: {
      code: Joi.string().required(),
      path: Joi.string().required(),
    },
  },
};
